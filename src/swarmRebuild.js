// Swarm rebuild — native page effect for pma.wtf.
//
// ORIGINAL implementation, written from scratch for PMA.WTF.
// Concept inspired by "Swarm Rebuild" (DhvanilPatel/swarm-cursors),
// itself a tribute to "Swarm" by Joel Califa. No code was copied
// from either project; the snapshot / render / physics below is ours.
//
// How it works:
//  1. Snapshot the live DOM into a small blueprint (rects, text, media).
//  2. Cover the page with a blank canvas layer.
//  3. A swarm of coloured cursors rebuilds each element live:
//     boxes are crosshair-drawn, text is typed, images sweep in.
//  4. "Go live" fades the canvas away and returns the real page.

const CURSOR_COLORS = [
  "#ff5d5d", "#ffb020", "#3ddc84", "#38bdf8",
  "#a78bfa", "#f472b6", "#facc15", "#34d399",
  "#fb7185", "#60a5fa", "#f97316", "#e879f9",
];
const CURSOR_COUNT = 12;
const MAX_TASKS = 160;
const MAX_DOC_HEIGHT = 16000;
const TEXT_TAGS = new Set(["H1", "H2", "H3", "H4", "P", "LI", "A", "BUTTON", "SPAN", "EM", "STRONG", "SMALL", "LABEL"]);

let active = false;

export function startSwarmRebuild() {
  if (active) return;
  if (typeof window === "undefined" || !document.body) return;
  active = true;
  const engine = new SwarmEngine();
  engine.start();
}

function clamp(v, a, b) {
  return v < a ? a : v > b ? b : v;
}

function smoothstep(a, b, x) {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

function roundRectPath(ctx, x, y, w, h, r) {
  const rr = clamp(r || 0, 0, Math.min(w, h) / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.lineTo(x + w - rr, y);
  ctx.arcTo(x + w, y, x + w, y + rr, rr);
  ctx.lineTo(x + w, y + h - rr);
  ctx.arcTo(x + w, y + h, x + w - rr, y + h, rr);
  ctx.lineTo(x + rr, y + h);
  ctx.arcTo(x, y + h, x, y + h - rr, rr);
  ctx.lineTo(x, y + rr);
  ctx.arcTo(x, y, x + rr, y, rr);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const w of words) {
    const test = line ? line + " " + w : w;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// ---------------------------------------------------------------- snapshot

function collectTasks(measureCtx) {
  const tasks = [];
  const claimed = new WeakSet();
  const docH = document.documentElement.scrollHeight;
  let seq = 0;

  const els = document.body.querySelectorAll("*");
  for (const el of els) {
    if (tasks.length >= MAX_TASKS) break;
    if (claimed.has(el)) continue;
    if (el.closest(".swarm-overlay")) continue;
    const tag = el.tagName;
    if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT" || tag === "SVG" || tag === "PATH" || tag === "BR") continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) continue;
    if (cs.position === "fixed") continue; // nav / floating UI: left live, skipped
    const r = el.getBoundingClientRect();
    const x = r.left + window.scrollX;
    const y = r.top + window.scrollY;
    if (r.width < 10 || r.height < 8) continue;
    if (r.height > 3000) continue; // full-page wrapper: paints nothing, must not block the queue
    if (y > MAX_DOC_HEIGHT || y + r.height < 0 || y > docH) continue;

    if (tag === "IMG") {
      const radius = parseFloat(cs.borderTopLeftRadius) || 0;
      tasks.push({
        kind: "media", seq: seq++, x, y, w: r.width, h: r.height,
        img: el.complete && el.naturalWidth > 0 ? el : null, radius,
        duration: 480,
      });
      continue;
    }

    const text = TEXT_TAGS.has(tag) ? (el.textContent || "").trim().replace(/\s+/g, " ") : "";
    const bg = cs.backgroundColor;
    const hasBg = bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
    const bw = parseFloat(cs.borderTopWidth) || 0;
    const hasBorder = bw > 0 && cs.borderTopStyle !== "none";
    const radius = parseFloat(cs.borderTopLeftRadius) || 0;

    // Elements that paint a box (button, card, badge) get a rect task,
    // even when they also carry text — the text is typed on top after.
    if (hasBg || hasBorder) {
      tasks.push({
        kind: "rect", seq: seq++, x, y, w: r.width, h: r.height,
        bg: hasBg ? bg : "transparent",
        border: hasBorder ? cs.borderTopColor : null, borderWidth: bw, radius,
        duration: 300,
      });
    }
    if (text) {
      const fontSize = parseFloat(cs.fontSize) || 16;
      const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.45;
      const font = cs.fontStyle + " " + cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
      measureCtx.font = font;
      const lines = wrapText(measureCtx, text, Math.max(24, r.width - 2));
      const totalChars = lines.join("").length;
      tasks.push({
        kind: "text", seq: seq++, x, y, w: r.width, h: r.height,
        text, lines, totalChars, font, fontSize, lineHeight,
        color: cs.color, heading: tag === "H1" || tag === "H2",
        duration: clamp(totalChars * 7, 220, 950),
      });
      // Claim descendants so inner spans don't double-draw the same words.
      el.querySelectorAll("*").forEach((d) => claimed.add(d));
      claimed.add(el);
    }
  }

  tasks.sort((a, b) => a.y - b.y || a.x - b.x || a.seq - b.seq);
  return tasks;
}

// ---------------------------------------------------------------- sound

function makeSound() {
  let actx = null;
  let master = null;
  let enabled = true;
  const scale = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

  function ensure() {
    if (!actx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      try {
        actx = new AC();
        master = actx.createGain();
        master.gain.value = 0.1;
        master.connect(actx.destination);
      } catch (e) { return false; }
    }
    if (actx.state === "suspended") actx.resume();
    return true;
  }
  function tone(freq, dur, type, vol) {
    if (!enabled || !ensure()) return;
    try {
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime((vol || 1) * 0.9, actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
      o.connect(g);
      g.connect(master);
      o.start();
      o.stop(actx.currentTime + dur + 0.02);
    } catch (e) { /* audio unavailable: stay silent */ }
  }
  return {
    unlock() { ensure(); },
    setEnabled(v) { enabled = v; },
    isEnabled() { return enabled; },
    click() { tone(1500, 0.03, "square", 0.25); },
    thock() { tone(190, 0.06, "triangle", 0.7); },
    pluck(i) { tone(scale[i % scale.length], 0.4, "sine", 0.5); },
    done() { tone(523.25, 0.5, "sine", 0.5); setTimeout(() => tone(783.99, 0.6, "sine", 0.5), 120); },
  };
}

// ---------------------------------------------------------------- engine

class SwarmEngine {
  constructor() {
    this.speed = 1;
    this.sound = makeSound();
    this.startScrollY = window.scrollY || 0;
    this.phase = "intro"; // intro | build | done | outro
    this.tasks = [];
    this.queue = [];
    this.doneTasks = [];
    this.cursors = [];
    this.raf = 0;
    this.lastT = 0;
    this.introUntil = 0;
    this.lastFollowScroll = 0;
    this.doneAt = 0;
    this.autoLiveAt = 0;
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight * 0.4, seen: false };
    this.progressEl = null;
    this.goLiveBtn = null;
    this.destroyed = false;
  }

  start() {
    // Measure canvas for text wrapping, then snapshot the page.
    const measure = document.createElement("canvas").getContext("2d");
    this.tasks = collectTasks(measure);
    if (this.tasks.length < 4) {
      // Nothing worth rebuilding — bail out silently.
      active = false;
      return;
    }
    this.queue = this.tasks.slice();

    this.buildOverlay();
    this.sound.unlock();

    window.scrollTo({ top: 0, behavior: "auto" });

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < CURSOR_COUNT; i++) {
      const a = (i / CURSOR_COUNT) * Math.PI * 2;
      this.cursors.push({
        x: cx + Math.cos(a) * 90,
        y: cy + Math.sin(a) * 90,
        vx: 0, vy: 0,
        color: CURSOR_COLORS[i % CURSOR_COLORS.length],
        task: null,
        taskStart: 0,
      });
    }

    this.introUntil = performance.now() + 900;
    this.lastT = performance.now();
    this.raf = requestAnimationFrame((t) => this.loop(t));
  }

  buildOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "swarm-overlay";
    const bodyBg = getComputedStyle(document.body).backgroundColor || "#0b0e14";
    overlay.style.background = bodyBg && bodyBg !== "rgba(0, 0, 0, 0)" ? bodyBg : "#0b0e14";

    const canvas = document.createElement("canvas");
    canvas.className = "swarm-canvas";
    overlay.appendChild(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.resizeCanvas();

    const toolbar = document.createElement("div");
    toolbar.className = "swarm-toolbar";
    toolbar.innerHTML =
      '<span class="swarm-title">↻ SWARM REBUILD</span>' +
      '<span class="swarm-progress">0 / ' + this.tasks.length + "</span>" +
      '<button type="button" class="swarm-btn" data-act="speed">1×</button>' +
      '<button type="button" class="swarm-btn" data-act="sound">SOUND ON</button>' +
      '<button type="button" class="swarm-btn swarm-btn-primary" data-act="golive">GO LIVE</button>' +
      '<button type="button" class="swarm-btn" data-act="replay">REPLAY</button>' +
      '<button type="button" class="swarm-btn" data-act="close" aria-label="Close">✕</button>';
    overlay.appendChild(toolbar);
    this.progressEl = toolbar.querySelector(".swarm-progress");
    this.goLiveBtn = toolbar.querySelector('[data-act="golive"]');

    const hint = document.createElement("div");
    hint.className = "swarm-hint";
    hint.textContent = "Esc untuk keluar · Inspired by Swarm Rebuild — tribute to Swarm by Joel Califa";
    overlay.appendChild(hint);

    toolbar.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      const act = btn.getAttribute("data-act");
      if (act === "golive") this.goLive();
      else if (act === "replay") this.replay();
      else if (act === "close") this.goLive();
      else if (act === "speed") {
        this.speed = this.speed >= 3 ? 1 : this.speed + 1;
        btn.textContent = this.speed + "×";
      } else if (act === "sound") {
        const on = !this.sound.isEnabled();
        this.sound.setEnabled(on);
        btn.textContent = on ? "SOUND ON" : "SOUND OFF";
      }
    });

    document.body.appendChild(overlay);
    this.overlay = overlay;
    // Fade in.
    requestAnimationFrame(() => overlay.classList.add("swarm-overlay-visible"));

    this.onResize = () => this.resizeCanvas();
    this.onMouse = (e) => { this.mouse.x = e.clientX; this.mouse.y = e.clientY; this.mouse.seen = true; };
    this.onKey = (e) => { if (e.key === "Escape") this.goLive(); };
    window.addEventListener("resize", this.onResize);
    window.addEventListener("mousemove", this.onMouse);
    window.addEventListener("keydown", this.onKey);
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  replay() {
    this.tasks.forEach((t) => { t.done = false; });
    this.queue = this.tasks.slice();
    this.doneTasks = [];
    this.cursors.forEach((c) => { c.task = null; });
    this.phase = "intro";
    this.introUntil = performance.now() + 700;
    this.doneAt = 0;
    this.autoLiveAt = 0;
    this.goLiveBtn.classList.remove("swarm-btn-pulse");
    window.scrollTo({ top: 0, behavior: "auto" });
    this.updateProgress();
  }

  updateProgress() {
    if (this.progressEl) {
      this.progressEl.textContent = this.doneTasks.length + " / " + this.tasks.length;
    }
  }

  goLive() {
    if (this.phase === "outro" || this.destroyed) return;
    this.phase = "outro";
    this.overlay.classList.remove("swarm-overlay-visible");
    setTimeout(() => this.destroy(true), 380);
  }

  destroy(restoreScroll) {
    if (this.destroyed) return;
    this.destroyed = true;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("mousemove", this.onMouse);
    window.removeEventListener("keydown", this.onKey);
    if (this.overlay && this.overlay.parentNode) this.overlay.parentNode.removeChild(this.overlay);
    if (restoreScroll) window.scrollTo({ top: this.startScrollY, behavior: "auto" });
    active = false;
  }

  // Best-effort scroll follow: keep the earliest active task on screen.
  // Assignment NEVER waits for scrolling — drawing is viewport-culled,
  // so a task the page cannot scroll into view must not stall the queue.
  followScroll(now) {
    if (this.phase !== "build") return;
    if (now - this.lastFollowScroll < 500) return;
    let target = null;
    for (const c of this.cursors) {
      if (c.task) { target = c.task; break; }
    }
    if (!target && this.queue.length) target = this.queue[0];
    if (!target) return;
    const top = target.y - window.scrollY;
    const bottom = top + target.h;
    if (top < 90 || bottom > window.innerHeight - 90) {
      const y = clamp(target.y + target.h / 2 - window.innerHeight / 2, 0, document.documentElement.scrollHeight);
      window.scrollTo({ top: y, behavior: "smooth" });
      this.lastFollowScroll = now;
    }
  }

  assignTasks(now) {
    if (this.phase !== "build") return;
    for (const c of this.cursors) {
      if (!c.task && this.queue.length) {
        const t = this.queue.shift();
        c.task = t;
        c.taskStart = now;
        this.sound.click();
      }
    }
  }

  loop(t) {
    if (this.destroyed) return;
    const now = performance.now();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cx = vw / 2;
    const cy = vh / 2;

    if (this.phase === "intro" && now >= this.introUntil) {
      this.phase = "build";
    }

    this.assignTasks(now);
    this.followScroll(now);

    // Advance active tasks.
    for (const c of this.cursors) {
      if (!c.task) continue;
      const dur = c.task.duration / this.speed;
      const p = clamp((now - c.taskStart) / dur, 0, 1);
      c.task.p = p;
      if (p >= 1) {
        c.task.done = true;
        this.doneTasks.push(c.task);
        this.sound.pluck(this.doneTasks.length);
        c.task = null;
        this.updateProgress();
      }
    }

    // All tasks done -> finale.
    if (this.phase === "build" && !this.queue.length && !this.cursors.some((c) => c.task)) {
      this.phase = "done";
      this.doneAt = now;
      this.autoLiveAt = now + 8000;
      this.goLiveBtn.classList.add("swarm-btn-pulse");
      this.sound.done();
    }
    if (this.phase === "done" && now >= this.autoLiveAt) {
      this.goLive();
      return;
    }

    // Cursor physics.
    const scrollY = window.scrollY;
    for (const c of this.cursors) {
      let tx, ty;
      if (this.phase === "intro") {
        const a = now / 480 + this.cursors.indexOf(c);
        tx = cx + Math.cos(a) * 110;
        ty = cy + Math.sin(a) * 110;
      } else if (c.task) {
        const pt = this.taskCursorPoint(c.task, c.task.p || 0, scrollY);
        tx = pt.x; ty = pt.y;
      } else if (this.phase === "done") {
        tx = this.mouse.seen ? this.mouse.x : cx;
        ty = this.mouse.seen ? this.mouse.y : vh * 0.6;
        // Gentle flocking offset so cursors don't stack exactly.
        const i = this.cursors.indexOf(c);
        tx += Math.cos(i * 2.4) * 26;
        ty += Math.sin(i * 2.4) * 26;
      } else {
        tx = cx + Math.sin(now / 700 + this.cursors.indexOf(c)) * 60;
        ty = cy + Math.cos(now / 900 + this.cursors.indexOf(c)) * 40;
      }
      c.vx += (tx - c.x) * 0.02 + (Math.random() - 0.5) * 1.1;
      c.vy += (ty - c.y) * 0.02 + (Math.random() - 0.5) * 1.1;
      c.vx *= 0.86;
      c.vy *= 0.86;
      const sp = Math.hypot(c.vx, c.vy);
      const max = 16;
      if (sp > max) { c.vx = (c.vx / sp) * max; c.vy = (c.vy / sp) * max; }
      c.x += c.vx;
      c.y += c.vy;
    }

    this.draw(now, scrollY);
    this.raf = requestAnimationFrame((nt) => this.loop(nt));
  }

  taskCursorPoint(task, p, scrollY) {
    const vx = task.x;
    const vy = task.y - scrollY;
    if (task.kind === "rect") {
      const per = 2 * (task.w + task.h);
      const d = p * per;
      if (d < task.w) return { x: vx + d, y: vy };
      if (d < task.w + task.h) return { x: vx + task.w, y: vy + (d - task.w) };
      if (d < 2 * task.w + task.h) return { x: vx + task.w - (d - task.w - task.h), y: vy + task.h };
      return { x: vx, y: vy + task.h - (d - 2 * task.w - task.h) };
    }
    if (task.kind === "text") {
      const chars = Math.floor((task.totalChars || 0) * p);
      let used = 0;
      for (let i = 0; i < task.lines.length; i++) {
        const len = task.lines[i].length;
        if (chars <= used + len) {
          const inLine = chars - used;
          this.ctx.font = task.font;
          const w = this.ctx.measureText(task.lines[i].slice(0, inLine)).width;
          return { x: vx + w + 8, y: vy + i * task.lineHeight + task.lineHeight * 0.55 };
        }
        used += len;
      }
      return { x: vx + 8, y: vy + task.lineHeight * 0.55 };
    }
    // media: sweep line, centre.
    return { x: vx + task.w / 2, y: vy + task.h * p };
  }

  draw(now, scrollY) {
    const ctx = this.ctx;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    ctx.clearRect(0, 0, vw, vh);

    // One pass in document order, so a parent box never paints over
    // its child text when cursors finish tasks out of order.
    const visible = [];
    for (const t of this.doneTasks) visible.push(t);
    for (const c of this.cursors) if (c.task) visible.push(c.task);
    visible.sort((x, y) => x.seq - y.seq);
    for (const t of visible) {
      const top = t.y - scrollY;
      if (top + t.h < -40 || top > vh + 40) continue;
      if (t.done) this.drawTaskFinal(t, top);
      else this.drawTaskPartial(t, top, t.p || 0, now);
    }

    // Intro: centre dot the swarm orbits.
    if (this.phase === "intro") {
      ctx.save();
      ctx.fillStyle = "#f5b942";
      ctx.beginPath();
      ctx.arc(vw / 2, vh / 2, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.beginPath();
      ctx.arc(vw / 2, vh / 2, 110, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Cursors on top.
    for (const c of this.cursors) {
      const ang = Math.atan2(c.vy, c.vx);
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(ang);
      ctx.fillStyle = c.color;
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(-8, -7);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-8, 7);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }

  drawTaskFinal(t, top) {
    const ctx = this.ctx;
    if (t.kind === "rect") {
      roundRectPath(ctx, t.x, top, t.w, t.h, t.radius);
      if (t.bg !== "transparent") { ctx.fillStyle = t.bg; ctx.fill(); }
      if (t.border) { ctx.strokeStyle = t.border; ctx.lineWidth = t.borderWidth; ctx.stroke(); }
    } else if (t.kind === "text") {
      ctx.save();
      ctx.font = t.font;
      ctx.fillStyle = t.color;
      ctx.textBaseline = "top";
      for (let i = 0; i < t.lines.length; i++) {
        ctx.fillText(t.lines[i], t.x, top + i * t.lineHeight);
      }
      ctx.restore();
    } else if (t.kind === "media") {
      this.drawMedia(t, top, 1);
    }
  }

  drawTaskPartial(t, top, p, now) {
    const ctx = this.ctx;
    if (t.kind === "rect") {
      const per = 2 * (t.w + t.h);
      ctx.save();
      roundRectPath(ctx, t.x, top, t.w, t.h, t.radius);
      ctx.strokeStyle = "rgba(255,255,255,0.85)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([per, per]);
      ctx.lineDashOffset = per * (1 - p);
      ctx.stroke();
      ctx.setLineDash([]);
      if (p > 0.55 && t.bg !== "transparent") {
        ctx.globalAlpha = smoothstep(0.55, 1, p);
        ctx.fillStyle = t.bg;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      if (t.border && p > 0.55) {
        ctx.strokeStyle = t.border;
        ctx.lineWidth = t.borderWidth;
        ctx.stroke();
      }
      ctx.restore();
    } else if (t.kind === "text") {
      const size = t.heading ? 18 + (t.fontSize - 18) * p : t.fontSize;
      const font = t.font.replace(/(\d+(?:\.\d+)?)px/, size.toFixed(1) + "px");
      const chars = Math.floor((t.totalChars || 0) * p);
      ctx.save();
      ctx.font = font;
      ctx.fillStyle = t.color;
      ctx.textBaseline = "top";
      let used = 0;
      let caret = null;
      for (let i = 0; i < t.lines.length; i++) {
        const line = t.lines[i];
        if (chars >= used + line.length) {
          ctx.fillText(line, t.x, top + i * t.lineHeight);
        } else if (chars > used) {
          const part = line.slice(0, chars - used);
          ctx.fillText(part, t.x, top + i * t.lineHeight);
          caret = { x: t.x + ctx.measureText(part).width, y: top + i * t.lineHeight };
        }
        used += line.length;
      }
      if (caret && Math.floor(now / 350) % 2 === 0) {
        ctx.fillRect(caret.x + 1, caret.y, 2, size * 1.1);
      }
      ctx.restore();
    } else if (t.kind === "media") {
      this.drawMedia(t, top, p);
    }
  }

  drawMedia(t, top, p) {
    const ctx = this.ctx;
    ctx.save();
    roundRectPath(ctx, t.x, top, t.w, t.h, t.radius);
    ctx.clip();
    if (!t.img) {
      ctx.fillStyle = "#1a2233";
      ctx.fillRect(t.x, top, t.w, t.h);
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.beginPath();
      ctx.moveTo(t.x, top);
      ctx.lineTo(t.x + t.w, top + t.h);
      ctx.moveTo(t.x + t.w, top);
      ctx.lineTo(t.x, top + t.h);
      ctx.stroke();
    } else {
      // Cover-fit crop, revealed top -> bottom with the sweep.
      const iw = t.img.naturalWidth;
      const ih = t.img.naturalHeight;
      const scale = Math.max(t.w / iw, t.h / ih);
      const sw = t.w / scale;
      const sh = t.h / scale;
      const sx = (iw - sw) / 2;
      const sy = (ih - sh) / 2;
      const revealH = t.h * p;
      ctx.beginPath();
      ctx.rect(t.x, top, t.w, revealH);
      ctx.clip();
      ctx.drawImage(t.img, sx, sy, sw, sh, t.x, top, t.w, t.h);
      if (p < 1) {
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fillRect(t.x, top + revealH - 1, t.w, 2);
      }
    }
    ctx.restore();
  }
}

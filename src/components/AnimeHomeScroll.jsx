import { useEffect } from "react";
import {
  animate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

function reveal(element, options = {}) {
  if (!element) return;

  animate(
    element,
    {
      opacity: [0, 1],
      y: [options.y ?? 70, 0],
      scale: [options.scale ?? 0.92, 1],
      ...(options.x !== undefined ? { x: [options.x, 0] } : {}),
      ...(options.rotate !== undefined ? { rotateZ: [options.rotate, 0] } : {}),
    },
    {
      duration: options.duration ?? 0.9,
      delay: options.delay ?? 0,
      ease,
    }
  );
}

function hoverMotion(element, hover = {}, rest = {}) {
  if (!element) return () => {};

  const enter = () =>
    animate(
      element,
      {
        scale: hover.scale ?? 1.025,
        y: hover.y ?? -8,
        x: hover.x ?? 0,
        rotateZ: hover.rotateZ ?? 0,
      },
      { duration: 0.3, ease }
    );

  const leave = () =>
    animate(
      element,
      {
        scale: rest.scale ?? 1,
        y: rest.y ?? 0,
        x: rest.x ?? 0,
        rotateZ: rest.rotateZ ?? 0,
      },
      { duration: 0.5, ease }
    );

  element.addEventListener("pointerenter", enter);
  element.addEventListener("pointerleave", leave);

  return () => {
    element.removeEventListener("pointerenter", enter);
    element.removeEventListener("pointerleave", leave);
  };
}

function magneticButton(element) {
  if (!element) return () => {};

  const move = (event) => {
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.12;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.12;

    animate(
      element,
      { x, y, scale: 1.035 },
      { duration: 0.2, ease }
    );
  };

  const leave = () => {
    animate(element, { x: 0, y: 0, scale: 1 }, { duration: 0.5, ease });
  };

  element.addEventListener("pointermove", move);
  element.addEventListener("pointerleave", leave);

  return () => {
    element.removeEventListener("pointermove", move);
    element.removeEventListener("pointerleave", leave);
  };
}

export default function AnimeHomeScroll() {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const heroCopy = document.querySelector(".hero-copy");
    const eyebrow = document.querySelector(".hero .eyebrow");
    const heroTitle = document.querySelector(".hero h1");
    const heroLead = document.querySelector(".hero-lead");
    const heroActions = document.querySelector(".hero-actions");
    const heroMeta = document.querySelector(".hero-meta");
    const scrollCue = document.querySelector(".scroll-cue");
    const square = document.querySelector(".hero-scroll-square");

    // HERO — deliberately stronger so the first load feels animated.
    reveal(eyebrow, { x: -55, y: 0, rotate: -2, duration: 0.7 });
    reveal(heroTitle, { y: 100, scale: 0.88, rotate: 1.2, delay: 0.08, duration: 1.15 });
    reveal(heroLead, { y: 42, delay: 0.28, duration: 0.8 });
    reveal(heroActions, { y: 36, scale: 0.94, delay: 0.4, duration: 0.8 });
    reveal(heroMeta, { x: 65, y: 0, delay: 0.5, duration: 0.85 });
    reveal(scrollCue, { y: 25, delay: 0.85, duration: 0.7 });

    if (heroCopy) {
      animate(
        heroCopy,
        { opacity: [0, 1], y: [110, 0], scale: [0.94, 1] },
        { duration: 1.25, ease }
      );
    }

    if (square) {
      animate(
        square,
        { rotate: [-25, 18], scale: [0.55, 1.08], x: [-45, 0] },
        { duration: 1.5, ease }
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const delay = Number(element.dataset.motionDelay || 0);
          reveal(element, {
            y: Number(element.dataset.motionY || 90),
            x: Number(element.dataset.motionX || 0),
            scale: Number(element.dataset.motionScale || 0.9),
            rotate: Number(element.dataset.motionRotate || 0),
            delay,
            duration: Number(element.dataset.motionDuration || 0.95),
          });
          observer.unobserve(element);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -12% 0px" }
    );

    document
      .querySelectorAll(
        ".section-heading, .design-card, .service-row, .journal-placeholder, .contact-section"
      )
      .forEach((element, index) => {
        element.style.opacity = "0";
        element.dataset.motionDelay = String((index % 5) * 0.09);
        element.dataset.motionRotate = String(index % 2 === 0 ? -1.2 : 1.2);
        observer.observe(element);
      });

    const cleanup = [];

    // DESIGN CARDS — noticeable lift + tilt.
    document.querySelectorAll(".design-card").forEach((element, index) => {
      cleanup.push(
        hoverMotion(element, {
          y: -14,
          x: index % 2 === 0 ? 2 : -2,
          scale: 1.035,
          rotateZ: index % 2 === 0 ? 0.7 : -0.7,
        })
      );
    });

    // SERVICES — rows slide with the pointer.
    document.querySelectorAll(".service-row").forEach((element) => {
      cleanup.push(hoverMotion(element, { x: 20, y: 0, scale: 1.012 }));
    });

    // Buttons and filters get a more physical response.
    document.querySelectorAll(".button, .contact-email").forEach((element) => {
      cleanup.push(magneticButton(element));
    });

    document.querySelectorAll(".filter-button").forEach((element) => {
      cleanup.push(hoverMotion(element, { y: -4, scale: 1.08 }));
    });

    // Keep the scroll cue alive until the user starts scrolling.
    if (scrollCue) {
      animate(
        scrollCue,
        { y: [0, 9, 0], opacity: [0.65, 1, 0.65] },
        { duration: 1.5, loop: true, ease: "inOut(2)" }
      );
    }

    return () => {
      observer.disconnect();
      cleanup.forEach((fn) => fn());
    };
  }, [reduceMotion]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduceMotion) return;

    const hero = document.querySelector(".hero-copy");
    const meta = document.querySelector(".hero-meta");
    const square = document.querySelector(".hero-scroll-square");
    const cue = document.querySelector(".scroll-cue");
    const grid = document.querySelector(".grid-overlay");
    const ambientOne = document.querySelector(".ambient-one");
    const ambientTwo = document.querySelector(".ambient-two");

    // Stronger parallax: the hero visibly separates from the page while scrolling.
    const heroY = Math.min(latest * 0.42, 330);
    const heroScale = Math.max(0.82, 1 - latest / 2600);
    const heroRotate = Math.min(latest * 0.012, 4.5);
    const metaY = Math.min(latest * 0.2, 140);
    const squareX = Math.min(latest * 0.7, 520);
    const squareY = latest * 0.24;
    const squareRotate = Math.min(latest * 0.55, 360);

    if (hero) {
      hero.style.transform = `translate3d(0, ${heroY}px, 0) scale(${heroScale}) rotate(${heroRotate}deg)`;
    }
    if (meta) {
      meta.style.transform = `translate3d(0, ${metaY}px, 0)`;
    }
    if (square) {
      square.style.transform = `translate3d(${squareX}px, ${squareY}px, 0) rotate(${squareRotate}deg) scale(${1 + Math.min(latest / 3200, 0.5)})`;
    }
    if (cue) {
      cue.style.opacity = String(Math.max(0, 1 - latest / 180));
    }
    if (grid) {
      grid.style.transform = `translate3d(0, ${latest * 0.08}px, 0)`;
      grid.style.opacity = String(Math.max(0.12, 0.32 - latest / 4200));
    }
    if (ambientOne) {
      ambientOne.style.transform = `translate3d(${latest * 0.06}px, ${latest * -0.12}px, 0) scale(${1 + Math.min(latest / 5000, 0.22)})`;
    }
    if (ambientTwo) {
      ambientTwo.style.transform = `translate3d(${latest * -0.05}px, ${latest * 0.08}px, 0) scale(${1 + Math.min(latest / 4600, 0.18)})`;
    }
  });

  return null;
}

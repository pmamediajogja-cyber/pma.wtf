import { useEffect } from "react";
import {
  animate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

function reveal(element, options = {}) {
  if (!element) return;

  animate(
    element,
    {
      opacity: [0, 1],
      y: [options.y ?? 44, 0],
      scale: [options.scale ?? 0.97, 1],
      ...(options.x !== undefined ? { x: [options.x, 0] } : {}),
    },
    {
      duration: options.duration ?? 0.8,
      delay: options.delay ?? 0,
      ease: [0.16, 1, 0.3, 1],
    }
  );
}

function hoverMotion(element, hover = {}, rest = {}) {
  if (!element) return () => {};

  const enter = () =>
    animate(element, {
      scale: hover.scale ?? 1.015,
      y: hover.y ?? -5,
      x: hover.x ?? 0,
      rotateZ: hover.rotateZ ?? 0,
    }, {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    });

  const leave = () =>
    animate(element, {
      scale: rest.scale ?? 1,
      y: rest.y ?? 0,
      x: rest.x ?? 0,
      rotateZ: rest.rotateZ ?? 0,
    }, {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    });

  element.addEventListener("pointerenter", enter);
  element.addEventListener("pointerleave", leave);

  return () => {
    element.removeEventListener("pointerenter", enter);
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

    reveal(eyebrow, { x: -30, y: 0, duration: 0.65 });
    reveal(heroTitle, { y: 52, scale: 0.94, delay: 0.12, duration: 0.95 });
    reveal(heroLead, { y: 24, delay: 0.3, duration: 0.7 });
    reveal(heroActions, { y: 22, delay: 0.42, duration: 0.7 });
    reveal(heroMeta, { x: 34, y: 0, delay: 0.5, duration: 0.75 });
    reveal(scrollCue, { y: 12, delay: 0.8, duration: 0.55 });

    if (heroCopy) {
      animate(
        heroCopy,
        { opacity: [0, 1], y: [70, 0] },
        { duration: 1.05, ease: [0.16, 1, 0.3, 1] }
      );
    }

    if (square) {
      animate(
        square,
        { rotate: [0, 18], scale: [0.82, 1] },
        { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const delay = Number(element.dataset.motionDelay || 0);
          reveal(element, {
            y: Number(element.dataset.motionY || 55),
            x: Number(element.dataset.motionX || 0),
            scale: Number(element.dataset.motionScale || 0.96),
            delay,
            duration: 0.78,
          });
          observer.unobserve(element);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    document
      .querySelectorAll(
        ".section-heading, .design-card, .service-row, .journal-placeholder, .contact-section"
      )
      .forEach((element, index) => {
        element.style.opacity = "0";
        element.dataset.motionDelay = String((index % 4) * 0.07);
        observer.observe(element);
      });

    const cleanupHover = [];

    document.querySelectorAll(".design-card").forEach((element) => {
      cleanupHover.push(
        hoverMotion(element, { y: -8, scale: 1.018, rotateZ: 0.35 })
      );
    });

    document.querySelectorAll(".service-row").forEach((element) => {
      cleanupHover.push(
        hoverMotion(element, { x: 12, y: 0, scale: 1.005 })
      );
    });

    document.querySelectorAll(".button, .contact-email").forEach((element) => {
      cleanupHover.push(
        hoverMotion(element, { y: -3, scale: 1.025 })
      );
    });

    document.querySelectorAll(".filter-button").forEach((element) => {
      cleanupHover.push(
        hoverMotion(element, { y: -2, scale: 1.04 })
      );
    });

    const cleanup = () => {
      observer.disconnect();
      cleanupHover.forEach((fn) => fn());
    };

    return cleanup;
  }, [reduceMotion]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (reduceMotion) return;

    const hero = document.querySelector(".hero-copy");
    const meta = document.querySelector(".hero-meta");
    const square = document.querySelector(".hero-scroll-square");
    const cue = document.querySelector(".scroll-cue");

    const heroY = Math.min(latest * 0.22, 170);
    const heroScale = Math.max(0.9, 1 - latest / 4200);
    const metaY = Math.min(latest * 0.11, 85);
    const squareX = Math.min(latest * 0.34, 250);
    const squareRotate = Math.min(latest * 0.24, 230);

    if (hero) {
      hero.style.transform = `translate3d(0, ${heroY}px, 0) scale(${heroScale})`;
    }
    if (meta) {
      meta.style.transform = `translate3d(0, ${metaY}px, 0)`;
    }
    if (square) {
      square.style.transform = `translate3d(${squareX}px, ${latest * 0.13}px, 0) rotate(${squareRotate}deg) scale(${1 + Math.min(latest / 5200, 0.34)})`;
    }
    if (cue) {
      cue.style.opacity = String(Math.max(0, 1 - latest / 260));
    }
  });

  return null;
}

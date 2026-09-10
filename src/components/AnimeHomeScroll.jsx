import { useEffect } from "react";
import {
  animate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

const EASE = "easeOut";

function reveal(element, options = {}) {
  if (!element) return;

  animate(
    element,
    {
      opacity: [0, 1],
      y: [options.y ?? 44, 0],
      scale: [options.scale ?? 0.96, 1],
      ...(options.x !== undefined ? { x: [options.x, 0] } : {}),
    },
    {
      duration: options.duration ?? 0.8,
      delay: options.delay ?? 0,
      ease: EASE,
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
        y: hover.y ?? -7,
        x: hover.x ?? 0,
        rotateZ: hover.rotateZ ?? 0,
      },
      {
        duration: 0.28,
        ease: EASE,
      }
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
      {
        duration: 0.42,
        ease: EASE,
      }
    );

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

    reveal(eyebrow, { x: -55, y: 0, duration: 0.7 });
    reveal(heroTitle, { y: 95, scale: 0.9, delay: 0.1, duration: 1.05 });
    reveal(heroLead, { y: 42, delay: 0.28, duration: 0.78 });
    reveal(heroActions, { y: 34, delay: 0.4, duration: 0.78 });
    reveal(heroMeta, { x: 70, y: 0, delay: 0.48, duration: 0.8 });
    reveal(scrollCue, { y: 24, delay: 0.72, duration: 0.6 });

    if (heroCopy) {
      animate(
        heroCopy,
        { opacity: [0, 1], y: [110, 0], scale: [0.94, 1] },
        { duration: 1.15, ease: EASE }
      );
    }

    if (square) {
      animate(
        square,
        { rotate: [0, 55], scale: [0.65, 1] },
        { duration: 1.5, ease: EASE }
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target;
          const delay = Number(element.dataset.motionDelay || 0);
          reveal(element, {
            y: Number(element.dataset.motionY || 75),
            x: Number(element.dataset.motionX || 0),
            scale: Number(element.dataset.motionScale || 0.92),
            delay,
            duration: 0.9,
          });
          observer.unobserve(element);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    document
      .querySelectorAll(
        ".section-heading, .design-card, .service-row, .journal-placeholder, .contact-section"
      )
      .forEach((element, index) => {
        element.style.opacity = "0";
        element.dataset.motionDelay = String((index % 5) * 0.09);
        observer.observe(element);
      });

    const cleanupHover = [];

    document.querySelectorAll(".design-card").forEach((element) => {
      cleanupHover.push(
        hoverMotion(element, { y: -12, scale: 1.035, rotateZ: 0.6 })
      );
    });

    document.querySelectorAll(".service-row").forEach((element) => {
      cleanupHover.push(
        hoverMotion(element, { x: 22, y: 0, scale: 1.008 })
      );
    });

    document.querySelectorAll(".button, .contact-email").forEach((element) => {
      cleanupHover.push(
        hoverMotion(element, { y: -5, scale: 1.045 })
      );
    });

    document.querySelectorAll(".filter-button").forEach((element) => {
      cleanupHover.push(
        hoverMotion(element, { y: -3, scale: 1.07 })
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
    const shell = document.querySelector(".site-shell");
    const grid = document.querySelector(".grid-overlay");
    const ambientOne = document.querySelector(".ambient-one");
    const ambientTwo = document.querySelector(".ambient-two");

    const heroY = Math.min(latest * 0.38, 290);
    const heroScale = Math.max(0.84, 1 - latest / 2600);
    const heroRotate = Math.min(latest * 0.012, 3.5);
    const metaY = Math.min(latest * 0.2, 130);
    const squareX = Math.min(latest * 0.62, 520);
    const squareY = Math.min(latest * 0.2, 170);
    const squareRotate = Math.min(latest * 0.55, 360);

    if (hero) {
      hero.style.transform = `translate3d(0, ${heroY}px, 0) scale(${heroScale}) rotate(${heroRotate}deg)`;
    }
    if (meta) {
      meta.style.transform = `translate3d(0, ${metaY}px, 0)`;
    }
    if (square) {
      square.style.transform = `translate3d(${squareX}px, ${squareY}px, 0) rotate(${squareRotate}deg) scale(${1 + Math.min(latest / 2600, 0.55)})`;
    }
    if (cue) {
      cue.style.opacity = String(Math.max(0, 1 - latest / 180));
      cue.style.transform = `translate3d(0, ${Math.min(latest * 0.4, 70)}px, 0)`;
    }
    if (grid) {
      grid.style.transform = `translate3d(0, ${Math.min(latest * 0.08, 90)}px, 0)`;
    }
    if (ambientOne) {
      ambientOne.style.transform = `translate3d(${Math.min(latest * 0.12, 150)}px, ${Math.min(latest * 0.05, 70)}px, 0)`;
    }
    if (ambientTwo) {
      ambientTwo.style.transform = `translate3d(${Math.min(latest * -0.1, 120)}px, ${Math.min(latest * 0.08, 110)}px, 0)`;
    }
    if (shell) {
      shell.style.setProperty("--scroll-progress", String(Math.min(latest / 1200, 1)));
    }
  });

  return null;
}

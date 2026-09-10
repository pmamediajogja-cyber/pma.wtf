import { useEffect } from "react";
import {
  animate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
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
        duration: 0.32,
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
        duration: 0.48,
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

function prepareLayer(element) {
  if (!element) return;
  element.style.willChange = "transform, opacity";
  element.style.backfaceVisibility = "hidden";
  element.style.transformStyle = "preserve-3d";
}

export default function AnimeHomeScroll() {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 105,
    damping: 30,
    mass: 0.55,
    restDelta: 0.001,
  });
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

    [heroCopy, heroMeta, square, scrollCue].forEach(prepareLayer);

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
          prepareLayer(element);
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
      prepareLayer(element);
      cleanupHover.push(
        hoverMotion(element, { y: -12, scale: 1.035, rotateZ: 0.6 })
      );
    });

    document.querySelectorAll(".service-row").forEach((element) => {
      prepareLayer(element);
      cleanupHover.push(
        hoverMotion(element, { x: 22, y: 0, scale: 1.008 })
      );
    });

    document.querySelectorAll(".button, .contact-email").forEach((element) => {
      prepareLayer(element);
      cleanupHover.push(
        hoverMotion(element, { y: -5, scale: 1.045 })
      );
    });

    document.querySelectorAll(".filter-button").forEach((element) => {
      prepareLayer(element);
      cleanupHover.push(
        hoverMotion(element, { y: -3, scale: 1.07 })
      );
    });

    return () => {
      observer.disconnect();
      cleanupHover.forEach((fn) => fn());
    };
  }, [reduceMotion]);

  useMotionValueEvent(smoothScrollY, "change", (latest) => {
    if (reduceMotion) return;

    const hero = document.querySelector(".hero-copy");
    const meta = document.querySelector(".hero-meta");
    const square = document.querySelector(".hero-scroll-square");
    const cue = document.querySelector(".scroll-cue");
    const shell = document.querySelector(".site-shell");
    const grid = document.querySelector(".grid-overlay");
    const ambientOne = document.querySelector(".ambient-one");
    const ambientTwo = document.querySelector(".ambient-two");

    const heroY = Math.min(latest * 0.30, 225);
    const heroScale = Math.max(0.88, 1 - latest / 3300);
    const heroRotate = Math.min(latest * 0.009, 3.2);
    const metaY = Math.min(latest * 0.15, 100);
    const squareX = Math.min(latest * 0.48, 400);
    const squareY = Math.min(latest * 0.16, 135);
    const squareRotate = Math.min(latest * 0.42, 300);
    const squareScale = 1 + Math.min(latest / 3400, 0.42);

    if (hero) {
      hero.style.transform = `translate3d(0, ${heroY}px, 0) scale(${heroScale}) rotate(${heroRotate}deg)`;
    }
    if (meta) {
      meta.style.transform = `translate3d(0, ${metaY}px, 0)`;
    }
    if (square) {
      square.style.transform = `translate3d(${squareX}px, ${squareY}px, 0) rotate(${squareRotate}deg) scale(${squareScale})`;
    }
    if (cue) {
      cue.style.opacity = String(Math.max(0, 1 - latest / 220));
      cue.style.transform = `translate3d(0, ${Math.min(latest * 0.32, 60)}px, 0)`;
    }
    if (grid) {
      grid.style.transform = `translate3d(0, ${Math.min(latest * 0.06, 70)}px, 0)`;
    }
    if (ambientOne) {
      ambientOne.style.transform = `translate3d(${Math.min(latest * 0.09, 120)}px, ${Math.min(latest * 0.04, 55)}px, 0)`;
    }
    if (ambientTwo) {
      ambientTwo.style.transform = `translate3d(${Math.min(latest * -0.075, 95)}px, ${Math.min(latest * 0.06, 85)}px, 0)`;
    }
    if (shell) {
      shell.style.setProperty("--scroll-progress", String(Math.min(latest / 1200, 1)));
    }
  });

  return null;
}

import { useEffect } from "react";
import { animate, onScroll, stagger } from "animejs";

export default function AnimeHomeScroll() {
  useEffect(() => {
    const animations = [];

    // HERO: obvious entrance animation so the Home page immediately feels alive.
    const heroCopy = document.querySelector(".hero-copy");
    if (heroCopy) {
      animations.push(
        animate(heroCopy, {
          opacity: [0, 1],
          translateY: [70, 0],
          duration: 1100,
          ease: "out(4)",
        })
      );
    }

    const eyebrow = document.querySelector(".hero .eyebrow");
    if (eyebrow) {
      animations.push(
        animate(eyebrow, {
          opacity: [0, 1],
          translateX: [-35, 0],
          duration: 750,
          delay: 180,
          ease: "out(4)",
        })
      );
    }

    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
      animations.push(
        animate(heroTitle, {
          opacity: [0, 1],
          translateY: [45, 0],
          scale: [0.94, 1],
          duration: 950,
          delay: 280,
          ease: "out(4)",
        })
      );
    }

    const heroLead = document.querySelector(".hero-lead");
    if (heroLead) {
      animations.push(
        animate(heroLead, {
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 700,
          delay: 520,
          ease: "out(4)",
        })
      );
    }

    const heroActions = document.querySelector(".hero-actions");
    if (heroActions) {
      animations.push(
        animate(heroActions, {
          opacity: [0, 1],
          translateY: [25, 0],
          duration: 700,
          delay: 650,
          ease: "out(4)",
        })
      );
    }

    const metaLines = document.querySelectorAll(".hero-meta .meta-line");
    if (metaLines.length) {
      animations.push(
        animate(metaLines, {
          opacity: [0, 1],
          translateX: [35, 0],
          delay: stagger(90, { start: 850 }),
          duration: 650,
          ease: "out(4)",
        })
      );
    }

    const scrollCue = document.querySelector(".scroll-cue");
    if (scrollCue) {
      animations.push(
        animate(scrollCue, {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 600,
          delay: 1250,
          ease: "out(3)",
        })
      );
    }

    // HERO PARALLAX: large enough to actually notice while scrolling.
    if (heroCopy) {
      animations.push(
        animate(heroCopy, {
          translateY: [0, 180],
          scale: [1, 0.9],
          ease: "linear",
          autoplay: onScroll({
            enter: "top top",
            leave: "bottom top",
            sync: 0.45,
          }),
        })
      );
    }

    const heroMeta = document.querySelector(".hero-meta");
    if (heroMeta) {
      animations.push(
        animate(heroMeta, {
          translateY: [0, 90],
          ease: "linear",
          autoplay: onScroll({
            enter: "top top",
            leave: "bottom top",
            sync: 0.4,
          }),
        })
      );
    }

    const square = document.querySelector(".hero-scroll-square");
    if (square) {
      animations.push(
        animate(square, {
          translateX: [0, 260],
          translateY: [0, 100],
          rotate: [0, 240],
          scale: [1, 1.35],
          ease: "linear",
          autoplay: onScroll({
            enter: "top top",
            leave: "bottom top",
            sync: 0.5,
          }),
        })
      );
    }

    // CARDS: stronger entrance with scale + rotation, but no opacity dimming.
    const cards = document.querySelectorAll(".design-card");
    if (cards.length) {
      animations.push(
        animate(cards, {
          translateY: [90, 0],
          scale: [0.9, 1],
          rotateZ: [-2, 0],
          delay: stagger(90),
          ease: "out(4)",
          autoplay: onScroll({
            enter: "bottom-=120 bottom",
            leave: "top+=80 top",
            sync: 0.35,
          }),
        })
      );
    }

    // SERVICES: each row tracks the scroll with a visible horizontal shift.
    const serviceRows = document.querySelectorAll(".service-row");
    if (serviceRows.length) {
      animations.push(
        animate(serviceRows, {
          translateX: [100, 0],
          delay: stagger(70),
          ease: "out(4)",
          autoplay: onScroll({
            enter: "bottom-=100 bottom",
            leave: "top+=100 top",
            sync: 0.3,
          }),
        })
      );
    }

    const journal = document.querySelector(".journal-placeholder");
    if (journal) {
      animations.push(
        animate(journal, {
          translateY: [100, 0],
          scale: [0.96, 1],
          ease: "out(4)",
          autoplay: onScroll({
            enter: "bottom-=100 bottom",
            leave: "top+=100 top",
            sync: 0.3,
          }),
        })
      );
    }

    const contact = document.querySelector(".contact-section");
    if (contact) {
      animations.push(
        animate(contact, {
          translateY: [80, 0],
          ease: "out(4)",
          autoplay: onScroll({
            enter: "bottom-=100 bottom",
            leave: "top+=100 top",
            sync: 0.3,
          }),
        })
      );
    }

    return () => {
      animations.forEach((animation) => animation.pause?.());
    };
  }, []);

  return null;
}

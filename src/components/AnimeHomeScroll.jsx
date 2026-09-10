import { useEffect } from "react";
import { animate, onScroll, stagger } from "animejs";

export default function AnimeHomeScroll() {
  useEffect(() => {
    const animations = [];

    const square = document.querySelector(".hero-scroll-square");
    if (square) {
      animations.push(
        animate(square, {
          x: "12rem",
          rotate: "1turn",
          scale: [1, 1.12],
          ease: "linear",
          autoplay: onScroll({
            enter: "bottom-=20 top",
            leave: "top+=80 bottom",
            sync: 0.22,
          }),
        })
      );
    }

    const heroCopy = document.querySelector(".hero-copy");
    if (heroCopy) {
      animations.push(
        animate(heroCopy, {
          translateY: ["0rem", "5rem"],
          ease: "linear",
          autoplay: onScroll({
            enter: "bottom top+=15%",
            leave: "top+=35% top",
            sync: 0.35,
          }),
        })
      );
    }

    const heroMeta = document.querySelector(".hero-meta");
    if (heroMeta) {
      animations.push(
        animate(heroMeta, {
          translateY: ["0rem", "2.5rem"],
          ease: "linear",
          autoplay: onScroll({
            enter: "bottom top+=15%",
            leave: "top+=35% top",
            sync: 0.3,
          }),
        })
      );
    }

    const cards = document.querySelectorAll(".design-card");
    if (cards.length) {
      animations.push(
        animate(cards, {
          translateY: ["2rem", "0rem"],
          delay: stagger(70),
          ease: "out(4)",
          autoplay: onScroll({
            enter: "bottom-=80 bottom",
            leave: "top+=80 top",
            sync: 0.28,
          }),
        })
      );
    }

    const serviceRows = document.querySelectorAll(".service-row");
    if (serviceRows.length) {
      animations.push(
        animate(serviceRows, {
          translateX: ["1.5rem", "0rem"],
          delay: stagger(55),
          ease: "out(4)",
          autoplay: onScroll({
            enter: "bottom-=40 bottom",
            leave: "top+=40 top",
            sync: 0.22,
          }),
        })
      );
    }

    const journal = document.querySelector(".journal-placeholder");
    if (journal) {
      animations.push(
        animate(journal, {
          translateY: ["2rem", "0rem"],
          ease: "out(4)",
          autoplay: onScroll({
            enter: "bottom-=40 bottom",
            leave: "top+=40 top",
            sync: 0.24,
          }),
        })
      );
    }

    const contact = document.querySelector(".contact-section");
    if (contact) {
      animations.push(
        animate(contact, {
          translateY: ["2rem", "0rem"],
          ease: "out(4)",
          autoplay: onScroll({
            enter: "bottom-=40 bottom",
            leave: "top+=40 top",
            sync: 0.24,
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

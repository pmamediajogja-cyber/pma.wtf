import { useEffect } from "react";
import { animate, stagger } from "animejs";

export default function AnimeEffects() {
  useEffect(() => {
    const selectors = [
      ".profile-section",
      ".cv-section",
      ".approach-grid > div",
      ".strength-list > div",
      ".cv-skill-group",
      ".cv-traits > div",
    ];

    const elements = Array.from(document.querySelectorAll(selectors.join(",")));
    if (!elements.length) return;

    const revealed = new WeakSet();

    const observer = new IntersectionObserver((entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting && !revealed.has(entry.target))
        .map((entry) => entry.target);

      if (!entering.length) return;
      entering.forEach((element) => revealed.add(element));

      animate(entering, {
        opacity: [0, 1],
        translateY: [24, 0],
        duration: 700,
        delay: stagger(55),
        ease: "out(4)",
      });
    }, { threshold: 0.12 });

    elements.forEach((element) => {
      element.style.opacity = "0";
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}

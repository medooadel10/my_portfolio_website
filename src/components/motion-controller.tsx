"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Progressive enhancement: content is visible before JS and stays visible if motion is disabled.
export function MotionController() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanUpMotion = () => {};

    function setupMotion() {
      cleanUpMotion();
      if (preference.matches) return;

      const nodes = [...document.querySelectorAll<HTMLElement>(".section-heading, .project-card, .expertise-card, .timeline-item, .case-story, .case-features > article, .gallery-item, .case-outcome, .next-project, .contact-inner, .about-portrait")];
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

      nodes.forEach((node, index) => {
        // Avoid hiding content already visible when navigating or restoring scroll.
        if (node.getBoundingClientRect().top < window.innerHeight - 24) return;
        node.style.setProperty("--reveal-delay", `${index % 2 * 65}ms`);
        node.classList.add("reveal-ready");
        observer.observe(node);
      });

      const removePointerListeners: (() => void)[] = [];
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        document.querySelectorAll<HTMLElement>(".project-image-wrap, .case-visual, .hero-art").forEach((stage) => {
          let frame = 0;
          const move = (event: PointerEvent) => {
            if (event.pointerType === "touch") return;
            cancelAnimationFrame(frame);
            const { clientX, clientY } = event;
            frame = requestAnimationFrame(() => {
              const rect = stage.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
              const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
              stage.style.setProperty("--tilt-x", `${(0.5-y)*5}deg`);
              stage.style.setProperty("--tilt-y", `${(x-0.5)*7}deg`);
              stage.style.setProperty("--spot-x", `${x*100}%`);
              stage.style.setProperty("--spot-y", `${y*100}%`);
            });
          };
          const reset = () => {
            cancelAnimationFrame(frame);
            for (const property of ["--tilt-x", "--tilt-y", "--spot-x", "--spot-y"]) stage.style.removeProperty(property);
          };
          stage.addEventListener("pointermove", move, { passive: true });
          stage.addEventListener("pointerleave", reset);
          removePointerListeners.push(() => { stage.removeEventListener("pointermove", move); stage.removeEventListener("pointerleave", reset); reset(); });
        });
      }

      cleanUpMotion = () => {
        observer.disconnect();
        for (const node of nodes) { node.classList.remove("reveal-ready", "is-visible"); node.style.removeProperty("--reveal-delay"); }
        for (const remove of removePointerListeners) remove();
      };
    }

    setupMotion();
    preference.addEventListener("change", setupMotion);
    let scrollFrame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty("--reading-progress", String(distance > 0 ? Math.max(0, Math.min(1, window.scrollY / distance)) : 0));
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      cleanUpMotion();
      preference.removeEventListener("change", setupMotion);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      cancelAnimationFrame(scrollFrame);
    };
  }, [pathname]);

  return null;
}

import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for Interviewly motion mechanics:
 * 1. IntersectionObserver with eager viewport threshold triggering translateY(0) and opacity 1.
 * 2. Gentle cursor-reactive 3D perspective and parallax for the hero console.
 * 3. Scroll progress tracker for viewport timeline progression.
 */
export function useScrollReveal() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [heroParallax, setHeroParallax] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafId = useRef(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => motionQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll, .line-mask-wrap').forEach((el) => {
        el.classList.add('is-revealed');
        el.classList.add('is-visible');
      });
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    // Eager rootMargin to ensure elements are smoothly revealed ahead of scrolling
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.01,
      rootMargin: '400px 0px 400px 0px',
    });

    const checkVisibility = () => {
      document.querySelectorAll('.reveal-on-scroll:not(.is-revealed), .line-mask-wrap:not(.is-revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 350 && rect.bottom > -350) {
          el.classList.add('is-revealed');
          el.classList.add('is-visible');
          try { observer.unobserve(el); } catch (e) {}
        }
      });
    };

    const elements = document.querySelectorAll('.reveal-on-scroll, .line-mask-wrap');
    elements.forEach((el) => {
      observer.observe(el);
    });

    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });

    // Scroll progress tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  // Refined cursor response for desktop hero
  const handleHeroMouseMove = (e) => {
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

      setHeroParallax({
        x: Math.round(normX * 16 * 10) / 10,
        y: Math.round(normY * 12 * 10) / 10,
        normX: Math.round(normX * 100) / 100,
        normY: Math.round(normY * 100) / 100,
      });
    });
  };

  const handleHeroMouseLeave = () => {
    if (prefersReducedMotion) return;
    setHeroParallax({ x: 0, y: 0, normX: 0, normY: 0 });
  };

  return {
    heroParallax,
    scrollProgress,
    handleHeroMouseMove,
    handleHeroMouseLeave,
    prefersReducedMotion,
  };
}

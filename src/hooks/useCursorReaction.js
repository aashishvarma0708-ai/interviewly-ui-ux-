import { useEffect } from 'react';

/**
 * Universal Cursor Reaction & Kinetic Animation Engine for Interviewly:
 * 1. Magnetic pull physics on every button, link, and interactive control.
 * 2. 3D perspective tilt & dynamic specular lighting tracking on all cards across every section.
 * 3. Dynamic ambient light beam tracking on :root for continuous site-wide illumination.
 * 4. Micro-parallax tilt and metallic specular sheen on all typography (h1, h2, h3, h4, headlines).
 * 5. MutationObserver auto-binding across dynamic DOM changes and client-side page routing.
 */
export function useCursorReaction() {
  useEffect(() => {
    // Only enable on desktop fine pointer devices without reduced motion preference
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) return;

    let globalRafId = null;

    // ── 1. Global Ambient Light Beam Tracking ──
    const handleGlobalMouseMove = (e) => {
      if (globalRafId) cancelAnimationFrame(globalRafId);

      globalRafId = requestAnimationFrame(() => {
        const xPct = Math.round((e.clientX / window.innerWidth) * 100);
        const yPct = Math.round((e.clientY / window.innerHeight) * 100);

        // Smoothly update global CSS variables for the background light beam
        document.documentElement.style.setProperty('--global-mouse-x', `${xPct}%`);
        document.documentElement.style.setProperty('--global-mouse-y', `${yPct}%`);
      });
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });

    // ── 2. Magnetic Pull Physics for Every Button & Control ──
    const magneticSelectors = [
      'button',
      'a.sen-btn-primary',
      'a.sen-btn-secondary',
      'a.sen-btn-inquire',
      'a.sen-btn-ghost',
      'a.sen-footer-reserve-btn',
      'a.sen-nav-link',
      '.sen-btn-primary',
      '.sen-btn-secondary',
      '.sen-btn-inquire',
      '.sen-toggle-btn',
      '.sen-submit-btn',
      '.sen-step-btn',
      '.sen-swatch-btn',
      '.sen-footer-reserve-btn',
      '.sen-console-action-btn',
      '.sen-modal-close-btn',
      '.sen-evidence-nav-btn',
      '[data-magnetic]',
    ].join(', ');

    const handleMagneticMove = (e) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Magnetic pull factor: stronger on primary pills, subtle on compact controls
      const isPrimary = el.classList.contains('sen-btn-primary') ||
                        el.classList.contains('sen-submit-btn') ||
                        el.classList.contains('sen-btn-inquire') ||
                        el.classList.contains('sen-console-action-btn');
      const pullFactor = isPrimary ? 0.32 : 0.22;
      const textPull = pullFactor * 0.45;

      el.style.willChange = 'transform';
      el.style.transition = 'transform 0.08s ease-out';
      el.style.transform = `translate3d(${x * pullFactor}px, ${y * pullFactor}px, 0)`;

      // Parallax inner label
      const inner = el.querySelector('span:first-child') || el.querySelector('span');
      if (inner && inner !== el) {
        inner.style.willChange = 'transform';
        inner.style.transition = 'transform 0.08s ease-out';
        inner.style.transform = `translate3d(${x * textPull}px, ${y * textPull}px, 0)`;
      }
    };

    const handleMagneticLeave = (e) => {
      const el = e.currentTarget;
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = 'translate3d(0, 0, 0)';

      const inner = el.querySelector('span:first-child') || el.querySelector('span');
      if (inner && inner !== el) {
        inner.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        inner.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    // ── 3. 3D Card Tilt & Dynamic Specular Lighting on All Cards ──
    const cardSelectors = [
      '.sen-audience-card',
      '.sen-step-column-card',
      '.sen-benefit-col',
      '.sen-stream-preview-card',
      '.sen-swatches-card',
      '.sen-evidence-narrative',
      '.sen-evidence-macro-card',
      '.sen-closing-inner',
      '.sen-auth-card',
      '.sen-modal-card',
      '.sen-spec-card',
      '[data-tilt]',
    ].join(', ');

    const handleCardMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = Math.round((x / rect.width) * 100);
      const yPct = Math.round((y / rect.height) * 100);

      // Card specular highlight position
      card.style.setProperty('--card-mouse-x', `${xPct}%`);
      card.style.setProperty('--card-mouse-y', `${yPct}%`);

      // Gentle 3D Tilt calculation (max 4.5 degrees)
      const normX = (x / rect.width) * 2 - 1; // -1 to 1
      const normY = (y / rect.height) * 2 - 1; // -1 to 1

      const tiltX = Math.round(-normY * 4.2 * 10) / 10;
      const tiltY = Math.round(normX * 4.2 * 10) / 10;

      card.style.willChange = 'transform';
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    };

    const handleCardLeave = (e) => {
      const card = e.currentTarget;
      card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.setProperty('--card-mouse-x', '50%');
      card.style.setProperty('--card-mouse-y', '50%');
    };

    // ── 4. Interactive Typography Tilt & Specular Metallic Sheen ──
    const textSelectors = [
      'h1',
      'h2',
      'h3',
      'h4',
      '.sen-hero-headline',
      '.sen-section-title',
      '.sen-evidence-title',
      '.sen-audience-title',
      '.sen-closing-headline',
      '.sen-login-title',
      '.sen-signup-title',
      '.sen-brandmark-main',
      '[data-text-react]',
    ].join(', ');

    const handleTextMove = (e) => {
      const textEl = e.currentTarget;
      const rect = textEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = Math.round((x / rect.width) * 100);
      const yPct = Math.round((y / rect.height) * 100);

      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      const tiltX = Math.round(-normY * 3.5 * 10) / 10;
      const tiltY = Math.round(normX * 3.5 * 10) / 10;

      textEl.style.setProperty('--text-mouse-x', `${xPct}%`);
      textEl.style.setProperty('--text-mouse-y', `${yPct}%`);
      textEl.style.willChange = 'transform';
      textEl.style.transition = 'transform 0.1s ease-out';
      textEl.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleTextLeave = (e) => {
      const textEl = e.currentTarget;
      textEl.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
      textEl.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
      textEl.style.setProperty('--text-mouse-x', '50%');
      textEl.style.setProperty('--text-mouse-y', '50%');
    };

    // Bind event listeners with memory safety
    const boundElements = new WeakSet();

    const attachListeners = () => {
      document.querySelectorAll(magneticSelectors).forEach((el) => {
        if (!boundElements.has(el)) {
          el.addEventListener('mousemove', handleMagneticMove, { passive: true });
          el.addEventListener('mouseleave', handleMagneticLeave);
          boundElements.add(el);
        }
      });

      document.querySelectorAll(cardSelectors).forEach((card) => {
        if (!boundElements.has(card)) {
          card.addEventListener('mousemove', handleCardMove, { passive: true });
          card.addEventListener('mouseleave', handleCardLeave);
          boundElements.add(card);
        }
      });

      document.querySelectorAll(textSelectors).forEach((textEl) => {
        if (!boundElements.has(textEl)) {
          textEl.addEventListener('mousemove', handleTextMove, { passive: true });
          textEl.addEventListener('mouseleave', handleTextLeave);
          boundElements.add(textEl);
        }
      });
    };

    attachListeners();

    // Re-attach listeners when DOM updates (e.g. dynamic state changes or route switches)
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (globalRafId) cancelAnimationFrame(globalRafId);
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      observer.disconnect();

      document.querySelectorAll(magneticSelectors).forEach((el) => {
        el.removeEventListener('mousemove', handleMagneticMove);
        el.removeEventListener('mouseleave', handleMagneticLeave);
      });

      document.querySelectorAll(cardSelectors).forEach((card) => {
        card.removeEventListener('mousemove', handleCardMove);
        card.removeEventListener('mouseleave', handleCardLeave);
      });

      document.querySelectorAll(textSelectors).forEach((textEl) => {
        textEl.removeEventListener('mousemove', handleTextMove);
        textEl.removeEventListener('mouseleave', handleTextLeave);
      });
    };
  }, []);
}

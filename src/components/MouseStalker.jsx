import React, { useEffect, useState, useRef } from 'react';
import './MouseStalker.css';

/**
 * Custom magnetic cursor ("MouseStalker") for Interviewly.
 * Tracks cursor position with smooth lerp interpolation and displays context labels.
 * Interacts with buttons, cards, typography, and interactive controls.
 */
export default function MouseStalker() {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const stalkerRef = useRef(null);
  const dotRef = useRef(null);
  
  const mousePos = useRef({ x: -100, y: -100 });
  const stalkerPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only enable on desktop fine pointer devices without reduced motion preference
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!finePointer || reducedMotion) return;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!visible) setVisible(true);

      // Check if target or parent has custom cursor label or is interactive
      const target = e.target;
      const interactiveEl = target.closest(
        '[data-cursor-label], button, a, .sen-btn-primary, .sen-btn-secondary, .sen-audience-card, .sen-step-column-card, .sen-benefit-col, .sen-stream-preview-card, .sen-swatches-card, .sen-spec-card, .sen-toggle-btn, .sen-swatch-btn, input, select, .sen-hero-headline, .sen-section-title'
      );
      
      if (interactiveEl) {
        setIsHovered(true);
        const customLabel = interactiveEl.getAttribute('data-cursor-label');
        if (customLabel) {
          setLabel(customLabel);
        } else if (interactiveEl.classList.contains('sen-btn-primary')) {
          setLabel('EXPLORE');
        } else if (interactiveEl.classList.contains('sen-btn-secondary')) {
          setLabel('VIEW');
        } else if (interactiveEl.classList.contains('sen-btn-inquire')) {
          setLabel('CONTACT');
        } else if (interactiveEl.classList.contains('sen-console-action-btn')) {
          setLabel('INSPECT');
        } else if (interactiveEl.tagName === 'BUTTON') {
          setLabel('SELECT');
        } else if (interactiveEl.tagName === 'A') {
          setLabel('ENTER');
        } else {
          setLabel('');
        }
      } else {
        setIsHovered(false);
        setLabel('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp loop for the outer stalker ring (0.18 factor for snappy precision)
    const render = () => {
      stalkerPos.current.x += (mousePos.current.x - stalkerPos.current.x) * 0.18;
      stalkerPos.current.y += (mousePos.current.y - stalkerPos.current.y) * 0.18;

      if (stalkerRef.current) {
        stalkerRef.current.style.transform = `translate3d(${stalkerPos.current.x}px, ${stalkerPos.current.y}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [visible]);

  return (
    <>
      {/* Outer fluid trailing ring with dynamic text label */}
      <div
        ref={stalkerRef}
        className={`mouse-stalker ${visible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''} ${isClicking ? 'is-clicking' : ''} ${label ? 'has-label' : ''}`}
        aria-hidden="true"
      >
        <div className="mouse-stalker-circle" />
        {label && <span className="mouse-stalker-label">{label}</span>}
      </div>

      {/* Direct center point dot */}
      <div
        ref={dotRef}
        className={`mouse-stalker-dot ${visible ? 'is-visible' : ''} ${isHovered ? 'is-hovered' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}

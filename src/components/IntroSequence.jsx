import React, { useState, useEffect, useRef } from 'react';
import './IntroSequence.css';

/**
 * Editorial Opening Intro Sequence for Interviewly:
 * - No loading bar or percentage counters.
 * - Interactive swipe-across curtain transition triggered by cursor movement.
 * - Also responds to click, touch, or keyboard input.
 */
export default function IntroSequence({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const initialPos = useRef(null);
  const hasTriggered = useRef(false);

  const handleSwipeAcross = () => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;
    setIsExiting(true);
    sessionStorage.setItem('interviewly_intro_seen', 'true');

    setTimeout(() => {
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 700); // Matches horizontal curtain swipe duration
  };

  useEffect(() => {
    // Check if user already saw intro in current session
    const seen = sessionStorage.getItem('interviewly_intro_seen');
    if (seen) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    // Always ensure window is pinned to top when intro displays
    window.scrollTo(0, 0);

    // 1. Cursor Movement Detection: triggers swipe across on intentional pointer movement
    const handleMouseMove = (e) => {
      if (hasTriggered.current) return;

      if (!initialPos.current) {
        initialPos.current = { x: e.clientX, y: e.clientY };
        return;
      }

      const dx = e.clientX - initialPos.current.x;
      const dy = e.clientY - initialPos.current.y;
      const distance = Math.hypot(dx, dy);

      // Trigger swipe once pointer moves intentionally (> 10px)
      if (distance > 10) {
        handleSwipeAcross();
      }
    };

    // 2. Click or Touch Gestures
    const handleClick = () => handleSwipeAcross();
    const handleTouchMove = () => handleSwipeAcross();

    // 3. Keyboard Shortcut (Escape, Space, Enter)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleSwipeAcross();
      }
    };

    // 4. Safe fallback: auto-swipe after 5.5s if user remains idle
    const fallbackTimer = setTimeout(() => {
      handleSwipeAcross();
    }, 5500);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleClick, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      className={`intro-sequence-overlay ${isExiting ? 'is-exiting' : ''}`}
      onClick={handleSwipeAcross}
      data-cursor-label="SWIPE"
    >
      {/* Background atmospheric gradient */}
      <div className="intro-bg-gradient" />

      {/* Top editorial metadata */}
      <div className="intro-topbar">
        <span className="intro-meta-item">CALIBRATED CAREER NETWORK</span>
        <span className="intro-meta-item">INTERVIEW PROTOCOL 2.0</span>
        <span className="intro-meta-item">VERIFIED ENGINEERING TALENT</span>
      </div>

      {/* Main Center Message (clean architectural typography) */}
      <div className="intro-center">
        <div className="intro-brand-mask">
          <div className="intro-brand-text">interviewly</div>
        </div>

        <div className="intro-line-mask intro-line-mask--1">
          <h2 className="intro-headline">WHERE REFINED TALENT</h2>
        </div>
        <div className="intro-line-mask intro-line-mask--2">
          <h2 className="intro-headline intro-headline--accent">MEETS EXCEPTIONAL TEAMS.</h2>
        </div>

        <p className="intro-subtext">
          High-Signal Matching · Synchronized Technical Interviews · Calibrated Scorecards
        </p>

        {/* Interactive Swipe Indicator Pill (No Loading Bar) */}
        <div className="intro-swipe-indicator">
          <span className="intro-swipe-dot" />
          <span className="intro-swipe-label">MOVE CURSOR OR SWIPE UP TO ENTER</span>
          <span className="intro-swipe-arrow">↑</span>
        </div>
      </div>

      {/* Bottom archival bar */}
      <div className="intro-bottombar">
        <div className="intro-bottom-pill">
          <span>INTERACTION SENSITIVE · ACTIVE ENGINE</span>
        </div>
        <div className="intro-bottom-meta">
          <span>PRECISION TECHNICAL HIRING PLATFORM</span>
        </div>
      </div>
    </div>
  );
}

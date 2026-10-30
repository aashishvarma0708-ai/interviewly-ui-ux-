import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';

  const handleAnchorClick = (e, targetId) => {
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
      }
    }
  };

  return (
    <header className={`sen-header ${scrolled ? 'sen-header--scrolled' : ''}`}>
      <div className="sen-header-inner container-wide">
        {/* Brandmark */}
        <Link to="/" className="sen-brandmark" aria-label="Interviewly home" data-cursor-label="HOME">
          <span className="sen-brandmark-main">interviewly</span>
          <span className="sen-brandmark-sub">PROTOCOL 2.0</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`sen-nav ${mobileOpen ? 'sen-nav--open' : ''}`} aria-label="Main navigation">
          <div className="sen-nav-links">
            <Link
              to={isHome ? '#how-it-works' : '/#how-it-works'}
              className="sen-nav-link"
              onClick={(e) => handleAnchorClick(e, 'how-it-works')}
              data-cursor-label="METHOD"
            >
              How It Works
            </Link>
            <Link
              to={isHome ? '#evidence' : '/#evidence'}
              className="sen-nav-link"
              onClick={(e) => handleAnchorClick(e, 'evidence')}
              data-cursor-label="EVIDENCE"
            >
              Evidence
            </Link>
            <Link
              to={isHome ? '#variants' : '/#variants'}
              className="sen-nav-link"
              onClick={(e) => handleAnchorClick(e, 'variants')}
              data-cursor-label="ROLES"
            >
              Role Streams
            </Link>
            <Link
              to={isHome ? '#audiences' : '/#audiences'}
              className="sen-nav-link"
              onClick={(e) => handleAnchorClick(e, 'audiences')}
              data-cursor-label="TEAMS"
            >
              For Companies
            </Link>
          </div>

          <div className="sen-nav-actions">
            <Link
              to="/login"
              className="sen-nav-link sen-nav-link--login"
              data-cursor-label="LOGIN"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="sen-btn-inquire"
              data-cursor-label="SIGNUP"
            >
              <span>Sign Up</span>
              <span className="sen-btn-arrow">→</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className={`sen-hamburger ${mobileOpen ? 'sen-hamburger--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
        >
          <span className="sen-hamburger-bar" />
          <span className="sen-hamburger-bar" />
        </button>
      </div>

      {mobileOpen && (
        <div className="sen-mobile-backdrop" onClick={() => setMobileOpen(false)} />
      )}
    </header>
  );
}

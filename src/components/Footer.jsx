import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="sen-footer">
      <div className="container-wide">
        {/* Top Editorial Row */}
        <div className="sen-footer-top">
          <div className="sen-footer-col sen-footer-col--brand">
            <span className="sen-footer-brand">interviewly</span>
            <p className="sen-footer-tagline">
              The calibrated interview and career-matching platform for technical leaders,
              staff engineers, and engineering organizations. Precision matching without resume noise.
            </p>
            <div className="sen-footer-coords">
              <span>CALIBRATED CAREER NETWORK</span>
              <span>AES-256 ENCRYPTED · VERIFIED DOSSIERS</span>
            </div>
          </div>

          <div className="sen-footer-col">
            <h5 className="sen-footer-heading">Architecture &amp; Flow</h5>
            <ul className="sen-footer-list">
              <li><a href="#how-it-works" data-cursor-label="METHOD">[01] Four-Step Methodology</a></li>
              <li><a href="#evidence" data-cursor-label="EVIDENCE">[02] Architectural Evidence</a></li>
              <li><a href="#variants" data-cursor-label="ROLES">[03] Curated Role Streams</a></li>
              <li><a href="#audiences" data-cursor-label="TEAMS">[04] For Companies &amp; Engineers</a></li>
            </ul>
          </div>

          <div className="sen-footer-col">
            <h5 className="sen-footer-heading">Role Disciplines</h5>
            <ul className="sen-footer-list">
              <li><a href="#variants" data-cursor-label="DESIGN">Design Engineering Track</a></li>
              <li><a href="#variants" data-cursor-label="SYSTEMS">Systems Architecture Track</a></li>
              <li><a href="#variants" data-cursor-label="PRODUCT">Product Leadership Track</a></li>
              <li><a href="#variants" data-cursor-label="AI">AI &amp; Machine Learning Track</a></li>
            </ul>
          </div>

          <div className="sen-footer-col">
            <h5 className="sen-footer-heading">Direct Access</h5>
            <p className="sen-footer-newsletter-text">
              Experience calibrated hiring and frictionless interview cycles for candidates and engineering teams.
            </p>
            <Link to="/signup" className="sen-footer-reserve-btn" data-cursor-label="JOIN">
              <span>Create Free Account</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="sen-footer-bottom">
          <div className="sen-footer-copy">
            &copy; {new Date().getFullYear()} Interviewly Inc. All rights reserved. Strict Candidate Confidentiality.
          </div>
          <div className="sen-footer-meta">
            <span>Verified Capability Standards</span>
            <span className="sen-footer-sep">·</span>
            <span>Zero Unsolicited InMail</span>
            <span className="sen-footer-sep">·</span>
            <span>Mutual Consent Scheduling</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

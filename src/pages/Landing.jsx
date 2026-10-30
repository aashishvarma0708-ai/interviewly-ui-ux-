Warning: truncated output (original token count: 11715)
Total output lines: 1002

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InterviewConsoleVisual from '../components/InterviewConsoleVisual';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Landing.css';

/* ── Four Curated Role Streams (Color-swatch triggers) ── */
const ROLE_STREAMS = [
  {
    id: 'orange',
    name: 'Design Engineering',
    colorHex: '#E85D26',
    candidate: 'Jordan Davis',
    avatar: 'JD',
    roleTitle: 'Staff Frontend Architect',
    company: 'Kinfolk Studio · San Francisco, CA',
    matchScore: '98%',
    description: 'Specializes in surgical web interface systems, high-frame-rate micro-animations, and large-scale React component architectures.',
    tags: ['React', 'Liquid Glass UI', 'Design Systems', 'Web Performance'],
    date: 'Today, 2:30 PM EST',
    evaluator: 'David Sterling · VP Engineering',
    glow: 'radial-gradient(circle 580px at 50% 50%, rgba(232, 93, 38, 0.2) 0%, rgba(232, 93, 38, 0.04) 45%, transparent 75%)',
    pipelineStatus: 'Final Round · System Architecture Review',
    salaryRange: '$210k – $245k · Equity',
  },
  {
    id: 'green',
    name: 'Systems Architecture',
    colorHex: '#2F5E44',
    candidate: 'Elena Rostova',
    avatar: 'ER',
    roleTitle: 'Principal Distributed Architect',
    company: 'Beacon Cloud Labs · New York, NY',
    matchScore: '96%',
    description: 'Expert in multi-region Kubernetes topologies, low-latency Go microservices, distributed consensus, and event stream pipelines.',
    tags: ['Go', 'Kubernetes', 'High-Throughput', 'Event Streams'],
    date: 'Tomorrow, 10:00 AM EST',
    evaluator: 'Sophia Lin · Technical Director',
    glow: 'radial-gradient(circle 580px at 50% 50%, rgba(47, 94, 68, 0.2) 0%, rgba(47, 94, 68, 0.04) 45%, transparent 75%)',
    pipelineStatus: 'Technical Panel · Consensus Deep Dive',
    salaryRange: '$230k – $270k · Equity',
  },
  {
    id: 'white',
    name: 'Product Leadership',
    colorHex: '#555555',
    candidate: 'Marcus Vance',
    avatar: 'MV',
    roleTitle: 'Head of Product Experience',
    company: 'Wavelength Co. · Global Hybrid',
    matchScore: '99%',
    description: 'Leads cross-functional product management, technical design strategy, and team scaling across venture-backed engineering organizations.',
    tags: ['Product Vision', 'Executive Panel', 'Team Scaling', 'Growth'],
    date: 'Thursday, 3:00 PM EST',
    evaluator: 'Founder & CEO Panel',
    glow: 'radial-gradient(circle 580px at 50% 50%, rgba(180, 188, 198, 0.24) 0%, rgba(210, 215, 222, 0.08) 45%, transparent 75%)',
    pipelineStatus: 'Executive Review · Leadership Alignment',
    salaryRange: '$250k – $300k · Executive Equity',
  },
  {
    id: 'dark brown',
    name: 'AI & Machine Learning',
    colorHex: '#382319',
    candidate: 'Kai Chen',
    avatar: 'KC',
    roleTitle: 'Staff Machine Learning Engineer',
    company: 'Tensor Labs · Seattle, WA',
    matchScore: '97%',
    description: 'Architects distributed LLM inference engines, fine-tuning infrastructure, model quantization pipelines, and low-latency embeddings.',
    tags: ['PyTorch', 'Distributed Training', 'LLM Serving', 'CUDA'],
    date: 'Friday, 11:30 AM EST',
    evaluator: 'Research Director',
    glow: 'radial-gradient(circle 580px at 50% 50%, rgba(56, 35, 25, 0.24) 0%, rgba(56, 35, 25, 0.05) 45%, transparent 75%)',
    pipelineStatus: 'Coding Review · GPU Infrastructure',
    salaryRange: '$240k – $285k · Equity',
  },
];

/* ── Evidence Micro-Attributes ([01] through [04]) ── */
const EVIDENCE_ITEMS = [
  {
    num: '01',
    title: 'Precision matching forged by verified criteria',
    subtitle: 'Mutual technical alignment eliminates resume noise and unqualified outreach.',
    body: 'Interviewly replaces keyword-stuffed resumes with structured capability profiles. Candidates specify verified technical domains, salary expectations, and working models; hiring teams specify objective hiring standards. Both sides only connect when deep architectural compatibility is verified.',
    specs: [
      { label: 'Match Index Accuracy', val: '98% Signal Quality' },
      { label: 'Unsolicited Inmail Spam', val: '0% Eliminated' },
      { label: 'First-Round Conversion', val: '3.4x Higher' },
      { label: 'Verification Standard', val: 'Peer-Reviewed Projects' },
    ],
  },
  {
    num: '02',
    title: 'Frictionless interview coordination & calendar sync',
    subtitle: 'Direct multi-calendar integration across Google Calendar & Outlook.',
    body: 'No endless email chains or conflicting timezone scheduling. Once mutual interest is confirmed, available evaluation windows automatically synchronize between the candidate and panel interviewers, reserving video slots and sending calendar invites with complete technical briefs attached.',
    specs: [
      { label: 'Scheduling Turnaround', val: '< 30 Seconds' },
      { label: 'Timezone Auto-Shift', val: '100% Automatic' },
      { label: 'Calendar Connectors', val: 'Google, Outlook, Cal' },
      { label: 'Reschedule Buffer', val: 'Instant Single-Click' },
    ],
  },
  {
    num: '03',
    title: 'Structured scorecards & unbiased evaluation',
    subtitle: 'Objective criteria rubrics prevent hiring bias and align team decisions.',
    body: 'Interviewly provides interviewers with pre-configured, role-specific evaluation scorecards. Panelists rate candidates across verified dimensions (System Design, Technical Depth, Collaboration, Problem Solving) simultaneously, preventing groupthink and speeding up final offer decisions.',
    specs: [
      { label: 'Evaluation Dimensions', val: '4 Standard Pillars' },
      { label: 'Scorecard Consolidation', val: 'Instant Unified View' },
      { label: 'Hiring Committee Consensus', val: 'Within 24 Hours' },
      { label: 'Bias Reduction Rubric', val: 'Objective Criteria Standard' },
    ],
  },
  {
    num: '04',
    title: 'Private candidate dossier & verified credentials',
    subtitle: 'Zero public profile exposure. Complete candidate confidentiality.',
    body: 'Your search remains entirely confidential. Current employers never see your profile, and personal contact details are only unlocked after you explicitly accept an invitation to interview. Review company hiring teams with full transparency before taking a single call.',
    specs: [
      { label: 'Current Employer Shield', val: '100% Hidden' },
      { label: 'Contact Unlock', val: 'Mutual Consent Only' },
      { label: 'Data Encryption', val: 'AES-256 at Rest' },
      { label: 'Candidate Sovereignty', val: 'Delete Data Anytime' },
    ],
  },
];

export default function Landing() {
  // Perspective toggle in hero: 'candidate' vs 'employer'
  const [heroPerspective, setHeroPerspective] = useState('candidate');

  // Active color swatch / role stream for Section 3
  const [activeStreamId, setActiveStreamId] = useState('orange');

  // Active evidence tab / scroll step
  const [evidenceStep, setEvidenceStep] = useState(0);

  // Candidate Dossier / Scheduling Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRole, setModalRole] = useState(ROLE_STREAMS[0]);
  const [demoBooked, setDemoBooked] = useState(false);

  // Dynamic Specular Cursor Tracking
  const [specularPos, setSpecularPos] = useState({ x: 50, y: 50 });
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });

  const heroRef = useRef(null);
  const { heroParallax, prefersReducedMotion } = useScrollReveal();

  // Always pin to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const activeStream = ROLE_STREAMS.find((s) => s.id === activeStreamId) || ROLE_STREAMS[0];
  const activeEvidence = EVIDENCE_ITEMS[evidenceStep];

  // Cursor reaction on desktop: track lighting position and 3D tilt
  const handleHeroMouseMove = (e) => {
    if (prefersReducedMotion || !heroRef.current || window.innerWidth < 1024) return;

    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = Math.max(0, Math.min(100, Math.round((x / rect.width) * 100)));
    const yPercent = Math.max(0, Math.min(100, Math.round((y / rect.height) * 100)));

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setSpecularPos({ x: xPercent, y: yPercent });
    setHeroTilt({
      x: Math.round(normX * 8 * 10) / 10,
      y: Math.round(-normY * 8 * 10) / 10,
    });
  };

  const handleHeroMouseLeave = () => {
    setSpecularPos({ x: 50, y: 50 });
    setHeroTilt({ x: 0, y: 0 });
  };

  const handleOpenDossier = (roleData) => {
    setModalRole(roleData || activeStream);
    setDemoBooked(false);
    setModalOpen(true);
  };

  const handleBookDemoSession = (e) => {
    e.preventDefault();
    setDemoBooked(true);
  };

  return (
    <div className="sen-page">

      {/* ========================================================
          SECTION 1: HERO
          Minimalist layout with sticky typographic layouts
          ("Find the right role. Meet the right people.")
          layered directly next to the interactive interview console asset.
          ======================================================== */}
      <section
        id="hero"
        ref={heroRef}
        className="sen-hero"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Dynamic ambient background glow */}
        <div
          className="sen-hero-ambient-glow"
          style={{ background: activeStream.glow }}
        />

        {/* Hero Top Archival Bar */}
        <div className="sen-hero-topbar container-wide">
          <div className="sen-topbar-col">
            <span className="sen-meta-tag">INTERVIEWLY PLATFORM</span>
            <span className="sen-meta-sub">GLOBAL HIRING SPECIFICATION 2.0</span>
          </div>
          <div className="sen-topbar-center">
            <span>CAREERS · INTERVIEWS · ARCHITECTURE</span>
          </div>
          <div className="sen-topbar-col sen-text-right">
            <span className="sen-meta-tag">CONFIDENTIAL NETWORK</span>
            <span className="sen-meta-sub">AES-256 ENCRYPTED DOSSIERS</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="sen-hero-grid container-wide">
          {/* Left Column: Sticky Typographic Layout */}
          <div className="sen-hero-typography">
            <div className="sen-badge reveal-on-scroll">
              <span className="sen-badge-dot" />
              <span>THE RECRUITMENT SPECIFICATION</span>
            </div>

            {/* Massive Sticky Headline */}
            <div className="sen-hero-headline-wrap reveal-on-scroll reveal-delay-1">
              <h1 className="sen-hero-headline">
                Find the right role.
                <br />
                <span className="sen-headline-amp">Meet the</span> right people.
              </h1>
            </div>

            {/* Perspective Toggle (Candidates vs Employers) */}
            <div className="sen-perspective-toggle reveal-on-scroll reveal-delay-2" data-cursor-label="VIEW">
              <button
                type="button"
                className={`sen-toggle-btn ${heroPerspective === 'candidate' ? 'is-active' : ''}`}
                onClick={() => setHeroPerspective('candidate')}
                data-cursor-label="SEEKER"
              >
                <span>For Candidates</span>
                <span className="sen-toggle-sub">Discover &amp; Prepare</span>
              </button>
              <button
                type="button"
                className={`sen-toggle-btn ${heroPerspective === 'employer' ? 'is-active' : ''}`}
                onClick={() => setHeroPerspective('employer')}
                data-cursor-label="EMPLOYER"
              >
                <span>For Employers</span>
                <span className="sen-toggle-sub">So…5715 tokens truncated…">
                <blockquote>
                  &ldquo;Interviewly eliminated endless recruiter spam. Every conversation was pre-vetted,
                  the interview brief was thorough, and the calendar coordination took seconds.&rdquo;
                </blockquote>
                <cite>— Principal Systems Engineer · San Francisco</cite>
              </div>

              <div className="sen-audience-btn-wrap">
                <Link to="/signup" className="sen-btn-primary" data-cursor-label="SEARCH">
                  <span>Start your job search</span>
                  <span className="sen-btn-arrow">→</span>
                </Link>
              </div>
            </div>

            {/* For Employers Card */}
            <div className="sen-audience-card reveal-on-scroll reveal-delay-1" data-cursor-label="EMPLOYER">
              <div className="sen-audience-card-header">
                <span className="sen-badge">FOR EMPLOYERS</span>
                <span className="sen-audience-tagline">Source · Interview · Calibrate</span>
              </div>
              <h3 className="sen-audience-title">Source, interview, and decide in one place</h3>
              <p className="sen-audience-lead">
                Stop chasing candidates across disjointed spreadsheets and email threads.
                Interviewly delivers pre-screened talent dossiers, coordinates multi-interviewer
                calendar availability, and provides unified scorecards.
              </p>

              <div className="sen-audience-features">
                <div className="sen-feature-item">
                  <span className="sen-feature-dot" />
                  <span>Pre-screened technical dossiers reducing hiring manager screen time by 75%</span>
                </div>
                <div className="sen-feature-item">
                  <span className="sen-feature-dot" />
                  <span>Direct Google Calendar &amp; Outlook multi-interviewer availability sync</span>
                </div>
                <div className="sen-feature-item">
                  <span className="sen-feature-dot" />
                  <span>Objective 4-dimension scorecards reducing bias and accelerating offer decisions</span>
                </div>
              </div>

              <div className="sen-quote-block">
                <blockquote>
                  &ldquo;Our panel alignment turnaround dropped from 5 days to 24 hours. The structured
                  scorecards ensure every interviewer evaluates the same verified criteria.&rdquo;
                </blockquote>
                <cite>— VP of Engineering · Beacon Cloud Labs</cite>
              </div>

              <div className="sen-audience-btn-wrap">
                <Link to="/signup" className="sen-btn-secondary" data-cursor-label="SOURCE">
                  <span>Build your hiring pipeline</span>
                  <span className="sen-btn-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: BENEFITS (Two Symmetric Columns)
          ======================================================== */}
      <section id="benefits" className="sen-benefits-section">
        <div className="container-wide">
          <div className="sen-section-header-center reveal-on-scroll">
            <span className="sen-section-label">PLATFORM ADVANTAGES</span>
            <h2 className="sen-section-title">Why modern teams choose Interviewly</h2>
            <p className="sen-section-sub">
              Calibrated metrics and structured workflows designed for high conversion and zero fatigue.
            </p>
          </div>

          <div className="sen-benefits-grid reveal-on-scroll reveal-delay-1">
            <div className="sen-benefit-col" data-cursor-label="CANDIDATE">
              <div className="sen-benefit-badge-row">
                <span className="sen-badge">FOR CANDIDATES</span>
                <span className="sen-benefit-pill">Career Organization</span>
              </div>
              <h3>Keep opportunities and interviews organized</h3>
              <p className="sen-benefit-sub">Focus purely on high-signal conversations with verified teams.</p>
              <ul className="sen-benefit-list">
                <li>
                  <span className="sen-check-icon">✓</span>
                  <span>Curated job matches tailored to your verified technical skills and salary goals</span>
                </li>
                <li>
                  <span className="sen-check-icon">✓</span>
                  <span>Transparent application stages with direct timeline updates and feedback</span>
                </li>
                <li>
                  <span className="sen-check-icon">✓</span>
                  <span>Interview preparation dossiers containing role context and technical scopes</span>
                </li>
                <li>
                  <span className="sen-check-icon">✓</span>
                  <span>One central portal to manage invitations, preparation notes, and pending offers</span>
                </li>
              </ul>
            </div>

            <div className="sen-benefit-col" data-cursor-label="EMPLOYER">
              <div className="sen-benefit-badge-row">
                <span className="sen-badge">FOR EMPLOYERS</span>
                <span className="sen-benefit-pill">Hiring Velocity</span>
              </div>
              <h3>Review candidates and coordinate rounds in one place</h3>
              <p className="sen-benefit-sub">Accelerate hiring speed without sacrificing evaluation rigor.</p>
              <ul className="sen-benefit-list">
                <li>
                  <span className="sen-check-icon">✓</span>
                  <span>Pre-screened candidate dossiers that streamline review time for hiring managers</span>
                </li>
                <li>
                  <span className="sen-check-icon">✓</span>
                  <span>Unified multi-calendar scheduling to eliminate endless email coordination</span>
                </li>
                <li>
                  <span className="sen-check-icon">✓</span>
                  <span>Objective scorecard templates that reduce evaluation bias and speed up decisions</span>
                </li>
                <li>
                  <span className="sen-check-icon">✓</span>
                  <span>Holistic pipeline analytics to track hiring velocity, conversion rates, and quality</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: CLOSING CALL TO ACTION
          ======================================================== */}
      <section className="sen-closing-cta">
        <div className="container-wide reveal-on-scroll">
          <div className="sen-closing-inner">
            <span className="sen-section-label">GLOBAL RECRUITMENT SPECIFICATION</span>
            <h2 className="sen-section-title">Ready to discover your next opportunity?</h2>
            <p className="sen-section-sub" style={{ margin: '14px auto 32px' }}>
              Whether you are stepping into a defining career move or assembling an exceptional engineering team,
              Interviewly provides the clarity and tools to meet with confidence.
            </p>
            <div className="sen-closing-actions">
              <Link to="/signup" className="sen-btn-primary" data-cursor-label="CREATE">
                <span>Create free account</span>
                <span className="sen-btn-arrow">→</span>
              </Link>
              <Link to="/login" className="sen-btn-secondary" data-cursor-label="LOG IN">
                <span>Log in to dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CANDIDATE DOSSIER & SCHEDULING MODAL
          ======================================================== */}
      {modalOpen && (
        <div className="sen-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="sen-modal-card" onClick={(e) => e.stopPropagation()} data-cursor-label="DOSSIER">
            <div className="sen-modal-header">
              <div>
                <span className="sen-badge">CANDIDATE DOSSIER</span>
                <h3>{modalRole.candidate}</h3>
                <p className="sen-modal-subline">{modalRole.roleTitle} · {modalRole.company}</p>
              </div>
              <button
                type="button"
                className="sen-modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {!demoBooked ? (
              <form className="sen-modal-form" onSubmit={handleBookDemoSession}>
                <div className="sen-modal-item-preview">
                  <div className="sen-modal-swatch-badge" style={{ backgroundColor: modalRole.colorHex }} />
                  <div>
                    <strong>Match Index: {modalRole.matchScore}</strong>
                    <span>Evaluation Round: {modalRole.date}</span>
                  </div>
                </div>

                <div className="sen-form-group">
                  <label>Verified Technical Competencies</label>
                  <div className="sen-skills-chips">
                    {modalRole.tags.map((t) => (
                      <span key={t} className="sen-skill-chip">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="sen-form-group">
                  <label htmlFor="interviewer-name">Interviewer Name</label>
                  <input
                    id="interviewer-name"
                    type="text"
                    required
                    placeholder="Marcus Vance (VP Engineering)"
                    className="sen-form-input"
                  />
                </div>

                <div className="sen-form-group">
                  <label htmlFor="interviewer-email">Calendar Email Address</label>
                  <input
                    id="interviewer-email"
                    type="email"
                    required
                    placeholder="marcus@company.com"
                    className="sen-form-input"
                  />
                </div>

                <div className="sen-modal-actions">
                  <button type="submit" className="sen-btn-primary sen-btn-primary--full" data-cursor-label="CONFIRM">
                    <span>Confirm Interview Session</span>
                    <span>→</span>
                  </button>
                  <p className="sen-modal-note">
                    Front-end prototype showcase — Simulates calendar sync and candidate scorecard creation.
                  </p>
                </div>
              </form>
            ) : (
              <div className="sen-modal-success">
                <div className="sen-success-mark">✓</div>
                <h4>Interview Session Confirmed</h4>
                <p>
                  Calendar invites and technical evaluation briefs have been dispatched for{' '}
                  <strong>{modalRole.candidate}</strong> ({modalRole.roleTitle}).
                </p>
                <button
                  type="button"
                  className="sen-btn-secondary"
                  onClick={() => setModalOpen(false)}
                  style={{ marginTop: '16px' }}
                >
                  Close Dossier
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

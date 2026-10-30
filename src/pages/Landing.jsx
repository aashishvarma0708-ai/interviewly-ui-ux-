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
                <span className="sen-toggle-sub">Source &amp; Interview</span>
              </button>
            </div>

            <p className="sen-hero-description reveal-on-scroll reveal-delay-3">
              Interviewly connects accomplished candidates with forward-thinking product teams.
              Streamlining discovery, interview preparation, and structured evaluations in one
              clean, minimalist interface.
            </p>

            {/* Telemetry Specs Grid */}
            <div className="sen-hero-specs reveal-on-scroll reveal-delay-4">
              <div className="sen-spec-item">
                <span className="sen-spec-label">Match Signal</span>
                <span className="sen-spec-val">98% Verified Index</span>
              </div>
              <div className="sen-spec-item">
                <span className="sen-spec-label">Evaluations</span>
                <span className="sen-spec-val">Structured Briefs</span>
              </div>
              <div className="sen-spec-item">
                <span className="sen-spec-label">Scheduling</span>
                <span className="sen-spec-val">Direct Calendar Sync</span>
              </div>
              <div className="sen-spec-item">
                <span className="sen-spec-label">Privacy Shield</span>
                <span className="sen-spec-val">100% Confidential</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="sen-hero-actions reveal-on-scroll reveal-delay-5">
              <Link to="/signup" className="sen-btn-primary" data-cursor-label="FIND JOB">
                <span>Find a job</span>
                <span className="sen-btn-arrow">→</span>
              </Link>
              <Link to="/signup" className="sen-btn-secondary" data-cursor-label="HIRE">
                <span>Hire talent</span>
              </Link>
            </div>

            {/* Trust Statement */}
            <div className="sen-trust-statement reveal-on-scroll reveal-delay-5">
              <span className="sen-trust-dot" />
              <span>A clearer way to connect candidates and teams. No fabricated numbers, just meaningful conversations.</span>
            </div>
          </div>

          {/* Right Column: Clean Interactive Interview Console Asset */}
          <div className="sen-hero-visual-col">
            <div
              className="sen-hero-console-stage"
              style={{
                transform: prefersReducedMotion
                  ? 'none'
                  : `perspective(1200px) rotateX(${heroTilt.y}deg) rotateY(${heroTilt.x}deg) translate3d(${heroParallax.x * 0.3}px, ${heroParallax.y * 0.3}px, 0)`,
              }}
              data-cursor-label="DOSSIER"
            >
              <InterviewConsoleVisual
                perspective={heroPerspective}
                track={activeStreamId}
                specularPos={specularPos}
                onOpenModal={handleOpenDossier}
              />
            </div>

            {/* Scroll Cue */}
            <div className="sen-scroll-cue">
              <span className="sen-scroll-line" />
              <span className="sen-scroll-text">SCROLL TO DISCOVER METHODOLOGY</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: METHODOLOGY ("HOW IT WORKS")
          Four-step flow from profile creation to offer
          ======================================================== */}
      <section id="how-it-works" className="sen-specifications">
        <div className="container-wide">
          <div className="sen-section-header-center reveal-on-scroll">
            <span className="sen-section-label">METHODOLOGY</span>
            <h2 className="sen-section-title">Four simple steps to your next milestone</h2>
            <p className="sen-section-sub">
              A transparent, repeatable framework designed to eliminate guesswork from discovery to offer.
            </p>
          </div>

          <div className="sen-steps-grid reveal-on-scroll reveal-delay-1">
            {[
              {
                num: '01',
                title: 'Create a profile',
                desc: 'Craft a structured candidate portfolio or company hiring requisition with role specifics, verified competencies, and expectations.',
              },
              {
                num: '02',
                title: 'Find a suitable match',
                desc: 'Our criteria-driven platform highlights top-tier compatibility with zero resume spam, ensuring high-conversion conversations.',
              },
              {
                num: '03',
                title: 'Schedule an interview',
                desc: 'Direct calendar integration syncs interview slots effortlessly across Google Calendar and Outlook with zero administrative delay.',
              },
              {
                num: '04',
                title: 'Move forward with confidence',
                desc: 'Access structured evaluation scorecards, objective feedback rubrics, and formal offers in one unified workspace.',
              },
            ].map((step) => (
              <div key={step.num} className="sen-step-column-card" data-cursor-label={`STEP ${step.num}`}>
                <div className="sen-step-num-badge">[{step.num}]</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: DEEP SCROLL / "EVIDENCE"
          A narrative block where smooth vertical scrolling slowly
          transitions into multi-column detail layers showing
          micro-attributes ([01] through [04] layout grids).
          ======================================================== */}
      <section id="evidence" className="sen-evidence">
        <div className="container-wide">
          {/* Section Header */}
          <div className="sen-evidence-header reveal-on-scroll">
            <span className="sen-section-label">THE ARCHITECTURE OF HIGH-CONVERSION HIRING</span>
            <h2 className="sen-section-title">Evidence of a clearer recruitment framework</h2>
            <p className="sen-section-sub">
              Every stage of Interviewly is engineered to eliminate resume noise, scheduling delays,
              and evaluation ambiguity. Four foundational platform pillars.
            </p>
          </div>

          {/* Stepper Indicator Navigation */}
          <div className="sen-evidence-nav reveal-on-scroll reveal-delay-1" data-cursor-label="SELECT">
            {EVIDENCE_ITEMS.map((item, idx) => (
              <button
                key={item.num}
                type="button"
                className={`sen-evidence-nav-btn ${idx === evidenceStep ? 'is-active' : ''}`}
                onClick={() => setEvidenceStep(idx)}
                data-cursor-label={`STEP ${item.num}`}
              >
                <span className="sen-nav-num">[{item.num}]</span>
                <span className="sen-nav-title">{item.title.split(' ')[0]} {item.title.split(' ')[1]}</span>
                <span className="sen-nav-line" />
              </button>
            ))}
          </div>

          {/* Deep Scroll Multi-Column Attribute Stage */}
          <div className="sen-evidence-stage">
            {/* Left: Narrative Detail Block */}
            <div className="sen-evidence-narrative reveal-on-scroll reveal-delay-2">
              <div className="sen-evidence-tag">EVIDENCE PILLAR [{activeEvidence.num} OF 04]</div>
              <h3 className="sen-evidence-title">{activeEvidence.title}</h3>
              <p className="sen-evidence-sub">{activeEvidence.subtitle}</p>
              <p className="sen-evidence-body">{activeEvidence.body}</p>

              {/* Technical Specifications Sub-Grid */}
              <div className="sen-evidence-specs-grid">
                {activeEvidence.specs.map((s) => (
                  <div key={s.label} className="sen-spec-card">
                    <span className="sen-spec-card-label">{s.label}</span>
                    <span className="sen-spec-card-val">{s.val}</span>
                  </div>
                ))}
              </div>

              {/* Stepper Pagination Controls */}
              <div className="sen-evidence-controls">
                <button
                  type="button"
                  className="sen-step-btn"
                  disabled={evidenceStep === 0}
                  onClick={() => setEvidenceStep((p) => Math.max(0, p - 1))}
                  data-cursor-label="PREV"
                >
                  ← Previous [0{evidenceStep}]
                </button>
                <button
                  type="button"
                  className="sen-step-btn"
                  disabled={evidenceStep === EVIDENCE_ITEMS.length - 1}
                  onClick={() => setEvidenceStep((p) => Math.min(EVIDENCE_ITEMS.length - 1, p + 1))}
                  data-cursor-label="NEXT"
                >
                  Next [0{evidenceStep + 2}] →
                </button>
              </div>
            </div>

            {/* Right: Interactive Feature Inspection Layer */}
            <div className="sen-evidence-visual-col reveal-on-scroll reveal-delay-3">
              <div className="sen-evidence-macro-card" data-cursor-label="INSPECT">
                {/* Visual Representation based on active step */}
                {evidenceStep === 0 && (
                  <div className="macro-view macro-view--signal">
                    <div className="macro-signal-bars">
                      <div className="macro-signal-bar macro-signal-high">
                        <span>Interviewly Verified Match: 98% Compatibility</span>
                      </div>
                      <div className="macro-signal-bar macro-signal-mid">
                        <span>Role Criteria Overlap: 94% Skills Match</span>
                      </div>
                      <div className="macro-signal-bar macro-signal-low">
                        <span>Unfiltered Public Job Board Spam: 12% Signal</span>
                      </div>
                    </div>
                    <div className="macro-badge">SIGNAL-TO-NOISE FILTERING</div>
                  </div>
                )}

                {evidenceStep === 1 && (
                  <div className="macro-view macro-view--calendar">
                    <div className="macro-calendar-widget">
                      <div className="macro-cal-slot confirmed">
                        <span>✓ Today, 2:30 PM EST · System Architecture Review</span>
                      </div>
                      <div className="macro-cal-slot available">
                        <span>Tomorrow, 10:00 AM EST · Technical Deep Dive</span>
                      </div>
                      <div className="macro-cal-slot available">
                        <span>Thursday, 3:00 PM EST · Executive Alignment</span>
                      </div>
                    </div>
                    <div className="macro-badge">DIRECT MULTI-CALENDAR SYNC</div>
                  </div>
                )}

                {evidenceStep === 2 && (
                  <div className="macro-view macro-view--scorecard">
                    <div className="macro-scorecard-grid">
                      <div className="macro-score-item">
                        <span>System Architecture</span>
                        <strong>4.9 / 5.0</strong>
                      </div>
                      <div className="macro-score-item">
                        <span>Technical Depth</span>
                        <strong>4.8 / 5.0</strong>
                      </div>
                      <div className="macro-score-item">
                        <span>Collaboration</span>
                        <strong>5.0 / 5.0</strong>
                      </div>
                      <div className="macro-score-item">
                        <span>Leadership Sense</span>
                        <strong>4.7 / 5.0</strong>
                      </div>
                    </div>
                    <div className="macro-badge">4-DIMENSION OBJECTIVE SCORECARD</div>
                  </div>
                )}

                {evidenceStep === 3 && (
                  <div className="macro-view macro-view--privacy">
                    <div className="macro-privacy-shield">
                      <div className="macro-shield-icon">🔒</div>
                      <strong>Private Candidate Shield</strong>
                      <span>Zero Public Profile Leaks · Confidential Search</span>
                    </div>
                    <div className="macro-badge">END-TO-END CONFIDENTIALITY</div>
                  </div>
                )}

                <div className="sen-evidence-console-peek">
                  <span className="sen-mono">EVALUATION-SPEC-V2 · VERIFIED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: PRODUCT VARIANT SLIDER (CURATED ROLE STREAMS)
          Custom variant block featuring color-swatch triggers
          ("orange", "green", "white", "dark brown").
          Clicking or hovering a swatch fluidly transitions both the
          foreground dossier and its background gradient glow.
          ======================================================== */}
      <section id="variants" className="sen-variants">
        {/* Dynamic Background Gradient Glow transitioning on swatch select */}
        <div
          className="sen-variants-bg-glow"
          style={{ background: activeStream.glow }}
        />

        <div className="container-wide">
          {/* Section Header */}
          <div className="sen-variants-header reveal-on-scroll">
            <span className="sen-section-label">CURATED ROLE STREAMS</span>
            <h2 className="sen-section-title">Select your specialized engineering stream</h2>
            <p className="sen-section-sub">
              Explore active candidate dossiers, evaluation scorecards, and upcoming interview slots across four signature disciplines.
            </p>
          </div>

          <div className="sen-variants-stage">
            {/* Left: Large Candidate Dossier Display with Smooth Transition */}
            <div className="sen-variants-console-col reveal-on-scroll reveal-delay-1">
              <div
                className="sen-variants-console-wrapper"
                data-cursor-label={activeStream.name.toUpperCase()}
              >
                <div className="sen-stream-preview-card" onClick={() => handleOpenDossier(activeStream)}>
                  <div className="sen-stream-card-top">
                    <div className="sen-stream-avatar" style={{ backgroundColor: activeStream.colorHex }}>
                      {activeStream.avatar}
                    </div>
                    <div>
                      <span className="sen-stream-cat" style={{ color: activeStream.colorHex }}>
                        {activeStream.name}
                      </span>
                      <h4>{activeStream.roleTitle}</h4>
                      <p className="sen-stream-company">{activeStream.company}</p>
                    </div>
                    <div className="sen-stream-match-badge">
                      <span className="match-num">{activeStream.matchScore}</span>
                      <span className="match-lbl">MATCH</span>
                    </div>
                  </div>

                  <p className="sen-stream-desc">{activeStream.description}</p>

                  <div className="sen-stream-tags">
                    {activeStream.tags.map((tag) => (
                      <span key={tag} className="sen-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="sen-stream-footer">
                    <div>
                      <span className="sen-stream-meta-k">NEXT ROUND</span>
                      <strong className="sen-stream-meta-v">{activeStream.date}</strong>
                    </div>
                    <button
                      type="button"
                      className="sen-btn-primary"
                      style={{ padding: '8px 20px', fontSize: '0.75rem' }}
                      data-cursor-label="INSPECT"
                    >
                      Inspect Dossier
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Color-Swatch Triggers & Stream Metadata */}
            <div className="sen-variants-controls-col reveal-on-scroll reveal-delay-2">
              <div className="sen-swatches-card">
                <span className="sen-card-eyebrow">DISCIPLINE SWATCHES</span>
                <h3 className="sen-variant-name">{activeStream.name}</h3>
                <p className="sen-variant-desc">{activeStream.description}</p>

                {/* THE FOUR SWATCH TRIGGERS */}
                <div className="sen-swatch-triggers-row" data-cursor-label="SWATCH">
                  {ROLE_STREAMS.map((swatch) => (
                    <button
                      key={swatch.id}
                      type="button"
                      data-swatch-id={swatch.id}
                      className={`sen-swatch-btn ${swatch.id === activeStreamId ? 'is-active' : ''}`}
                      onClick={() => setActiveStreamId(swatch.id)}
                      onMouseEnter={() => setActiveStreamId(swatch.id)}
                      aria-label={`Select ${swatch.name}`}
                      data-cursor-label={swatch.id.toUpperCase()}
                    >
                      <span
                        className="sen-swatch-circle"
                        style={{ backgroundColor: swatch.colorHex }}
                      />
                      <span className="sen-swatch-label">{swatch.id}</span>
                      {swatch.id === activeStreamId && <span className="sen-swatch-ring" />}
                    </button>
                  ))}
                </div>

                <div className="sen-hairline" />

                {/* Stream Detail Metadata */}
                <div className="sen-variant-meta-list">
                  <div className="sen-variant-meta-row">
                    <span className="sen-meta-k">Candidate Profile</span>
                    <span className="sen-meta-v">{activeStream.candidate} ({activeStream.roleTitle})</span>
                  </div>
                  <div className="sen-variant-meta-row">
                    <span className="sen-meta-k">Pipeline Stage</span>
                    <span className="sen-meta-v">{activeStream.pipelineStatus}</span>
                  </div>
                  <div className="sen-variant-meta-row">
                    <span className="sen-meta-k">Verified Compensation</span>
                    <span className="sen-meta-v sen-mono">{activeStream.salaryRange}</span>
                  </div>
                  <div className="sen-variant-meta-row">
                    <span className="sen-meta-k">Status</span>
                    <span className="sen-meta-v sen-stock-status">
                      <span className="sen-stock-dot" />
                      Active Hiring Pipeline
                    </span>
                  </div>
                </div>

                {/* Reserve / Inquire Action */}
                <div className="sen-variant-cta-wrap">
                  <button
                    type="button"
                    className="sen-btn-primary sen-btn-primary--full"
                    onClick={() => handleOpenDossier(activeStream)}
                    data-cursor-label="SCHEDULE"
                  >
                    <span>Schedule Interview with Candidate</span>
                    <span className="sen-btn-arrow">→</span>
                  </button>
                  <span className="sen-variant-guarantee">
                    Confidential evaluation brief, objective rubrics, and direct calendar synchronization included.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: AUDIENCE PATHWAYS (CANDIDATES & EMPLOYERS)
          Two Symmetric Frosted Glass Cards
          ======================================================== */}
      <section id="audiences" className="sen-audiences-section">
        <div className="container-wide">
          <div className="sen-section-header-center reveal-on-scroll">
            <span className="sen-section-label">AUDIENCE PATHWAYS</span>
            <h2 className="sen-section-title">Built for both sides of the hiring table</h2>
            <p className="sen-section-sub">
              Dedicated interfaces and calibrated workflows for senior engineers and modern engineering leadership.
            </p>
          </div>

          <div className="sen-audiences-grid">
            {/* For Candidates Card */}
            <div className="sen-audience-card reveal-on-scroll" data-cursor-label="CANDIDATE">
              <div className="sen-audience-card-header">
                <span className="sen-badge">FOR CANDIDATES</span>
                <span className="sen-audience-tagline">Discover · Prepare · Track</span>
              </div>
              <h3 className="sen-audience-title">Take control of your engineering career</h3>
              <p className="sen-audience-lead">
                Discover curated opportunities matched directly to your verified technical strengths.
                Receive comprehensive interview briefs before every call, transparent feedback,
                and direct visibility into team architectures.
              </p>

              <div className="sen-audience-features">
                <div className="sen-feature-item">
                  <span className="sen-feature-dot" />
                  <span>Curated high-signal roles matching verified competencies and compensation</span>
                </div>
                <div className="sen-feature-item">
                  <span className="sen-feature-dot" />
                  <span>Confidential candidate shield: zero exposure to current employers</span>
                </div>
                <div className="sen-feature-item">
                  <span className="sen-feature-dot" />
                  <span>Integrated calendar slots with interview dossiers and technical scopes</span>
                </div>
              </div>

              <div className="sen-quote-block">
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

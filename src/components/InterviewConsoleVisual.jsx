import React from 'react';
import './InterviewConsoleVisual.css';

/**
 * Transparent high-resolution interview console visual for Section 1 (Hero).
 * Features live evaluation status, candidate profile, verified competency badges,
 * and dynamic specular lighting that tracks cursor movements.
 */
export default function InterviewConsoleVisual({
  perspective = 'candidate', // 'candidate' | 'employer'
  track = 'orange', // 'orange' | 'green' | 'white' | 'dark brown'
  specularPos = { x: 50, y: 50 },
  onOpenModal,
}) {
  const isCandidate = perspective === 'candidate';

  const trackInfo = {
    orange: {
      candidate: 'Jordan Davis',
      avatar: 'JD',
      role: 'Staff Frontend Architect',
      company: 'Kinfolk Studio · San Francisco',
      matchScore: '98%',
      accent: '#E85D26',
      badge: 'Design Engineering',
      tags: ['React', 'Design Systems', 'TypeScript', 'Web Performance'],
      date: 'Today, 2:30 PM EST',
      evaluator: 'David Sterling · VP Engineering',
    },
    green: {
      candidate: 'Elena Rostova',
      avatar: 'ER',
      role: 'Principal Distributed Architect',
      company: 'Beacon Cloud Labs · New York',
      matchScore: '96%',
      accent: '#2F5E44',
      badge: 'Systems Architecture',
      tags: ['Go', 'Kubernetes', 'High-Throughput', 'Event Streams'],
      date: 'Tomorrow, 10:00 AM EST',
      evaluator: 'Sophia Lin · Technical Director',
    },
    white: {
      candidate: 'Marcus Vance',
      avatar: 'MV',
      role: 'Head of Product Experience',
      company: 'Wavelength Co. · Global Remote',
      matchScore: '99%',
      accent: '#555555',
      badge: 'Product Leadership',
      tags: ['Product Vision', 'Executive Panel', 'Team Scaling'],
      date: 'Thursday, 3:00 PM EST',
      evaluator: 'Founder & CEO Panel',
    },
    'dark brown': {
      candidate: 'Kai Chen',
      avatar: 'KC',
      role: 'Staff Machine Learning Engineer',
      company: 'Tensor Labs · Seattle',
      matchScore: '97%',
      accent: '#382319',
      badge: 'AI Systems',
      tags: ['PyTorch', 'Distributed Training', 'LLM Serving'],
      date: 'Friday, 11:30 AM EST',
      evaluator: 'Research Director',
    },
  };

  const active = trackInfo[track] || trackInfo.orange;

  return (
    <div
      className="sen-console-wrap"
      data-cursor-label="DOSSIER"
      onClick={() => onOpenModal && onOpenModal(active)}
    >
      {/* Dynamic Specular Light Overlay */}
      <div
        className="sen-console-specular"
        style={{
          background: `radial-gradient(circle 500px at ${specularPos.x}% ${specularPos.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.25) 45%, transparent 75%)`,
        }}
      />

      {/* Main Console Frame */}
      <div className="sen-console-frame">
        {/* Top Header Bar */}
        <div className="sen-console-header">
          <div className="sen-console-brand-row">
            <span className="sen-console-pill-badge" style={{ borderColor: active.accent, color: active.accent }}>
              {active.badge}
            </span>
            <div className="sen-console-status">
              <span className="sen-status-dot" style={{ backgroundColor: active.accent }} />
              <span>ROUND 02 IN PROGRESS</span>
              <div className="sen-console-live-wave" aria-label="Live audio stream telemetry">
                <span className="wave-bar bar-1" />
                <span className="wave-bar bar-2" />
                <span className="wave-bar bar-3" />
                <span className="wave-bar bar-4" />
                <span className="wave-bar bar-5" />
              </div>
            </div>
          </div>

          <div className="sen-console-match-box">
            <span className="sen-match-score">{active.matchScore}</span>
            <span className="sen-match-label">MATCH INDEX</span>
          </div>
        </div>

        {/* Candidate Profile Section */}
        <div className="sen-console-candidate">
          <div className="sen-console-avatar" style={{ backgroundColor: active.accent }}>
            {active.avatar}
          </div>
          <div className="sen-console-cand-info">
            <h3 className="sen-console-cand-name">{active.candidate}</h3>
            <p className="sen-console-cand-role">{active.role}</p>
            <p className="sen-console-cand-company">{active.company}</p>
          </div>
        </div>

        {/* Interview Schedule Snippet */}
        <div className="sen-console-schedule-card">
          <div className="sen-schedule-top">
            <span className="sen-schedule-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <strong>{active.date}</strong>
            <span className="sen-schedule-badge">Calendar Synced</span>
          </div>
          <div className="sen-schedule-evaluator">
            <span>Interviewer: {active.evaluator}</span>
          </div>
        </div>

        {/* Verified Technical Competencies */}
        <div className="sen-console-skills">
          <span className="sen-skills-title">VERIFIED COMPETENCY SIGNALS</span>
          <div className="sen-skills-chips">
            {active.tags.map((tag) => (
              <span key={tag} className="sen-skill-chip">{tag}</span>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="sen-console-footer">
          <button type="button" className="sen-console-action-btn" data-cursor-label="INSPECT">
            <span>Inspect Verified Dossier</span>
            <span>→</span>
          </button>
          <span className="sen-console-footer-note">End-to-End Encrypted Evaluation</span>
        </div>
      </div>
    </div>
  );
}


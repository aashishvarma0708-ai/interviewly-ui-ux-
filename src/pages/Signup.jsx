import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

export default function Signup() {
  const [roleType, setRoleType] = useState('candidate'); // 'candidate' | 'employer'
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    track: 'design', // 'design' | 'systems' | 'product' | 'ai'
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="sen-auth-page">
      <div className="sen-auth-container container">
        {/* Left Editorial Column (Kyoto poster inspired typography & structure) */}
        <div className="sen-auth-left">
          <div className="sen-badge">
            <span className="sen-badge-dot" />
            <span>INTERVIEWLY PLATFORM 2.0</span>
          </div>

          <h1 className="sen-auth-title">
            Find the right role.
            <br />
            Meet the right team.
          </h1>

          <p className="sen-auth-sub">
            Join the calibrated hiring network connecting verified software architects,
            staff engineers, and engineering leaders directly with hiring teams.
          </p>

          <div className="sen-auth-bullets">
            <div className="sen-bullet">
              <span className="sen-bullet-dot" />
              <span>Zero unsolicited spam: connect only when verified criteria and compensation align</span>
            </div>
            <div className="sen-bullet">
              <span className="sen-bullet-dot" />
              <span>100% confidential: current employers are blocked and dossiers remain encrypted</span>
            </div>
            <div className="sen-bullet">
              <span className="sen-bullet-dot" />
              <span>Single-click calendar synchronization with integrated technical scorecards</span>
            </div>
          </div>

          <div className="sen-auth-coords">
            <span>CALIBRATED CAREER NETWORK · CONFIDENTIAL ACCESS</span>
          </div>
        </div>

        {/* Right Form Card (Liquid-glass dark titanium frosted container) */}
        <div className="sen-auth-right">
          <div className="sen-auth-card">
            {!submitted ? (
              <>
                <div className="sen-auth-card-header">
                  <h2>Create Your Account</h2>
                  <p>Select your profile path to begin your calibrated onboarding.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="sen-auth-form">
                  {/* Role Type Selector */}
                  <div className="sen-form-group">
                    <label>I am joining as a</label>
                    <div className="sen-choice-group">
                      <button
                        type="button"
                        className={`sen-choice-card ${roleType === 'candidate' ? 'is-active' : ''}`}
                        onClick={() => setRoleType('candidate')}
                        data-cursor-label="CANDIDATE"
                      >
                        <strong>Candidate</strong>
                        <span>Discovering top technical roles</span>
                      </button>
                      <button
                        type="button"
                        className={`sen-choice-card ${roleType === 'employer' ? 'is-active' : ''}`}
                        onClick={() => setRoleType('employer')}
                        data-cursor-label="EMPLOYER"
                      >
                        <strong>Employer / Team</strong>
                        <span>Hiring calibrated engineers</span>
                      </button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="sen-form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Jordan Davis"
                      className={`sen-form-input ${errors.fullName ? 'has-error' : ''}`}
                      required
                    />
                    {errors.fullName && <span className="sen-field-error">{errors.fullName}</span>}
                  </div>

                  {/* Work Email */}
                  <div className="sen-form-group">
                    <label htmlFor="email">Work Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. jordan@example.com"
                      className={`sen-form-input ${errors.email ? 'has-error' : ''}`}
                      required
                    />
                    {errors.email && <span className="sen-field-error">{errors.email}</span>}
                  </div>

                  {/* Technical Stream / Focus */}
                  <div className="sen-form-group">
                    <label htmlFor="track">Primary Technical Focus</label>
                    <div className="sen-select-wrap">
                      <select
                        id="track"
                        name="track"
                        value={formData.track}
                        onChange={handleChange}
                        className="sen-form-input sen-form-select"
                      >
                        <option value="design">Design Engineering (Staff Frontend &amp; Systems)</option>
                        <option value="systems">Systems Architecture (Distributed Systems &amp; Cloud)</option>
                        <option value="product">Product Leadership (Head of Engineering &amp; Product)</option>
                        <option value="ai">AI &amp; Machine Learning (LLM Systems &amp; Quantization)</option>
                      </select>
                    </div>
                  </div>

                  {/* Password with Liquid-Glass Eye Toggle */}
                  <div className="sen-form-group">
                    <div className="sen-label-row">
                      <label htmlFor="password">Password</label>
                      <button
                        type="button"
                        className="sen-password-toggle-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <div className="sen-input-wrap">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 8 characters"
                        className={`sen-form-input ${errors.password ? 'has-error' : ''}`}
                        required
                      />
                    </div>
                    {errors.password && <span className="sen-field-error">{errors.password}</span>}
                  </div>

                  {/* Submit Button (Pure White Pill Button) */}
                  <button type="submit" className="sen-submit-btn" data-cursor-label="CREATE">
                    <span>Create {roleType === 'candidate' ? 'Candidate' : 'Employer'} Account</span>
                    <span>→</span>
                  </button>

                  <p className="sen-consent-note">
                    By registering, you agree to Interviewly’s strict privacy standards and confidential candidate protections.
                  </p>

                  <div className="sen-auth-footer-nav">
                    <span>Already have an account?</span>
                    <Link to="/login" className="sen-auth-link" data-cursor-label="LOGIN">
                      Log In
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="sen-auth-success">
                <span className="sen-badge">ACCOUNT INITIALIZED</span>
                <h2>Welcome to Interviewly</h2>
                <p>
                  Your {roleType} account for <strong>{formData.fullName}</strong> ({formData.email})
                  has been verified. Your confidential profile is now ready.
                </p>
                <div className="sen-success-actions">
                  <Link to="/" className="sen-submit-btn">
                    <span>Enter Interviewly Console</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

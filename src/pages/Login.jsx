import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [roleType, setRoleType] = useState('candidate'); // 'candidate' | 'employer'
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) {
      next.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address';
    }
    if (!form.password.trim()) {
      next.password = 'Password is required';
    }
    return next;
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
    <div className="sen-login-page">
      <div className="sen-login-container container">
        {/* Left Editorial (Kyoto composition & dark titanium lighting) */}
        <div className="sen-login-left">
          <div className="sen-badge">
            <span className="sen-badge-dot" />
            <span>AUTHENTICATED ACCESS</span>
          </div>

          <h1 className="sen-login-title">
            Welcome back to
            <br />
            Interviewly
          </h1>

          <p className="sen-login-sub">
            Access your upcoming technical rounds, review calibrated candidate dossiers,
            and monitor synchronized team scorecards in real time.
          </p>

          <div className="sen-login-deco">
            <div className="sen-deco-line" />
            <div className="sen-deco-meta">
              <span>CALENDAR SYNC CONNECTED</span>
              <span>AES-256 CONFIDENTIALITY</span>
            </div>
          </div>
        </div>

        {/* Right Form (Liquid-Glass Frosted Titanium Card) */}
        <div className="sen-login-right">
          <div className="sen-auth-card">
            {!submitted ? (
              <>
                <div className="sen-auth-card-header">
                  <h2>Sign In to Console</h2>
                  <p>Enter your credentials to access your interview workspace.</p>
                </div>

                <form className="sen-auth-form" onSubmit={handleSubmit} noValidate>
                  {/* Role Type Selector */}
                  <div className="sen-form-group">
                    <label>Sign in as</label>
                    <div className="sen-choice-group">
                      <button
                        type="button"
                        className={`sen-choice-card ${roleType === 'candidate' ? 'is-active' : ''}`}
                        onClick={() => setRoleType('candidate')}
                        data-cursor-label="CANDIDATE"
                      >
                        <strong>Candidate</strong>
                        <span>Interviews &amp; Status</span>
                      </button>
                      <button
                        type="button"
                        className={`sen-choice-card ${roleType === 'employer' ? 'is-active' : ''}`}
                        onClick={() => setRoleType('employer')}
                        data-cursor-label="EMPLOYER"
                      >
                        <strong>Hiring Lead</strong>
                        <span>Pipelines &amp; Scores</span>
                      </button>
                    </div>
                  </div>

                  <div className="sen-form-group">
                    <label htmlFor="login-email">Work Email</label>
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      className={`sen-form-input ${errors.email ? 'has-error' : ''}`}
                      required
                    />
                    {errors.email && <span className="sen-field-error">{errors.email}</span>}
                  </div>

                  <div className="sen-form-group">
                    <div className="sen-label-row">
                      <label htmlFor="login-password">Password</label>
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
                        id="login-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className={`sen-form-input ${errors.password ? 'has-error' : ''}`}
                        required
                      />
                    </div>
                    {errors.password && <span className="sen-field-error">{errors.password}</span>}
                  </div>

                  {/* Forgot Password Accordion */}
                  <div className="sen-forgot-row">
                    <button
                      type="button"
                      className="sen-forgot-trigger"
                      onClick={() => setShowForgot(!showForgot)}
                    >
                      {showForgot ? 'Hide recovery information' : 'Need password recovery?'}
                    </button>
                    {showForgot && (
                      <div className="sen-forgot-box">
                        For prototype evaluation, password verification is simulated. Enter any valid email
                        and password (8+ characters) to sign in. For direct assistance, email security@interviewly.com.
                      </div>
                    )}
                  </div>

                  {/* Submit Button (White Pill Button) */}
                  <button type="submit" className="sen-submit-btn" data-cursor-label="ENTER">
                    <span>Sign In to Console</span>
                    <span>→</span>
                  </button>

                  <div className="sen-auth-footer-nav">
                    <span>Don't have an account?</span>
                    <Link to="/signup" className="sen-auth-link" data-cursor-label="REGISTER">
                      Create Account
                    </Link>
                  </div>
                </form>
              </>
            ) : (
              <div className="sen-auth-success">
                <span className="sen-badge">AUTHENTICATED</span>
                <h2>Welcome Back</h2>
                <p>
                  You are now authenticated into the <strong>Interviewly Console</strong> as{' '}
                  <strong>{form.email}</strong> ({roleType}).
                </p>
                <div className="sen-success-actions">
                  <Link to="/" className="sen-submit-btn">
                    <span>Return to Dashboard</span>
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

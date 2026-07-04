import React, { useState } from 'react';
import { FiMail, FiCheckCircle } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Success state
    setError('');
    setSubmitted(true);
    setEmail('');
    
    // Clear toast after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div
      className="card glass"
      style={{
        padding: '3rem 2rem',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        maxWidth: '850px',
        margin: '0 auto',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--border-color)',
        transform: 'none', // Override global hover translate
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--primary)', marginBottom: '1rem' }}>
        <FiMail size={40} />
      </div>
      <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
        Join the TravelVista Community
      </h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '600px', marginInline: 'auto' }}>
        Subscribe to our newsletter to receive student flight discounts, budget hostel reviews, and off-the-beaten-path destinations straight to your inbox.
      </p>

      {submitted ? (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            backgroundColor: 'var(--secondary-light)',
            color: 'var(--secondary)',
            padding: '0.85rem 2rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '1.05rem',
            animation: 'fadeIn 0.4s ease-out'
          }}
        >
          <FiCheckCircle size={22} />
          Thank you! You have successfully subscribed to our newsletter.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '0.75rem',
            maxWidth: '550px',
            margin: '0 auto',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flexGrow: 1, position: 'relative', minWidth: '250px' }}>
            <input
              type="email"
              placeholder="Enter your student email address..."
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.75rem',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-heading)',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all var(--transition-fast)'
              }}
              className="form-control"
            />
            <FiMail
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                pointerEvents: 'none'
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ paddingInline: '2rem', flexShrink: 0 }}>
            Subscribe Now
          </button>
        </form>
      )}

      {error && (
        <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.75rem', fontWeight: 500 }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Newsletter;

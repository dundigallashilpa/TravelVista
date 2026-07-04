import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiUser, FiInfo, FiAlertCircle } from 'react-icons/fi';

const OwnerLogin = () => {
  const { isOwner, login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (isOwner) {
      navigate('/owner-dashboard');
    }
  }, [isOwner, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const success = login(username, password);
    if (success) {
      navigate('/owner-dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="page fade-in" style={{ padding: '6rem 0' }}>
      <div className="container">
        <div
          className="card"
          style={{
            maxWidth: '450px',
            margin: '0 auto',
            padding: '2.5rem',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            transform: 'none',
            textAlign: 'left'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}
            >
              <FiLock size={30} />
            </div>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>
              Owner Portal
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Access administrative settings and schedule controls.
            </p>
          </div>

          {/* Credentials Helper Box */}
          <div
            style={{
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              borderLeft: '4px solid var(--accent)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              color: 'var(--text-main)',
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'flex-start'
            }}
          >
            <FiInfo size={16} style={{ color: 'var(--accent)', marginTop: '0.1rem', flexShrink: 0 }} />
            <div>
              <strong>Test Credentials:</strong>
              <div style={{ marginTop: '0.2rem' }}>
                Username: <code style={{ backgroundColor: 'transparent', padding: 0, fontWeight: 700 }}>admin</code>
              </div>
              <div>
                Password: <code style={{ backgroundColor: 'transparent', padding: 0, fontWeight: 700 }}>password123</code>
              </div>
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#fee2e2',
                color: '#ef4444',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                marginBottom: '1.25rem',
                fontWeight: 500
              }}
            >
              <FiAlertCircle size={18} style={{ flexShrink: 0 }} />
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="owner-username">Username</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="owner-username"
                  type="text"
                  placeholder="Enter username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <FiUser
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                  size={16}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label htmlFor="owner-password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="owner-password"
                  type="password"
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <FiLock
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                  size={16}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;

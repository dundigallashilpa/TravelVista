import React from 'react';
import { Link } from 'react-router-dom';
import { FiCompass, FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '4rem 0 2rem 0',
        textAlign: 'left',
        color: 'var(--text-main)',
        fontSize: '0.95rem'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 1fr',
            gap: '3rem',
            marginBottom: '3rem'
          }}
          className="footer-grid"
        >
          {/* Column 1: Info and Branding */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FiCompass size={26} style={{ color: 'var(--primary)' }} />
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--text-heading)' }}>
                Travel<span style={{ color: 'var(--primary)' }}>Vista</span>
              </span>
            </Link>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', maxWidth: '320px' }}>
              Empowering students and budget travelers to explore the world's most beautiful destinations without breaking the bank.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <FiInstagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter">
                <FiTwitter size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <FiFacebook size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Youtube">
                <FiYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/destinations" className="footer-link">Destinations</Link></li>
              <li><Link to="/hidden-gems" className="footer-link">Hidden Gems</Link></li>
              <li><Link to="/student-travel" className="footer-link">Student Travel</Link></li>
              <li><Link to="/travel-tips" className="footer-link">Travel Tips</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '1.25rem' }}>
              Contact Information
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-main)' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <FiMapPin style={{ color: 'var(--primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                <span>Suite 400, 1200 Pine Street, Seattle, WA 98101</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <FiPhone style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>+1 (206) 555-0199</span>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <FiMail style={{ color: 'var(--primary)', flexShrink: 0 }} />
                <span>support@travelvista.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <span>© {new Date().getFullYear()} TravelVista. All rights reserved. Designed for students globally.</span>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Scoped footer helper styles */}
      <style>{`
        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          color: var(--text-main);
          transition: all var(--transition-fast);
        }
        .social-icon-btn:hover {
          color: white;
          background-color: var(--primary);
          transform: translateY(-2px);
        }
        
        .footer-link {
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }
        .footer-link:hover {
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

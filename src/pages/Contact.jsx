import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import MapPlaceholder from '../components/MapPlaceholder';

const Contact = () => {
  const { pageContents } = useData();
  // Form states
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit mock
    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });

      // Dismiss message toast
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    }, 1500);
  };

  return (
    <div className="page fade-in">
      {/* Page Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
          padding: '4rem 0',
          color: 'white',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}
      >
        <div className="container">
          <h1 style={{ color: pageContents?.contact?.headingColor || 'white', fontSize: `${pageContents?.contact?.headingFontSize || '2.5'}rem`, marginBottom: '0.75rem', fontWeight: pageContents?.contact?.headingFontWeight || '800', fontFamily: `'${pageContents?.contact?.headingFontFamily || 'Outfit'}', sans-serif`, fontStyle: pageContents?.contact?.headingFontStyle || 'normal', textTransform: pageContents?.contact?.headingTextTransform || 'none', textDecoration: pageContents?.contact?.headingTextDecoration || 'none', letterSpacing: `${pageContents?.contact?.headingLetterSpacing ?? '-0.5'}px` }}>
            {pageContents?.contact?.heading || "Get in Touch"}
          </h1>
          <p style={{ color: pageContents?.contact?.subheadingColor || 'var(--primary-light)', fontSize: `${pageContents?.contact?.subheadingFontSize || '1.1'}rem`, maxWidth: '600px', marginInline: 'auto', fontFamily: `'${pageContents?.contact?.subheadingFontFamily || 'Inter'}', sans-serif`, fontWeight: pageContents?.contact?.subheadingFontWeight || '400', fontStyle: pageContents?.contact?.subheadingFontStyle || 'normal', letterSpacing: `${pageContents?.contact?.subheadingLetterSpacing ?? '0'}px` }}>
            {pageContents?.contact?.subheading || "Have questions about a destination or hostel? Want to contribute a travel hack? Send us a message and we'll reply shortly."}
          </p>
        </div>
      </div>

      {/* Form and info row */}
      <div className="container" style={{ marginBottom: '4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '3.5rem',
            alignItems: 'flex-start'
          }}
          className="contact-layout"
        >
          {/* Left Column: Info card */}
          <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h2 style={{ fontSize: '1.75rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
              Contact Information
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
              Feel free to reach out to our team at any of our hubs. We are always happy to help with itinerary suggestions or website issues.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Address */}
              <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transform: 'none' }}>
                <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <FiMapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>Headquarters</h4>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>Suite 400, 1200 Pine Street, Seattle, WA 98101</span>
                </div>
              </div>

              {/* Phone */}
              <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transform: 'none' }}>
                <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <FiPhone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>Phone Lines</h4>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>+1 (206) 555-0199</span>
                </div>
              </div>

              {/* Email */}
              <div className="card" style={{ padding: '1.25rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', transform: 'none' }}>
                <div style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }}>
                  <FiMail size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>Email Inquiries</h4>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>support@travelvista.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div
            className="card"
            style={{
              padding: '2.5rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              transform: 'none'
            }}
          >
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', marginBottom: '1.5rem', textAlign: 'left' }}>
              Send Us a Message
            </h3>

            {/* Submit Success Alert */}
            {submitSuccess && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  backgroundColor: 'var(--secondary-light)',
                  color: 'var(--secondary)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left',
                  animation: 'fadeIn 0.3s ease-out'
                }}
              >
                <FiCheckCircle size={22} style={{ flexShrink: 0 }} />
                Your message has been sent successfully! We will get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name-input">Full Name</label>
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name..."
                  className="form-control"
                  style={{ borderColor: errors.name ? '#ef4444' : 'var(--border-color)' }}
                />
                {errors.name && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem', fontWeight: 500 }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email-input">Email Address</label>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address..."
                  className="form-control"
                  style={{ borderColor: errors.email ? '#ef4444' : 'var(--border-color)' }}
                />
                {errors.email && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem', fontWeight: 500 }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message-input">Your Message</label>
                <textarea
                  id="message-input"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you plan your budget trip? Describe in detail..."
                  className="form-control"
                  style={{
                    borderColor: errors.message ? '#ef4444' : 'var(--border-color)',
                    resize: 'vertical'
                  }}
                />
                {errors.message && (
                  <span style={{ color: '#ef4444', fontSize: '0.8rem', display: 'block', marginTop: '0.25rem', fontWeight: 500 }}>
                    {errors.message}
                  </span>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
              >
                {isSubmitting ? 'Sending Message...' : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section style={{ padding: '0 0 5rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Global Offices</h2>
            <p>We are situated in major flight hubs across the globe. Tap pins to get detailed office addresses.</p>
          </div>
          <MapPlaceholder />
        </div>
      </section>

      {/* Mobile styles override */}
      <style>{`
        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;

import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const Testimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        ),
      6000
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex, testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      style={{
        maxWidth: '750px',
        margin: '0 auto',
        position: 'relative',
        padding: '0 3.5rem',
      }}
    >
      {/* Testimonial Card */}
      <div
        className="card"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--border-color)',
          transform: 'none', // Override global hover translate
        }}
      >
        {/* Rating Stars */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.25rem' }}>
          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
            <FiStar key={i} fill="#f59e0b" color="#f59e0b" size={18} />
          ))}
        </div>

        {/* Quote text */}
        <p
          style={{
            fontSize: '1.15rem',
            fontStyle: 'italic',
            lineHeight: '1.6',
            color: 'var(--text-main)',
            marginBottom: '1.75rem',
          }}
        >
          "{testimonials[currentIndex].review}"
        </p>

        {/* User Profile */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <img
            src={testimonials[currentIndex].avatar}
            alt={testimonials[currentIndex].name}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--primary-light)',
            }}
          />
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-heading)' }}>
              {testimonials[currentIndex].name}
            </h4>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {testimonials[currentIndex].role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={handlePrev}
        className="btn-icon-only"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-card)',
          width: '40px',
          height: '40px',
        }}
        aria-label="Previous testimonial"
      >
        <FiChevronLeft size={20} />
      </button>

      <button
        onClick={handleNext}
        className="btn-icon-only"
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          borderRadius: '50%',
          backgroundColor: 'var(--bg-card)',
          width: '40px',
          height: '40px',
        }}
        aria-label="Next testimonial"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: index === currentIndex ? 'var(--primary)' : 'var(--border-color)',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
              padding: 0
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

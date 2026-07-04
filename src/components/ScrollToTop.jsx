import React, { useState, useEffect } from 'react';
import { FiChevronUp } from 'react-icons/fi';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="btn-primary"
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            right: '2.5rem',
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 99,
            cursor: 'pointer',
            padding: 0,
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <FiChevronUp style={{ fontSize: '1.5rem' }} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;

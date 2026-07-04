import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FAQAccordion = ({ faqs }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {faqs.map((faq, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={faq.id}
            className="card"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
              transform: 'none', // Override global card hover transform
              transition: 'all var(--transition-normal)'
            }}
          >
            <button
              onClick={() => toggleIndex(index)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                outline: 'none',
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  color: isOpen ? 'var(--primary)' : 'var(--text-heading)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {faq.question}
              </span>
              <span style={{ color: isOpen ? 'var(--primary)' : 'var(--text-muted)' }}>
                {isOpen ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
              </span>
            </button>
            
            <div
              style={{
                maxHeight: isOpen ? '250px' : '0px',
                opacity: isOpen ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: isOpen ? '0 1.5rem 1.5rem 1.5rem' : '0 1.5rem',
              }}
            >
              <p style={{ color: 'var(--text-main)', fontSize: '0.975rem', lineHeight: '1.6' }}>
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;

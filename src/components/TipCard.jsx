import React, { useState } from 'react';
import { FiPackage, FiShield, FiTrendingDown, FiSun, FiUsers, FiChevronDown, FiChevronUp, FiCheck } from 'react-icons/fi';

const TipCard = ({ tip }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Icon mapping
  const renderIcon = (iconName) => {
    const iconStyles = { size: 24, color: 'var(--primary)' };
    switch (iconName) {
      case 'FiPackage': return <FiPackage {...iconStyles} />;
      case 'FiShield': return <FiShield {...iconStyles} />;
      case 'FiTrendingDown': return <FiTrendingDown {...iconStyles} />;
      case 'FiSun': return <FiSun {...iconStyles} />;
      case 'FiUsers': return <FiUsers {...iconStyles} />;
      default: return <FiPackage {...iconStyles} />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'packing tips': return 'var(--primary)';
      case 'safety tips': return '#ef4444';
      case 'budget-saving tips': return 'var(--secondary)';
      case 'best travel seasons': return '#eab308';
      case 'local etiquette': return '#a855f7';
      default: return 'var(--primary)';
    }
  };

  return (
    <div
      className="card"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '2rem',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: 'var(--shadow-sm)',
        transform: 'none',
        transition: 'all var(--transition-normal)'
      }}
    >
      {/* Icon & Category */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
        <div
          style={{
            backgroundColor: 'var(--primary-light)',
            padding: '0.75rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {renderIcon(tip.icon)}
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            color: getCategoryColor(tip.category),
            backgroundColor: `${getCategoryColor(tip.category)}15`, // Adding opacity using hex notation
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-full)'
          }}
        >
          {tip.category}
        </span>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
        {tip.title}
      </h3>

      {/* Summary */}
      <p style={{ color: 'var(--text-main)', fontSize: '0.925rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
        {tip.summary}
      </p>

      {/* Read More button & Expanded Content */}
      <div style={{ marginTop: 'auto' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--primary)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: 0,
            outline: 'none'
          }}
        >
          {isOpen ? (
            <>
              Hide checklist <FiChevronUp />
            </>
          ) : (
            <>
              View actionable tips <FiChevronDown />
            </>
          )}
        </button>

        <div
          style={{
            maxHeight: isOpen ? '500px' : '0px',
            opacity: isOpen ? 1 : 0,
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            marginTop: isOpen ? '1rem' : 0
          }}
        >
          <div
            style={{
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem'
            }}
          >
            {tip.points.map((point, index) => (
              <div key={index} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <FiCheck
                  size={16}
                  style={{
                    color: 'var(--secondary)',
                    marginTop: '0.2rem',
                    flexShrink: 0,
                    backgroundColor: 'var(--secondary-light)',
                    borderRadius: '50%',
                    padding: '1px'
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCard;

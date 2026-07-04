import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp, FiMapPin, FiCompass, FiCoffee, FiInfo } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const HiddenGems = () => {
  const { hiddenGems, pageContents } = useData();
  const [expandedGem, setExpandedGem] = useState(null);

  const toggleExpand = (id) => {
    setExpandedGem(expandedGem === id ? null : id);
  };

  return (
    <div className="page fade-in">
      {/* Page Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--secondary) 0%, #065f46 100%)',
          padding: '4rem 0',
          color: 'white',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}
      >
        <div className="container">
          <h1 style={{ color: pageContents?.hiddenGems?.headingColor || 'white', fontSize: `${pageContents?.hiddenGems?.headingFontSize || '2.5'}rem`, marginBottom: '0.75rem', fontWeight: pageContents?.hiddenGems?.headingFontWeight || '800', fontFamily: `'${pageContents?.hiddenGems?.headingFontFamily || 'Outfit'}', sans-serif`, fontStyle: pageContents?.hiddenGems?.headingFontStyle || 'normal', textTransform: pageContents?.hiddenGems?.headingTextTransform || 'none', textDecoration: pageContents?.hiddenGems?.headingTextDecoration || 'none', letterSpacing: `${pageContents?.hiddenGems?.headingLetterSpacing ?? '-0.5'}px` }}>
            {pageContents?.hiddenGems?.heading || "Off the Beaten Path"}
          </h1>
          <p style={{ color: pageContents?.hiddenGems?.subheadingColor || 'var(--secondary-light)', fontSize: `${pageContents?.hiddenGems?.subheadingFontSize || '1.1'}rem`, maxWidth: '600px', marginInline: 'auto', fontFamily: `'${pageContents?.hiddenGems?.subheadingFontFamily || 'Inter'}', sans-serif`, fontWeight: pageContents?.hiddenGems?.subheadingFontWeight || '400', fontStyle: pageContents?.hiddenGems?.subheadingFontStyle || 'normal', letterSpacing: `${pageContents?.hiddenGems?.subheadingLetterSpacing ?? '0'}px` }}>
            {pageContents?.hiddenGems?.subheading || "Escape the tourist traps. Explore quiet beaches, scenic valleys, mountain towns, and ancient fortresses with minimal crowds."}
          </p>
        </div>
      </div>

      {/* Grid of Hidden Gems */}
      <div className="container" style={{ marginBottom: '5rem' }}>
        <div className="grid-2" style={{ gap: '2.5rem' }}>
          {hiddenGems.map((gem) => {
            const isExpanded = expandedGem === gem.id;
            return (
              <div
                key={gem.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  overflow: 'hidden',
                  transform: 'none', // Override global hover translate
                }}
              >
                {/* Gem Image */}
                <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/9' }}>
                  <img
                    src={gem.image}
                    alt={gem.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {/* Budget Badge */}
                  <span
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'var(--secondary)',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      padding: '0.3rem 0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    Est. ₹{gem.estimatedBudget.toLocaleString('en-IN')}/day
                  </span>
                </div>

                {/* Card Content */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.5rem' }}>
                    <FiMapPin style={{ color: 'var(--secondary)' }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {gem.country}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
                    {gem.name}
                  </h3>

                  <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {gem.description}
                  </p>

                  {/* Accordion / Expandable sections for detailed hacks */}
                  <div>
                    <button
                      onClick={() => toggleExpand(gem.id)}
                      className="btn btn-outline"
                      style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        padding: '0.65rem 1rem',
                        fontSize: '0.9rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <span>{isExpanded ? 'Hide Details' : 'View Attractions & Food Hacks'}</span>
                      {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {/* Expandable Area */}
                    <div
                      style={{
                        maxHeight: isExpanded ? '600px' : '0px',
                        opacity: isExpanded ? 1 : 0,
                        overflow: 'hidden',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        marginTop: isExpanded ? '1.5rem' : 0
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                        {/* Attractions */}
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            <FiCompass style={{ color: 'var(--secondary)' }} /> Local Attractions
                          </h4>
                          <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {gem.attractions.map((attr, i) => (
                              <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ width: '6px', height: '6px', backgroundColor: 'var(--secondary)', borderRadius: '50%' }} />
                                {attr}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Food Recommendations */}
                        <div>
                          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            <FiCoffee style={{ color: 'var(--secondary)' }} /> Local Food Hacks
                          </h4>
                          <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            {gem.foodRecommendations.map((food, i) => (
                              <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ width: '6px', height: '6px', backgroundColor: '#eab308', borderRadius: '50%' }} />
                                {food}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Travel tips */}
                        <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                            <FiInfo style={{ color: 'var(--primary)' }} /> Student Travel Tips
                          </h4>
                          <ul style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {gem.travelTips.map((tip, i) => (
                              <li key={i} style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                                <strong>Tip {i + 1}:</strong> {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HiddenGems;

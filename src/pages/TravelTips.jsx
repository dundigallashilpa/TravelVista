import React, { useState } from 'react';
import { FiSearch, FiInfo } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import TipCard from '../components/TipCard';

const TravelTips = () => {
  const { tips, pageContents } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Packing Tips', 'Safety Tips', 'Budget-saving Tips', 'Best Travel Seasons', 'Local Etiquette'];

  const filteredTips = tips.filter((tip) => {
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'All' || tip.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page fade-in">
      {/* Page Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
          padding: '4rem 0',
          color: 'white',
          textAlign: 'center',
          marginBottom: '3rem'
        }}
      >
        <div className="container">
          <h1 style={{ color: pageContents?.tips?.headingColor || 'white', fontSize: `${pageContents?.tips?.headingFontSize || '2.5'}rem`, marginBottom: '0.75rem', fontWeight: pageContents?.tips?.headingFontWeight || '800', fontFamily: `'${pageContents?.tips?.headingFontFamily || 'Outfit'}', sans-serif`, fontStyle: pageContents?.tips?.headingFontStyle || 'normal', textTransform: pageContents?.tips?.headingTextTransform || 'none', textDecoration: pageContents?.tips?.headingTextDecoration || 'none', letterSpacing: `${pageContents?.tips?.headingLetterSpacing ?? '-0.5'}px` }}>
            {pageContents?.tips?.heading || "Travel Tips & Guides"}
          </h1>
          <p style={{ color: pageContents?.tips?.subheadingColor || 'var(--primary-light)', fontSize: `${pageContents?.tips?.subheadingFontSize || '1.1'}rem`, maxWidth: '600px', marginInline: 'auto', fontFamily: `'${pageContents?.tips?.subheadingFontFamily || 'Inter'}', sans-serif`, fontWeight: pageContents?.tips?.subheadingFontWeight || '400', fontStyle: pageContents?.tips?.subheadingFontStyle || 'normal', letterSpacing: `${pageContents?.tips?.subheadingLetterSpacing ?? '0'}px` }}>
            {pageContents?.tips?.subheading || "Actionable advice curated by veteran backpackers. Explore how to pack light, stay safe, save money, and respect local cultures."}
          </p>
        </div>
      </div>

      {/* Filter and Search Bar Section */}
      <div className="container" style={{ marginBottom: '4rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.5rem',
            gap: '1.5rem',
            flexWrap: 'wrap'
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              overflowX: 'auto',
              paddingBottom: '0.25rem',
              maxWidth: '100%'
            }}
            className="scrollable-tabs"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    border: '1px solid var(--border-color)',
                    backgroundColor: isActive ? 'var(--primary)' : 'var(--bg-card)',
                    color: isActive ? 'white' : 'var(--text-main)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all var(--transition-fast)'
                  }}
                  className="tab-button"
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div style={{ position: 'relative', width: '300px' }} className="search-bar-wrapper">
            <input
              type="text"
              placeholder="Search tips or guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.25rem',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-input)',
                color: 'var(--text-heading)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
              className="form-control"
            />
            <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
          </div>
        </div>

        {/* Tip Cards Grid */}
        {filteredTips.length === 0 ? (
          <div
            className="card"
            style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)'
            }}
          >
            <FiInfo size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
              No Articles Found
            </h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', marginInline: 'auto' }}>
              We couldn't find any guides matching your search string. Try clearing your search query or selecting a different tab.
            </p>
          </div>
        ) : (
          <div className="grid-2" style={{ gap: '2rem' }}>
            {filteredTips.map((tip) => (
              <TipCard key={tip.id} tip={tip} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .scrollable-tabs::-webkit-scrollbar {
          height: 5px;
        }
        .scrollable-tabs::-webkit-scrollbar-thumb {
          background: var(--border-color);
        }
        .tab-button:hover {
          border-color: var(--primary);
          color: var(--primary);
        }
        .tab-button:hover:focus-visible {
          outline: none;
        }
        @media (max-width: 768px) {
          .search-bar-wrapper {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default TravelTips;

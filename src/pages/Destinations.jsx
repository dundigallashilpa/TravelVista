import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch, FiRotateCcw, FiInfo, FiCompass } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';

const Destinations = () => {
  const { destinations, pageContents } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDestination, setSelectedDestination] = useState(null);

  // States for filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Sync search and type params from URL if they change
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    const urlType = searchParams.get('type');
    
    if (urlSearch !== null) setSearchQuery(urlSearch);
    if (urlType !== null) setSelectedType(urlType);
  }, [searchParams]);

  // Unique list of countries for filter select option
  const countries = ['All', ...new Set(destinations.map(d => d.country))];

  // Travel categories
  const travelTypes = ['All', 'Adventure', 'Nature', 'Beach', 'Heritage'];

  // Handle resets
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('All');
    setSelectedBudget('All');
    setSelectedCountry('All');
    setSearchParams({}); // Clear URL params
  };

  // Filter logic
  const filteredDestinations = destinations.filter((dest) => {
    // 1. Text search match
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      dest.name.toLowerCase().includes(query) ||
      dest.country.toLowerCase().includes(query) ||
      dest.description.toLowerCase().includes(query);

    // 2. Travel type match
    const matchesType = selectedType === 'All' || dest.type === selectedType;

    // 3. Country match
    const matchesCountry = selectedCountry === 'All' || dest.country === selectedCountry;

    // 4. Budget match
    // Budget: <= 25, Mid-Range: 26 - 55, Premium: > 55
    let matchesBudget = true;
    if (selectedBudget === 'Budget') {
      matchesBudget = dest.budgetEstimate <= 1800;
    } else if (selectedBudget === 'Mid-Range') {
      matchesBudget = dest.budgetEstimate > 1800 && dest.budgetEstimate <= 3500;
    } else if (selectedBudget === 'Premium') {
      matchesBudget = dest.budgetEstimate > 3500;
    }

    return matchesSearch && matchesType && matchesCountry && matchesBudget;
  });

  return (
    <div className="page fade-in">
      {/* Banner Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
          padding: '4rem 0',
          color: 'white',
          textAlign: 'center',
          marginBottom: '3rem'
        }}
      >
        <div className="container">
          <h1 style={{ color: pageContents?.destinations?.headingColor || 'white', fontSize: `${pageContents?.destinations?.headingFontSize || '2.5'}rem`, marginBottom: '0.75rem', fontWeight: pageContents?.destinations?.headingFontWeight || '800', fontFamily: `'${pageContents?.destinations?.headingFontFamily || 'Outfit'}', sans-serif`, fontStyle: pageContents?.destinations?.headingFontStyle || 'normal', textTransform: pageContents?.destinations?.headingTextTransform || 'none', textDecoration: pageContents?.destinations?.headingTextDecoration || 'none', letterSpacing: `${pageContents?.destinations?.headingLetterSpacing ?? '-0.5'}px` }}>
            {pageContents?.destinations?.heading || "Explore Destinations"}
          </h1>
          <p style={{ color: pageContents?.destinations?.subheadingColor || 'var(--primary-light)', fontSize: `${pageContents?.destinations?.subheadingFontSize || '1.1'}rem`, maxWidth: '600px', marginInline: 'auto', fontFamily: `'${pageContents?.destinations?.subheadingFontFamily || 'Inter'}', sans-serif`, fontWeight: pageContents?.destinations?.subheadingFontWeight || '400', fontStyle: pageContents?.destinations?.subheadingFontStyle || 'normal', letterSpacing: `${pageContents?.destinations?.subheadingLetterSpacing ?? '0'}px` }}>
            {pageContents?.destinations?.subheading || "Browse through student-approved travel locations. Filter by budget level, travel interest, or location to plan your next escape."}
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="container" style={{ marginBottom: '5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '2.5rem',
            alignItems: 'flex-start'
          }}
          className="destinations-layout"
        >
          {/* Left Column: Filters panel */}
          <aside
            className="card"
            style={{
              padding: '1.75rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'left'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-heading)' }}>
                <FiFilter style={{ color: 'var(--primary)' }} /> Filters
              </h3>
              <button
                onClick={handleResetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: 0
                }}
              >
                <FiRotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Filter: Search bar input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="search-input" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Search
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="search-input"
                  type="text"
                  placeholder="State, country, keywords..."
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

            {/* Filter: Travel Type select */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="travel-type-select" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Travel Type
              </label>
              <select
                id="travel-type-select"
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  // Remove type param from url when selecting All to avoid confusion
                  if (e.target.value === 'All') {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete('type');
                    setSearchParams(newParams);
                  }
                }}
                className="form-control"
                style={{ fontSize: '0.9rem', padding: '0.65rem 0.75rem', cursor: 'pointer' }}
              >
                {travelTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Filter: Budget level checkboxes */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Budget Tier
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {['All', 'Budget', 'Mid-Range', 'Premium'].map((tier) => (
                  <label
                    key={tier}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="budget"
                      checked={selectedBudget === tier}
                      onChange={() => setSelectedBudget(tier)}
                      style={{ accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                    <span>
                      {tier === 'All' && 'All Budgets'}
                      {tier === 'Budget' && 'Budget (≤₹1,800/day)'}
                      {tier === 'Mid-Range' && 'Mid-Range (₹1,801-₹3,500/day)'}
                      {tier === 'Premium' && 'Premium (>₹3,500/day)'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Country Select */}
            <div>
              <label htmlFor="country-select" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                State / Country
              </label>
              <select
                id="country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="form-control"
                style={{ fontSize: '0.9rem', padding: '0.65rem 0.75rem', cursor: 'pointer' }}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* Right Column: Cards Grid */}
          <main>
            {/* Header info bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>
                Showing {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
              </span>
              {selectedType !== 'All' || selectedBudget !== 'All' || selectedCountry !== 'All' || searchQuery !== '' ? (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <FiInfo /> Active filters are applying to matches.
                </span>
              ) : null}
            </div>

            {/* If no matches found */}
            {filteredDestinations.length === 0 ? (
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
                <FiCompass size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
                  No Destinations Found
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '400px', marginInline: 'auto' }}>
                  We couldn't find any destinations matching your search parameters. Try resetting or adjusting your filter settings!
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary">
                  Clear All Filters
                </button>
              </div>
            ) : (
              /* Grid catalog list */
              <div className="grid-3" style={{ gap: '1.5rem' }}>
                {filteredDestinations.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onViewDetails={setSelectedDestination}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Details Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      {/* Mobile styling override */}
      <style>{`
        @media (max-width: 900px) {
          .destinations-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Destinations;

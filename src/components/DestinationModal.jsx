import React, { useEffect, useState } from 'react';
import { FiX, FiStar, FiCalendar, FiMapPin, FiCompass, FiAward, FiEdit3, FiTrash2, FiPlus, FiCheck, FiXCircle, FiRefreshCw, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const DestinationModal = ({ destination, onClose }) => {
  const { isOwner } = useAuth();
  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Itinerary editing states
  const [itineraryItems, setItineraryItems] = useState(() => {
    const saved = localStorage.getItem(`travelvista_itinerary_${destination.id}`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [...destination.itinerary];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempItinerary, setTempItinerary] = useState([]);

  const startEditing = () => {
    setTempItinerary([...itineraryItems]);
    setIsEditing(true);
  };

  const handleItemChange = (index, value) => {
    const updated = [...tempItinerary];
    updated[index] = value;
    setTempItinerary(updated);
  };

  const handleDeleteItem = (index) => {
    const updated = tempItinerary.filter((_, idx) => idx !== index);
    setTempItinerary(updated);
  };

  const handleAddItem = () => {
    setTempItinerary([...tempItinerary, `Day ${tempItinerary.length + 1}: Custom activity details...`]);
  };

  const saveItinerary = () => {
    setItineraryItems(tempItinerary);
    localStorage.setItem(`travelvista_itinerary_${destination.id}`, JSON.stringify(tempItinerary));
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset to the original default itinerary?")) {
      setItineraryItems([...destination.itinerary]);
      localStorage.removeItem(`travelvista_itinerary_${destination.id}`);
      setIsEditing(false);
    }
  };

  const isCustomized = localStorage.getItem(`travelvista_itinerary_${destination.id}`) !== null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      {/* Modal Content Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          width: '100%',
          maxWidth: '950px',
          maxHeight: '90vh',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: 'none', // Disable card hover scale
        }}
        className="modal-content-card"
      >
        {/* Header/Close row for Mobile */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)',
            zIndex: 10
          }}
        >
          <span style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '1.1rem' }}>
            Destination Details
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            className="btn-icon-only"
            aria-label="Close details modal"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Scrollable Scroll Area */}
        <div
          style={{
            overflowY: 'auto',
            padding: '2rem',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1.8fr',
            gap: '2.5rem',
          }}
          className="modal-scroll-grid"
        >
          {/* Left Column: Image, Badges, Budget Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', aspectRatio: '4/3', boxShadow: 'var(--shadow-sm)' }}>
              <img
                src={destination.image}
                alt={destination.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Quick Metrics */}
            <div
              style={{
                backgroundColor: 'var(--primary-light)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FiMapPin style={{ color: 'var(--primary)' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Location</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>
                    {destination.name}, {destination.country}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FiCalendar style={{ color: 'var(--primary)' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Best Time to Visit</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>
                    {destination.bestSeason}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FiCompass style={{ color: 'var(--primary)' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Daily Student Cost</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem' }}>
                    ₹{destination.budgetEstimate.toLocaleString('en-IN')} / day ({destination.budget})
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FiStar style={{ color: 'var(--primary)' }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>User Rating</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-heading)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {destination.rating} / 5.0
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Descriptions, Attractions, Itinerary */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
            <div>
              <h2 style={{ fontSize: '1.85rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
                {destination.name}
              </h2>
              <span
                style={{
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: 'var(--primary)'
                }}
              >
                {destination.type} Adventure
              </span>
            </div>

            <div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.5rem', fontWeight: 600 }}>
                Overview
              </h4>
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {destination.detailedDescription}
              </p>
            </div>

            {/* Attractions */}
            <div>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', marginBottom: '0.75rem', fontWeight: 600 }}>
                Top Student Attractions
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {destination.attractions.map((attraction, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.85rem',
                      padding: '0.35rem 0.75rem',
                      backgroundColor: 'var(--bg-main)',
                      color: 'var(--text-heading)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 500,
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <FiAward size={14} style={{ color: 'var(--secondary)' }} /> {attraction}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Itinerary */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--text-heading)', fontWeight: 600, margin: 0 }}>
                  {isEditing ? "Customize Itinerary" : "Budget Itinerary Suggestions"}
                </h4>
                
                {/* Actions row */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {isOwner ? (
                    isEditing ? (
                      <>
                        <button
                          onClick={saveItinerary}
                          className="btn btn-primary"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.25rem' }}
                        >
                          <FiCheck size={14} /> Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="btn btn-outline"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.25rem' }}
                        >
                          <FiXCircle size={14} /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={startEditing}
                          className="btn btn-outline"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.25rem' }}
                        >
                          <FiEdit3 size={14} /> Edit Schedule
                        </button>
                        {isCustomized && (
                          <button
                            onClick={resetToDefault}
                            className="btn btn-outline"
                            style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', gap: '0.25rem', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                          >
                            <FiRefreshCw size={14} /> Reset
                          </button>
                        )}
                      </>
                    )
                  ) : (
                    <Link
                      to="/owner-login"
                      onClick={onClose}
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        textDecoration: 'underline'
                      }}
                    >
                      <FiLock size={12} /> Owner Edit Mode
                    </Link>
                  )}
                </div>
              </div>

              {/* Itinerary Items Display / Editor */}
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {tempItinerary.map((step, i) => (
                    <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch' }}>
                      <textarea
                        value={step}
                        onChange={(e) => handleItemChange(i, e.target.value)}
                        className="form-control"
                        rows="2"
                        style={{
                          fontSize: '0.875rem',
                          padding: '0.5rem 0.75rem',
                          color: 'var(--text-main)',
                          backgroundColor: 'var(--bg-input)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-sm)',
                          resize: 'vertical',
                          flexGrow: 1
                        }}
                      />
                      <button
                        onClick={() => handleDeleteItem(i)}
                        className="btn-icon-only"
                        style={{ color: '#ef4444', borderColor: 'var(--border-color)', width: '38px', flexShrink: 0, padding: 0 }}
                        title="Delete Day"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddItem}
                    className="btn btn-outline"
                    style={{ width: '100%', padding: '0.5rem', borderStyle: 'dashed', justifyContent: 'center', fontSize: '0.85rem' }}
                  >
                    <FiPlus size={14} /> Add New Day
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {itineraryItems.length === 0 ? (
                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      No itinerary items. Click "Edit Schedule" to customize your plan.
                    </p>
                  ) : (
                    itineraryItems.map((step, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '0.85rem 1rem',
                          backgroundColor: 'var(--bg-main)',
                          borderRadius: 'var(--radius-sm)',
                          borderLeft: '4px solid var(--primary)',
                          fontSize: '0.9rem',
                          color: 'var(--text-main)',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {step}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes slideUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @media (max-width: 768px) {
            .modal-scroll-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
              padding: 1.25rem !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default DestinationModal;

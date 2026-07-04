import React from 'react';
import { FiStar, FiCalendar, FiCompass } from 'react-icons/fi';

const DestinationCard = ({ destination, onViewDetails }) => {
  const getBadgeClass = (type) => {
    switch (type.toLowerCase()) {
      case 'adventure': return 'badge-adventure';
      case 'nature': return 'badge-nature';
      case 'beach': return 'badge-beach';
      case 'heritage': return 'badge-heritage';
      default: return '';
    }
  };

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Card Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10' }}>
        <img
          src={destination.image}
          alt={destination.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Travel Type Badge */}
        <span
          className={`badge ${getBadgeClass(destination.type)}`}
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {destination.type}
        </span>

        {/* Rating Badge */}
        <div
          className="rating-badge"
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(4px)',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <FiStar fill="#f59e0b" color="#f59e0b" size={14} />
          <span>{destination.rating}</span>
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
          {destination.name}
        </h3>
        
        {/* Info Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiCalendar style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span>Best Season: <strong>{destination.bestSeason}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiCompass style={{ color: 'var(--secondary)', flexShrink: 0 }} />
            <span>Est. Cost: <strong>₹{destination.budgetEstimate.toLocaleString('en-IN')}/day</strong> ({destination.budget})</span>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '1.5rem', flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {destination.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => onViewDetails(destination)}
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 'auto', padding: '0.65rem 1rem' }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;

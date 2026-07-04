import React from 'react';
import { FiStar, FiMapPin, FiCheckCircle } from 'react-icons/fi';

const HostelCard = ({ hostel }) => {
  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden'
      }}
    >
      {/* Hostel Image & Price Badge */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16/10' }}>
        <img
          src={hostel.image}
          alt={hostel.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Price Badge */}
        <span
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            backgroundColor: 'var(--secondary)',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-sm)',
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          ₹{hostel.price}/night
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
          <span>{hostel.rating}</span>
        </div>
      </div>

      {/* Hostel Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, textAlign: 'left' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.35rem', color: 'var(--text-heading)' }}>
          {hostel.name}
        </h3>
        
        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          <FiMapPin style={{ color: 'var(--primary)' }} />
          <span>{hostel.location}</span>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
          {hostel.description}
        </p>

        {/* Amenities Title */}
        <div style={{ marginTop: 'auto' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
            Amenities Include
          </span>
          {/* Amenities Grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {hostel.amenities.map((amenity, index) => (
              <span
                key={index}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.2rem 0.5rem',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--text-heading)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 500,
                  border: '1px solid var(--border-color)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
              >
                <FiCheckCircle size={10} style={{ color: 'var(--primary)' }} />
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelCard;

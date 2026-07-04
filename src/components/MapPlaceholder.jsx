import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';

const MapPlaceholder = () => {
  const [activePin, setActivePin] = useState(1);

  const hubs = [
    {
      id: 1,
      name: "TravelVista HQ (Seattle)",
      address: "Suite 400, 1200 Pine Street, Seattle, WA 98101",
      phone: "+1 (206) 555-0199",
      email: "seattle@travelvista.com",
      hours: "Mon - Fri: 9:00 AM - 5:00 PM PST",
      x: 35, // SVG relative coordinates
      y: 38
    },
    {
      id: 2,
      name: "Europe Hub (Amsterdam)",
      address: "Prinsengracht 240, 1016 AB Amsterdam, Netherlands",
      phone: "+31 20 555 0122",
      email: "amsterdam@travelvista.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM CET",
      x: 52,
      y: 30
    },
    {
      id: 3,
      name: "Asia-Pacific Hub (Singapore)",
      address: "10 Collyer Quay, Ocean Financial Centre, Singapore 049315",
      phone: "+65 6555 0144",
      email: "singapore@travelvista.com",
      hours: "Mon - Fri: 9:00 AM - 6:00 PM SGT",
      x: 75,
      y: 65
    }
  ];

  return (
    <div
      className="card"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        transform: 'none'
      }}
    >
      {/* Interactive Map Visual */}
      <div
        style={{
          height: '350px',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* World Grid Lines */}
        <svg
          style={{ width: '100%', height: '100%', opacity: 0.15 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Abstract Continent Silhouettes */}
        <svg
          viewBox="0 0 100 80"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            fill: '#334155',
            opacity: 0.4
          }}
        >
          {/* North America */}
          <path d="M 10 15 Q 18 12 25 18 T 35 25 T 38 40 Q 28 42 20 35 T 10 15 Z" />
          {/* Europe */}
          <path d="M 45 20 Q 52 15 58 20 T 60 30 T 55 35 Q 48 32 45 20 Z" />
          {/* Asia */}
          <path d="M 60 18 Q 72 15 85 22 T 90 40 T 78 55 Q 65 48 60 18 Z" />
          {/* South America */}
          <path d="M 28 45 Q 35 48 34 60 T 30 75 Q 22 68 28 45 Z" />
          {/* Africa */}
          <path d="M 45 38 Q 55 38 58 48 T 54 65 Q 45 60 45 38 Z" />
          {/* Australia */}
          <path d="M 75 58 Q 85 58 84 68 T 75 68 Q 70 62 75 58 Z" />
        </svg>

        {/* Location Markers */}
        {hubs.map((hub) => {
          const isActive = activePin === hub.id;
          return (
            <button
              key={hub.id}
              onClick={() => setActivePin(hub.id)}
              style={{
                position: 'absolute',
                left: `${hub.x}%`,
                top: `${hub.y}%`,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transform: 'translate(-50%, -100%)',
                zIndex: isActive ? 10 : 5,
                transition: 'all 0.3s'
              }}
              aria-label={`Select ${hub.name}`}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Ping rings */}
                <div
                  style={{
                    position: 'absolute',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--primary)' : 'var(--secondary)',
                    opacity: 0.4,
                    animation: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--primary)' : 'var(--secondary)',
                    border: '2px solid white',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    zIndex: 2
                  }}
                />
                <FiMapPin
                  size={36}
                  color={isActive ? 'var(--primary)' : 'var(--secondary)'}
                  style={{
                    transform: isActive ? 'scale(1.15) translateY(-4px)' : 'none',
                    filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))',
                    transition: 'all 0.3s',
                    position: 'relative',
                    zIndex: 1,
                    opacity: 0.85
                  }}
                />
              </div>
            </button>
          );
        })}

        {/* Floating Instruction */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            color: 'white',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          Click pins on the map to view our global hubs
        </div>
      </div>

      {/* Selected Address Card details */}
      <div
        style={{
          padding: '2rem',
          backgroundColor: 'var(--bg-card)',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'left'
        }}
      >
        {hubs.map((hub) => {
          const isActive = activePin === hub.id;
          if (!isActive) return null;
          return (
            <div key={hub.id} className="fade-in">
              <h4
                style={{
                  fontSize: '1.25rem',
                  marginBottom: '1rem',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FiMapPin /> {hub.name}
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1.25rem',
                  fontSize: '0.95rem'
                }}
              >
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <FiMapPin style={{ color: 'var(--text-muted)', marginTop: '0.25rem', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, display: 'block', color: 'var(--text-heading)' }}>
                      Address
                    </span>
                    <span style={{ color: 'var(--text-main)' }}>{hub.address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <FiPhone style={{ color: 'var(--text-muted)', marginTop: '0.25rem', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, display: 'block', color: 'var(--text-heading)' }}>
                      Contact Info
                    </span>
                    <span style={{ color: 'var(--text-main)', display: 'block' }}>{hub.phone}</span>
                    <span style={{ color: 'var(--primary)', display: 'block', fontSize: '0.9rem' }}>
                      {hub.email}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <FiClock style={{ color: 'var(--text-muted)', marginTop: '0.25rem', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, display: 'block', color: 'var(--text-heading)' }}>
                      Working Hours
                    </span>
                    <span style={{ color: 'var(--text-main)' }}>{hub.hours}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default MapPlaceholder;

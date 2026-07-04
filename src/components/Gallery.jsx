import React, { useState } from 'react';
import { FiX, FiMaximize2 } from 'react-icons/fi';

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      caption: "Sunset beach walk at Railay Beach, Thailand",
      category: "Beach"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
      caption: "Boat ride across Phewa Lake in Pokhara, Nepal",
      category: "Nature"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
      caption: "Angkor Wat stone temple gates, Cambodia",
      category: "Heritage"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80",
      caption: "Exploring the Ganges river ghats at Rishikesh",
      category: "Adventure"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      caption: "Stunning valley views in Cappadocia, Turkey",
      category: "Nature"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      caption: "Golden temple shrine reflections in Kyoto, Japan",
      category: "Heritage"
    }
  ];

  return (
    <div>
      {/* Grid Gallery */}
      <div className="grid-3" style={{ gap: '1.5rem' }}>
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => setActiveImage(img)}
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              cursor: 'pointer',
              aspectRatio: '4/3',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)',
            }}
            className="gallery-item-container"
          >
            <img
              src={img.url}
              alt={img.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform var(--transition-normal)'
              }}
            />
            {/* Hover overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)',
                opacity: 0,
                display: 'flex',
                alignItems: 'flex-end',
                padding: '1.25rem',
                transition: 'opacity var(--transition-fast)',
              }}
              className="gallery-hover-overlay"
            >
              <div style={{ color: 'var(--text-light)', width: '100%' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--secondary-light)',
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}
                >
                  {img.category}
                </span>
                <p style={{ fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>
                  {img.caption}
                </p>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  color: 'white',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FiMaximize2 size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveImage(null)}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              transition: 'background var(--transition-fast)'
            }}
            aria-label="Close image lightbox"
          >
            <FiX size={24} />
          </button>

          {/* Image & Caption Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '900px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            <img
              src={activeImage.url}
              alt={activeImage.caption}
              style={{
                maxHeight: '75vh',
                maxWidth: '100%',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                objectFit: 'contain'
              }}
            />
            <div style={{ textAlign: 'center', color: '#ffffff', maxWidth: '600px' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                  letterSpacing: '1px',
                  marginBottom: '0.25rem',
                  display: 'block'
                }}
              >
                {activeImage.category}
              </span>
              <p style={{ fontSize: '1.1rem', margin: 0 }}>{activeImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Scoped hover overrides */}
      <style>{`
        .gallery-item-container:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
        .gallery-item-container:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Gallery;

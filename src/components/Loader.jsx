import React from 'react';

const Loader = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--bg-main)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      <div
        className="spinner"
        style={{
          width: '50px',
          height: '50px',
          border: '4px solid var(--border-color)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite',
        }}
      />
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 600,
          color: 'var(--text-heading)',
          letterSpacing: '1px',
          animation: 'pulse 1.5s infinite alternate',
        }}
      >
        Travel<span style={{ color: 'var(--primary)' }}>Vista</span>
      </h3>
      
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Loader;

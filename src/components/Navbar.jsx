import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiCompass, FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isOwner } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        transition: 'all var(--transition-normal)',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        backgroundColor: isScrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={closeMenu}>
          <FiCompass size={28} style={{ color: 'var(--primary)' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px', color: 'var(--text-heading)' }}>
            Travel<span style={{ color: 'var(--primary)' }}>Vista</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem',
          }}
          className="desktop-nav"
        >
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
            <NavLink to="/destinations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Destinations</NavLink>
            <NavLink to="/hidden-gems" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Hidden Gems</NavLink>
            <NavLink to="/student-travel" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Student Travel</NavLink>
            <NavLink to="/travel-tips" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Travel Tips</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
            {isOwner ? (
              <NavLink to="/owner-dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ color: 'var(--secondary)', fontWeight: 600 }}>Owner Portal</NavLink>
            ) : (
              <NavLink to="/owner-login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Owner Login</NavLink>
            )}
          </div>
          
          <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.25rem', display: 'flex', alignItems: 'center' }}>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu trigger */}
        <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="mobile-controls">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-heading)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.25rem'
            }}
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Slideout Navigation */}
      <div
        style={{
          position: 'fixed',
          top: 'var(--header-height)',
          left: 0,
          right: 0,
          backgroundColor: 'var(--bg-card)',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          padding: '1.5rem 2rem 2.5rem 2rem',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '1.25rem',
          zIndex: 999,
          animation: 'slideDownMenu 0.3s ease-out forwards',
        }}
        className="mobile-menu"
      >
        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
        <NavLink to="/destinations" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Destinations</NavLink>
        <NavLink to="/hidden-gems" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Hidden Gems</NavLink>
        <NavLink to="/student-travel" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Student Travel</NavLink>
        <NavLink to="/travel-tips" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Travel Tips</NavLink>
        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>About</NavLink>
        <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Contact</NavLink>
        {isOwner ? (
          <NavLink to="/owner-dashboard" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} style={{ color: 'var(--secondary)' }}>Owner Portal</NavLink>
        ) : (
          <NavLink to="/owner-login" onClick={closeMenu} className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}>Owner Login</NavLink>
        )}
      </div>

      {/* Global CSS for Nav Highlights & Responsive toggling */}
      <style>{`
        .nav-link {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-main);
          position: relative;
          padding: 0.25rem 0;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--primary);
          transition: width 0.25s ease;
        }
        .nav-link.active {
          color: var(--primary);
          font-weight: 600;
        }
        .nav-link.active::after {
          width: 100%;
        }
        
        .mobile-nav-link {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .mobile-nav-link.active {
          color: var(--primary);
          border-left: 4px solid var(--primary);
          padding-left: 0.5rem;
        }
        
        @keyframes slideDownMenu {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-controls {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;

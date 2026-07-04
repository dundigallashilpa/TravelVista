import React from 'react';
import { FiAward, FiCompass, FiHeart, FiShield, FiTrendingDown } from 'react-icons/fi';
import { useData } from '../context/DataContext';

const About = () => {
  const { pageContents } = useData();
  const values = [
    {
      title: "Radical Affordability",
      desc: "We believe financial constraints shouldn't prevent you from seeing the world. We specialize in locating extreme high-value, cheap travel secrets.",
      icon: <FiTrendingDown size={28} />
    },
    {
      title: "Authentic Adventure",
      desc: "Ditch the crowded tour buses. We promote deep cultural immersion, street food explorations, and hiking off the beaten path.",
      icon: <FiCompass size={28} />
    },
    {
      title: "Safety First",
      desc: "Budget travel shouldn't mean compromising safety. We verify all hostel listings and curate checklists to keep you safe and sound.",
      icon: <FiShield size={28} />
    },
    {
      title: "Shared Community",
      desc: "Solo travel is never lonely when you stay in the right spots. We help student travelers connect, share tips, and build lifelong friendships.",
      icon: <FiHeart size={28} />
    }
  ];

  return (
    <div className="page fade-in">
      {/* Page Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '4.5rem 0',
          color: 'white',
          textAlign: 'center',
          marginBottom: '4rem'
        }}
      >
        <div className="container">
          <h1 style={{ color: pageContents?.about?.headingColor || 'white', fontSize: `${pageContents?.about?.headingFontSize || '2.5'}rem`, marginBottom: '0.75rem', fontWeight: pageContents?.about?.headingFontWeight || '800', fontFamily: `'${pageContents?.about?.headingFontFamily || 'Outfit'}', sans-serif`, fontStyle: pageContents?.about?.headingFontStyle || 'normal', textTransform: pageContents?.about?.headingTextTransform || 'none', textDecoration: pageContents?.about?.headingTextDecoration || 'none', letterSpacing: `${pageContents?.about?.headingLetterSpacing ?? '-0.5'}px` }}>
            {pageContents?.about?.heading || "Our Mission & Story"}
          </h1>
          <p style={{ color: pageContents?.about?.subheadingColor || 'var(--text-muted)', fontSize: `${pageContents?.about?.subheadingFontSize || '1.1'}rem`, maxWidth: '600px', marginInline: 'auto', fontFamily: `'${pageContents?.about?.subheadingFontFamily || 'Inter'}', sans-serif`, fontWeight: pageContents?.about?.subheadingFontWeight || '400', fontStyle: pageContents?.about?.subheadingFontStyle || 'normal', letterSpacing: `${pageContents?.about?.subheadingLetterSpacing ?? '0'}px` }}>
            {pageContents?.about?.subheading || "Learn why we started TravelVista and how we help thousands of college students embark on budget backpacking trips every year."}
          </p>
        </div>
      </div>

      {/* Intro Split Grid */}
      <section style={{ padding: '0 0 5rem 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '4rem',
              alignItems: 'center'
            }}
            className="about-split"
          >
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1.25rem', color: 'var(--text-heading)' }}>
                Empowering Students to Explore More and Spend Less
              </h2>
              <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
                {pageContents?.about?.mission || "TravelVista was founded in 2024 by a group of college students who were tired of seeing overpriced vacation packages. We realized that with the right hacks, shared accommodations, and local transit networks, international travel is fully reachable even on a part-time job budget."}
              </p>
              <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.7' }}>
                Today, our platform guides student backpackers to find cheap, highly-rated hostel dorms, discover secret tourist spots, calculate daily budgets, and respect local cultures with ease.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Students studying maps together"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border-color)',
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ backgroundColor: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>These values guide everything we do—from recommending hostels to writing safety checklists.</p>
          </div>

          <div className="grid-2" style={{ gap: '2rem' }}>
            {values.map((val, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  padding: '2rem',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  transform: 'none' // Override hover scale
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {val.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-heading)' }}>
                    {val.title}
                  </h3>
                  <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {val.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones / How it Works timeline */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Our Impact So Far</h2>
            <p>A quick look at the milestones we have hit with our student community.</p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              textAlign: 'center'
            }}
            className="stats-grid"
          >
            <div className="card" style={{ padding: '2.5rem 1.5rem', border: '1px solid var(--border-color)', transform: 'none' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', display: 'block', marginBottom: '0.5rem' }}>
                50K+
              </span>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>Active Backpackers</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Students using our guides daily</p>
            </div>

            <div className="card" style={{ padding: '2.5rem 1.5rem', border: '1px solid var(--border-color)', transform: 'none' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--secondary)', display: 'block', marginBottom: '0.5rem' }}>
                150+
              </span>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>Hostels Partnered</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Offering exclusive student discounts</p>
            </div>

            <div className="card" style={{ padding: '2.5rem 1.5rem', border: '1px solid var(--border-color)', transform: 'none' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent)', display: 'block', marginBottom: '0.5rem' }}>
                30+
              </span>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>Countries Covered</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Fully-mapped budget locations</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-split {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;

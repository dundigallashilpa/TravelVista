import React, { useState } from 'react';
import { FiTrendingDown, FiCheckSquare, FiSquare, FiTruck, FiMap, FiAward } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import BudgetCalculator from '../components/BudgetCalculator';
import HostelCard from '../components/HostelCard';

const StudentTravel = () => {
  const { hostels, pageContents } = useData();
  // Interactive checklist state
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Apply for ISIC (International Student Identity Card) for global discounts", completed: false },
    { id: 2, text: "Search flights in incognito mode and set price alerts", completed: false },
    { id: 3, text: "Verify passport has at least 6 months validity from return date", completed: false },
    { id: 4, text: "Download offline Google Maps of the target city", completed: false },
    { id: 5, text: "Unlock phone and check eSIM options (e.g., Airalo) for cheap data", completed: false },
    { id: 6, text: "Copy emergency contact info and passport scans to Cloud storage", completed: false }
  ]);

  const toggleChecklistItem = (id) => {
    setChecklist(
      checklist.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const transportTips = [
    {
      title: "Flight Hacks",
      desc: "Use platforms like StudentUniverse, Google Flights, or Skyscanner. Select flexible dates and fly mid-week (Tuesdays/Wednesdays) to save up to 40% on standard flight prices.",
      icon: <FiTrendingDown size={24} />
    },
    {
      title: "Rail & Bus Passes",
      desc: "If traveling Europe, use Eurail. In Asia, use local rail apps (like Klook, RedBus). Booking sleeper buses/trains saves a full night of hostel payment.",
      icon: <FiMap size={24} />
    },
    {
      title: "Local Commute",
      desc: "Walk or rent a bicycle whenever possible. For longer city commutes, download local ride-hailing apps (Grab/Uber/Gojek) or buy daily subway transit cards.",
      icon: <FiTruck size={24} />
    }
  ];

  return (
    <div className="page fade-in">
      {/* Page Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
          padding: '4rem 0',
          color: 'white',
          textAlign: 'center',
          marginBottom: '3.5rem'
        }}
      >
        <div className="container">
          <h1 style={{ color: pageContents?.studentTravel?.headingColor || 'white', fontSize: `${pageContents?.studentTravel?.headingFontSize || '2.5'}rem`, marginBottom: '0.75rem', fontWeight: pageContents?.studentTravel?.headingFontWeight || '800', fontFamily: `'${pageContents?.studentTravel?.headingFontFamily || 'Outfit'}', sans-serif`, fontStyle: pageContents?.studentTravel?.headingFontStyle || 'normal', textTransform: pageContents?.studentTravel?.headingTextTransform || 'none', textDecoration: pageContents?.studentTravel?.headingTextDecoration || 'none', letterSpacing: `${pageContents?.studentTravel?.headingLetterSpacing ?? '-0.5'}px` }}>
            {pageContents?.studentTravel?.heading || "Student Travel Hub"}
          </h1>
          <p style={{ color: pageContents?.studentTravel?.subheadingColor || '#d1fae5', fontSize: `${pageContents?.studentTravel?.subheadingFontSize || '1.1'}rem`, maxWidth: '600px', marginInline: 'auto', fontFamily: `'${pageContents?.studentTravel?.subheadingFontFamily || 'Inter'}', sans-serif`, fontWeight: pageContents?.studentTravel?.subheadingFontWeight || '400', fontStyle: pageContents?.studentTravel?.subheadingFontStyle || 'normal', letterSpacing: `${pageContents?.studentTravel?.subheadingLetterSpacing ?? '0'}px` }}>
            {pageContents?.studentTravel?.subheading || "Maximize your experience while minimizing your expenses. Use our interactive budget calculator, browse hostels, and follow student travel hacks."}
          </p>
        </div>
      </div>

      {/* Budget Calculator Section */}
      <section style={{ padding: '0 0 4rem 0' }}>
        <div className="container">
          <div className="section-header">
            <h2>Interactive Trip Calculator</h2>
            <p>Customize your duration, stays, transit, and daily allowances to estimate your total costs instantly.</p>
          </div>
          <BudgetCalculator />
        </div>
      </section>

      {/* Checklist and Transport Section */}
      <section style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 0.9fr',
              gap: '3rem',
              alignItems: 'flex-start'
            }}
            className="student-hub-split"
          >
            {/* Checklist Column */}
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiCheckSquare style={{ color: 'var(--secondary)' }} /> Backpacker Checklist
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Make sure you check off these absolute must-haves before boarding your flight or train!
              </p>

              {/* Checklist Items list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {checklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'center',
                      padding: '1rem 1.25rem',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)',
                    }}
                    className="checklist-item-hover"
                  >
                    <span style={{ color: item.completed ? 'var(--secondary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                      {item.completed ? <FiCheckSquare size={22} /> : <FiSquare size={22} />}
                    </span>
                    <span
                      style={{
                        fontSize: '0.95rem',
                        color: item.completed ? 'var(--text-muted)' : 'var(--text-heading)',
                        textDecoration: item.completed ? 'line-through' : 'none',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport Column */}
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiTruck style={{ color: 'var(--primary)' }} /> Transport Hacks
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Transport is usually the single biggest expense. Use these tips to reduce your commuting budget.
              </p>

              {/* Transport Hack Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {transportTips.map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '1.25rem 1.5rem',
                      backgroundColor: 'var(--bg-main)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-heading)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--primary)' }}>{tip.icon}</span> {tip.title}
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {tip.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hostel Recommendations */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Recommended Hostels</h2>
            <p>Student-approved, highly social hostels featuring free amenities and prime central locations.</p>
          </div>

          <div className="grid-3" style={{ gap: '1.75rem' }}>
            {hostels.map((hostel) => (
              <HostelCard key={hostel.id} hostel={hostel} />
            ))}
          </div>
        </div>
      </section>

      {/* Global CSS checklist helper */}
      <style>{`
        .checklist-item-hover:hover {
          border-color: var(--secondary) !important;
          background-color: var(--secondary-light) !important;
        }
        @media (max-width: 900px) {
          .student-hub-split {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentTravel;

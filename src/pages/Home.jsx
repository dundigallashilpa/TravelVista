import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiCompass, FiMap, FiCamera, FiSun } from 'react-icons/fi';
import { useData } from '../context/DataContext';
import DestinationCard from '../components/DestinationCard';
import DestinationModal from '../components/DestinationModal';
import FAQAccordion from '../components/FAQAccordion';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Gallery from '../components/Gallery';

const Home = () => {
  const { destinations, faqs, testimonials, pageContents } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const navigate = useNavigate();

  // Get top 3 highly rated destinations for the featured section
  const featuredDestinations = [...destinations]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/destinations?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/destinations');
    }
  };

  const handleCategoryClick = (categoryName) => {
    navigate(`/destinations?type=${encodeURIComponent(categoryName)}`);
  };

  const categories = [
    { name: 'Adventure', icon: <FiCompass size={32} />, count: '2 Places', bg: 'badge-adventure' },
    { name: 'Nature', icon: <FiMap size={32} />, count: '2 Places', bg: 'badge-nature' },
    { name: 'Beach', icon: <FiSun size={32} />, count: '2 Places', bg: 'badge-beach' },
    { name: 'Heritage', icon: <FiCamera size={32} />, count: '2 Places', bg: 'badge-heritage' }
  ];

  return (
    <div className="page fade-in">
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '8rem 0 6rem 0',
          backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.8)), url("https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          minHeight: '85vh',
        }}
      >
        <div className="container" style={{ width: '100%' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h1
              style={{
                fontSize: `${pageContents?.home?.headingFontSize || '3.75'}rem`,
                color: pageContents?.home?.headingColor || 'white',
                lineHeight: 1.15,
                fontWeight: pageContents?.home?.headingFontWeight || '800',
                letterSpacing: `${pageContents?.home?.headingLetterSpacing ?? '-1'}px`,
                fontFamily: `'${pageContents?.home?.headingFontFamily || 'Outfit'}', sans-serif`,
                fontStyle: pageContents?.home?.headingFontStyle || 'normal',
                textTransform: pageContents?.home?.headingTextTransform || 'none',
                textDecoration: pageContents?.home?.headingTextDecoration || 'none',
              }}
            >
              {pageContents?.home?.heading || "Explore More, Spend Less."}
            </h1>
            <p
              style={{
                fontSize: `${pageContents?.home?.subheadingFontSize || '1.25'}rem`,
                color: pageContents?.home?.subheadingColor || '#e2e8f0',
                maxWidth: '620px',
                margin: '0 auto 1.5rem auto',
                lineHeight: 1.6,
                fontFamily: `'${pageContents?.home?.subheadingFontFamily || 'Inter'}', sans-serif`,
                fontWeight: pageContents?.home?.subheadingFontWeight || '400',
                fontStyle: pageContents?.home?.subheadingFontStyle || 'normal',
                letterSpacing: `${pageContents?.home?.subheadingLetterSpacing ?? '0'}px`,
              }}
            >
              {pageContents?.home?.subheading || "Your ultimate companion for budget-friendly student travel. Discover cheap destinations, reviews of local hostels, hidden spots, and travel hacks."}
            </p>

            {/* Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: 'flex',
                maxWidth: '650px',
                width: '100%',
                margin: '0 auto',
                backgroundColor: 'var(--bg-card)',
                padding: '0.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 15px 30px rgba(0,0,0,0.25)',
                border: '1px solid var(--border-color)',
                alignItems: 'center',
                gap: '0.5rem',
              }}
              className="hero-search-form"
            >
              <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', paddingLeft: '1rem', gap: '0.75rem' }}>
                <FiSearch style={{ color: 'var(--text-muted)' }} size={20} />
                <input
                  type="text"
                  placeholder="Where do you want to go next?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '1rem',
                    width: '100%',
                    color: 'var(--text-heading)'
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.75rem', borderRadius: 'var(--radius-md)' }}
              >
                Search
              </button>
            </form>

            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => navigate('/destinations')}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 2rem' }}
              >
                Explore Destinations
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Popular Categories</h2>
            <p>What kind of adventure are you looking for? Click to explore matching destinations.</p>
          </div>

          <div className="grid-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                onClick={() => handleCategoryClick(cat.name)}
                className="card"
                style={{
                  padding: '2rem 1.5rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div
                  style={{
                    backgroundColor: 'var(--primary-light)',
                    padding: '1rem',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)'
                  }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-heading)', marginBottom: '0.25rem' }}>
                    {cat.name}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Featured Destinations</h2>
            <p>Handpicked, high-value locations that will give you the trip of a lifetime on a budget.</p>
          </div>

          <div className="grid-3">
            {featuredDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onViewDetails={setSelectedDestination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Snapshots from the Road</h2>
            <p>Take a peek at real moments captured by student backpackers on their journeys.</p>
          </div>

          <Gallery />
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>What Student Travelers Say</h2>
            <p>Don't just take our word for it. Hear from students who traveled cheap using TravelVista.</p>
          </div>

          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Got questions about budget travel? We have answered all the student travel queries here.</p>
          </div>

          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* Newsletter Subscription Section */}
      <section>
        <div className="container">
          <Newsletter />
        </div>
      </section>

      {/* Detail Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .hero-search-form {
            flex-direction: column;
            padding: 0.75rem !important;
            border-radius: var(--radius-md) !important;
          }
          .hero-search-form input {
            padding: 0.5rem 0;
          }
          .hero-search-form button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

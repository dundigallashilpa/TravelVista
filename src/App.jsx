import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Layout and Utilities
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

// Pages
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import HiddenGems from './pages/HiddenGems';
import StudentTravel from './pages/StudentTravel';
import TravelTips from './pages/TravelTips';
import About from './pages/About';
import Contact from './pages/Contact';
import OwnerLogin from './pages/OwnerLogin';
import OwnerDashboard from './pages/OwnerDashboard';

// Scroll to top helper on route change
const ScrollToTopOnRoute = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="app-container">
      {/* Reset window scroll coordinates on route transitions */}
      <ScrollToTopOnRoute />

      {/* Sticky navigation header */}
      <Navbar />

      {/* Main Pages Content wrapper */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/hidden-gems" element={<HiddenGems />} />
          <Route path="/student-travel" element={<StudentTravel />} />
          <Route path="/travel-tips" element={<TravelTips />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/owner-login" element={<OwnerLogin />} />
          <Route path="/owner-dashboard" element={<OwnerDashboard />} />
          {/* Catch-all redirection to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Persistent global footer */}
      <Footer />

      {/* Floating Scroll to Top trigger */}
      <ScrollToTop />
    </div>
  );
}

export default App;

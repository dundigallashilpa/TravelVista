import React, { createContext, useState, useContext, useEffect } from 'react';
import { destinations as initialDestinations } from '../data/destinations';
import { hiddenGems as initialHiddenGems } from '../data/hiddenGems';
import { hostels as initialHostels } from '../data/hostels';
import { tips as initialTips } from '../data/tips';
import { faqs as initialFaqs } from '../data/faqs';
import { testimonials as initialTestimonials } from '../data/testimonials';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('travelvista_all_destinations');
    return saved ? JSON.parse(saved) : initialDestinations;
  });

  const [hiddenGems, setHiddenGems] = useState(() => {
    const saved = localStorage.getItem('travelvista_all_hidden_gems');
    return saved ? JSON.parse(saved) : initialHiddenGems;
  });

  const [hostels, setHostels] = useState(() => {
    const saved = localStorage.getItem('travelvista_all_hostels');
    return saved ? JSON.parse(saved) : initialHostels;
  });

  const [tips, setTips] = useState(() => {
    const saved = localStorage.getItem('travelvista_all_tips');
    return saved ? JSON.parse(saved) : initialTips;
  });

  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('travelvista_all_faqs');
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('travelvista_all_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // Site styling settings (default light/dark defaults will be overridden dynamically)
  const [siteStyles, setSiteStyles] = useState(() => {
    const saved = localStorage.getItem('travelvista_site_styles');
    return saved ? JSON.parse(saved) : {
      primaryColor: '#0ea5e9',
      headingColor: '',
      bodyColor: '',
      fontFamily: 'Outfit',
      bodyFontFamily: 'Inter',
      headingSizeScale: '1',
      bodySizeScale: '1'
    };
  });

  // Per-page editable content (headings, subtitles, mission text + typography styles)
  const defaultPageStyle = {
    headingColor: '#ffffff',
    headingFontFamily: 'Outfit',
    headingFontSize: '2.5',
    headingFontWeight: '800',
    headingLetterSpacing: '-0.5',
    headingFontStyle: 'normal',
    headingTextTransform: 'none',
    headingTextDecoration: 'none',
    subheadingColor: '',
    subheadingFontFamily: 'Inter',
    subheadingFontSize: '1.1',
    subheadingFontWeight: '400',
    subheadingLetterSpacing: '0',
    subheadingFontStyle: 'normal',
  };
  const defaultPageContents = {
    home: {
      heading: 'Explore More, Spend Less.',
      subheading: 'Your ultimate companion for budget-friendly student travel. Discover cheap destinations, reviews of local hostels, hidden spots, and travel hacks.',
      ...defaultPageStyle
    },
    destinations: {
      heading: 'Explore Destinations',
      subheading: 'Browse through student-approved travel locations. Filter by budget level, travel interest, or location to plan your next escape.',
      ...defaultPageStyle
    },
    hiddenGems: {
      heading: 'Off the Beaten Path',
      subheading: 'Escape the tourist traps. Explore quiet beaches, scenic valleys, mountain towns, and ancient fortresses with minimal crowds.',
      ...defaultPageStyle
    },
    studentTravel: {
      heading: 'Student Travel Hub',
      subheading: 'Maximize your experience while minimizing your expenses. Use our interactive budget calculator, browse hostels, and follow student travel hacks.',
      ...defaultPageStyle
    },
    tips: {
      heading: 'Travel Tips & Guides',
      subheading: 'Actionable advice curated by veteran backpackers. Explore how to pack light, stay safe, save money, and respect local cultures.',
      ...defaultPageStyle
    },
    about: {
      heading: 'Our Mission & Story',
      subheading: 'Learn why we started TravelVista and how we help thousands of college students embark on budget backpacking trips every year.',
      mission: 'TravelVista was founded in 2024 by a group of college students who were tired of seeing overpriced vacation packages. We realized that with the right hacks, shared accommodations, and local transit networks, international travel is fully reachable even on a part-time job budget.',
      ...defaultPageStyle
    },
    contact: {
      heading: 'Get in Touch',
      subheading: "Have questions about a destination or hostel? Want to contribute a travel hack? Send us a message and we'll reply shortly.",
      ...defaultPageStyle
    }
  };

  const [pageContents, setPageContents] = useState(() => {
    const saved = localStorage.getItem('travelvista_page_contents');
    return saved ? JSON.parse(saved) : defaultPageContents;
  });

  // Apply customizations dynamically via CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply primary colors
    if (siteStyles.primaryColor) {
      root.style.setProperty('--primary', siteStyles.primaryColor);
      root.style.setProperty('--primary-hover', siteStyles.primaryColor + 'dd'); // slight hover opacity
      root.style.setProperty('--primary-light', siteStyles.primaryColor + '1f'); // ~12% opacity
    }

    // Apply header text colors
    if (siteStyles.headingColor) {
      root.style.setProperty('--text-heading', siteStyles.headingColor);
    } else {
      root.style.removeProperty('--text-heading');
    }

    // Apply body description text colors
    if (siteStyles.bodyColor) {
      root.style.setProperty('--text-main', siteStyles.bodyColor);
      root.style.setProperty('--text-muted', siteStyles.bodyColor + 'cc'); // 80% opacity for muted look
    } else {
      root.style.removeProperty('--text-main');
      root.style.removeProperty('--text-muted');
    }

    // Apply custom font families
    if (siteStyles.fontFamily) {
      root.style.setProperty('--font-heading', `'${siteStyles.fontFamily}', sans-serif`);
    }
    if (siteStyles.bodyFontFamily) {
      root.style.setProperty('--font-body', `'${siteStyles.bodyFontFamily}', sans-serif`);
    }

    // Apply scale multiplier sizes
    if (siteStyles.headingSizeScale) {
      root.style.setProperty('--heading-size-scale', siteStyles.headingSizeScale);
    }
    if (siteStyles.bodySizeScale) {
      root.style.setProperty('--body-size-scale', siteStyles.bodySizeScale);
    }
  }, [siteStyles]);

  // Save utility wrappers
  const updateDestinations = (updated) => {
    setDestinations(updated);
    localStorage.setItem('travelvista_all_destinations', JSON.stringify(updated));
  };

  const updateHiddenGems = (updated) => {
    setHiddenGems(updated);
    localStorage.setItem('travelvista_all_hidden_gems', JSON.stringify(updated));
  };

  const updateHostels = (updated) => {
    setHostels(updated);
    localStorage.setItem('travelvista_all_hostels', JSON.stringify(updated));
  };

  const updateTips = (updated) => {
    setTips(updated);
    localStorage.setItem('travelvista_all_tips', JSON.stringify(updated));
  };

  const updateFaqs = (updated) => {
    setFaqs(updated);
    localStorage.setItem('travelvista_all_faqs', JSON.stringify(updated));
  };

  const updateTestimonials = (updated) => {
    setTestimonials(updated);
    localStorage.setItem('travelvista_all_testimonials', JSON.stringify(updated));
  };

  const updateSiteStyles = (updated) => {
    setSiteStyles(updated);
    localStorage.setItem('travelvista_site_styles', JSON.stringify(updated));
  };

  const updatePageContents = (updated) => {
    setPageContents(updated);
    localStorage.setItem('travelvista_page_contents', JSON.stringify(updated));
  };

  return (
    <DataContext.Provider
      value={{
        destinations,
        updateDestinations,
        hiddenGems,
        updateHiddenGems,
        hostels,
        updateHostels,
        tips,
        updateTips,
        faqs,
        updateFaqs,
        testimonials,
        updateTestimonials,
        siteStyles,
        updateSiteStyles,
        pageContents,
        updatePageContents
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import {
  FiLogOut, FiCompass, FiMap, FiHome, FiEdit, FiTrash2, FiPlus,
  FiCheckCircle, FiBookOpen, FiHelpCircle, FiMessageSquare, FiX, FiCheck
} from 'react-icons/fi';

const presetImages = {
  beach: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=400&q=80"
  ],
  mountain: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=400&q=80"
  ],
  adventure: [
    "https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1502126324834-38f8e02d7160?auto=format&fit=crop&w=400&q=80"
  ],
  heritage: [
    "https://images.unsplash.com/photo-1600100397608-f010e42ed9d4?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1545124430-c3c3a64041b3?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1477584322813-43726455703d?auto=format&fit=crop&w=400&q=80"
  ],
  hostel: [
    "https://images.unsplash.com/photo-1555854817-578637ad751f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1623718649591-311775a30c43?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
  ],
  avatar: [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  ],
  general: [
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=400&q=80"
  ]
};

const OwnerDashboard = () => {
  const { isOwner, logout } = useAuth();
  const navigate = useNavigate();
  
  // Site data states from context
  const {
    destinations, updateDestinations,
    hiddenGems, updateHiddenGems,
    hostels, updateHostels,
    tips, updateTips,
    faqs, updateFaqs,
    testimonials, updateTestimonials,
    siteStyles, updateSiteStyles,
    pageContents, updatePageContents
  } = useData();

  // Active section tab
  const [activeTab, setActiveTab] = useState('destinations');
  const [selectedPageKey, setSelectedPageKey] = useState('home');

  // Edit / Create States
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formData, setFormData] = useState({});

  // Image Manager states
  const [imageMode, setImageMode] = useState('url');
  const [imgSearchQuery, setImgSearchQuery] = useState('');
  const [imgSearchResults, setImgSearchResults] = useState([]);

  const performImageSearch = (query) => {
    const q = (query || '').toLowerCase();
    let results = [];
    
    if (q.includes('goa') || q.includes('beach') || q.includes('pondicherry') || q.includes('sea')) {
      results = presetImages.beach;
    } else if (q.includes('jaipur') || q.includes('heritage') || q.includes('hampi') || q.includes('palace') || q.includes('fort') || q.includes('temple')) {
      results = presetImages.heritage;
    } else if (q.includes('manali') || q.includes('mountain') || q.includes('spiti') || q.includes('hill') || q.includes('snow') || q.includes('valley')) {
      results = presetImages.mountain;
    } else if (q.includes('rishikesh') || q.includes('adventure') || q.includes('rafting') || q.includes('ziro') || q.includes('forest') || q.includes('nature') || q.includes('munnar') || q.includes('tea')) {
      results = presetImages.adventure;
    } else if (q.includes('hostel') || q.includes('moustache') || q.includes('zostel') || q.includes('stay') || q.includes('dorm') || q.includes('room')) {
      results = presetImages.hostel;
    } else if (activeTab === 'testimonials' || q.includes('avatar') || q.includes('person') || q.includes('student') || q.includes('review') || q.includes('user') || q.includes('profile')) {
      results = presetImages.avatar;
    } else {
      results = presetImages.general;
    }
    
    setImgSearchResults(results);
  };

  // Redirect if not owner
  useEffect(() => {
    if (!isOwner) {
      navigate('/owner-login');
    }
  }, [isOwner, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/owner-login');
  };

  // Helper: Open Edit Modal
  const openEditModal = (item) => {
    setEditingItem(item);
    setIsAddingNew(false);
    
    // Initialize image state
    setImageMode('url');
    const initialQuery = item.name || item.title || '';
    setImgSearchQuery(initialQuery);
    performImageSearch(initialQuery);
    
    // Prepare form fields depending on the tab
    if (activeTab === 'destinations') {
      setFormData({
        ...item,
        attractions: item.attractions ? item.attractions.join(', ') : '',
        itinerary: item.itinerary ? item.itinerary.join('\n') : ''
      });
    } else if (activeTab === 'hiddenGems') {
      setFormData({
        ...item,
        attractions: item.attractions ? item.attractions.join(', ') : '',
        foodRecommendations: item.foodRecommendations ? item.foodRecommendations.join(', ') : '',
        travelTips: item.travelTips ? item.travelTips.join(', ') : ''
      });
    } else if (activeTab === 'hostels') {
      setFormData({
        ...item,
        amenities: item.amenities ? item.amenities.join(', ') : ''
      });
    } else if (activeTab === 'tips') {
      setFormData({
        ...item,
        points: item.points ? item.points.join('\n') : ''
      });
    } else {
      setFormData({ ...item });
    }
  };

  // Helper: Open Add Modal
  const openAddModal = () => {
    setIsAddingNew(true);
    setEditingItem(null);
    
    // Initialize image state
    setImageMode('url');
    setImgSearchQuery('');
    performImageSearch('');
    
    // Empty form initialization
    if (activeTab === 'destinations') {
      setFormData({
        name: '', state: '', country: 'India', type: 'Adventure',
        budgetEstimate: 1500, bestSeason: '', description: '',
        detailedDescription: '', image: '', attractions: '', itinerary: ''
      });
    } else if (activeTab === 'hiddenGems') {
      setFormData({
        name: '', country: 'India', description: '', image: '',
        estimatedBudget: 1200, attractions: '', foodRecommendations: '', travelTips: ''
      });
    } else if (activeTab === 'hostels') {
      setFormData({
        name: '', location: '', price: 600, rating: 4.5,
        image: '', amenities: '', description: ''
      });
    } else if (activeTab === 'tips') {
      setFormData({
        title: '', category: 'Packing Tips', icon: 'FiPackage',
        summary: '', points: ''
      });
    } else if (activeTab === 'faqs') {
      setFormData({ question: '', answer: '' });
    } else if (activeTab === 'testimonials') {
      setFormData({
        name: '', role: '', rating: 5,
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
        review: ''
      });
    }
  };

  // Helper: Delete Item
  const handleDeleteItem = (id) => {
    if (!window.confirm("Are you sure you want to delete this item? This will immediately remove it from the live site.")) {
      return;
    }

    if (activeTab === 'destinations') {
      updateDestinations(destinations.filter(x => x.id !== id));
    } else if (activeTab === 'hiddenGems') {
      updateHiddenGems(hiddenGems.filter(x => x.id !== id));
    } else if (activeTab === 'hostels') {
      updateHostels(hostels.filter(x => x.id !== id));
    } else if (activeTab === 'tips') {
      updateTips(tips.filter(x => x.id !== id));
    } else if (activeTab === 'faqs') {
      updateFaqs(faqs.filter(x => x.id !== id));
    } else if (activeTab === 'testimonials') {
      updateTestimonials(testimonials.filter(x => x.id !== id));
    }
  };

  // Helper: Save Form data
  const handleSave = (e) => {
    e.preventDefault();

    // Process lists split by commas or newlines
    let processedData = { ...formData };
    
    if (activeTab === 'destinations') {
      processedData.budgetEstimate = Number(processedData.budgetEstimate);
      processedData.rating = Number(processedData.rating || 4.5);
      processedData.attractions = formData.attractions ? formData.attractions.split(',').map(x => x.trim()) : [];
      processedData.itinerary = formData.itinerary ? formData.itinerary.split('\n').map(x => x.trim()).filter(Boolean) : [];
    } else if (activeTab === 'hiddenGems') {
      processedData.estimatedBudget = Number(processedData.estimatedBudget);
      processedData.attractions = formData.attractions ? formData.attractions.split(',').map(x => x.trim()) : [];
      processedData.foodRecommendations = formData.foodRecommendations ? formData.foodRecommendations.split(',').map(x => x.trim()) : [];
      processedData.travelTips = formData.travelTips ? formData.travelTips.split(',').map(x => x.trim()) : [];
    } else if (activeTab === 'hostels') {
      processedData.price = Number(processedData.price);
      processedData.rating = Number(processedData.rating || 4.5);
      processedData.amenities = formData.amenities ? formData.amenities.split(',').map(x => x.trim()) : [];
    } else if (activeTab === 'tips') {
      processedData.points = formData.points ? formData.points.split('\n').map(x => x.trim()).filter(Boolean) : [];
      // Assign appropriate react icon class based on category
      if (processedData.category.toLowerCase().includes('packing')) processedData.icon = 'FiPackage';
      else if (processedData.category.toLowerCase().includes('safety')) processedData.icon = 'FiShield';
      else if (processedData.category.toLowerCase().includes('budget')) processedData.icon = 'FiTrendingDown';
      else if (processedData.category.toLowerCase().includes('season')) processedData.icon = 'FiSun';
      else processedData.icon = 'FiUsers';
    } else if (activeTab === 'testimonials') {
      processedData.rating = Number(processedData.rating);
    }

    if (isAddingNew) {
      // Create logic
      let currentList = [];
      if (activeTab === 'destinations') currentList = destinations;
      else if (activeTab === 'hiddenGems') currentList = hiddenGems;
      else if (activeTab === 'hostels') currentList = hostels;
      else if (activeTab === 'tips') currentList = tips;
      else if (activeTab === 'faqs') currentList = faqs;
      else if (activeTab === 'testimonials') currentList = testimonials;

      const newId = currentList.length > 0 ? Math.max(...currentList.map(x => x.id)) + 1 : 1;
      processedData.id = newId;
      const newList = [...currentList, processedData];

      if (activeTab === 'destinations') updateDestinations(newList);
      else if (activeTab === 'hiddenGems') updateHiddenGems(newList);
      else if (activeTab === 'hostels') updateHostels(newList);
      else if (activeTab === 'tips') updateTips(newList);
      else if (activeTab === 'faqs') updateFaqs(newList);
      else if (activeTab === 'testimonials') updateTestimonials(newList);
    } else {
      // Edit logic
      let currentList = [];
      if (activeTab === 'destinations') currentList = destinations;
      else if (activeTab === 'hiddenGems') currentList = hiddenGems;
      else if (activeTab === 'hostels') currentList = hostels;
      else if (activeTab === 'tips') currentList = tips;
      else if (activeTab === 'faqs') currentList = faqs;
      else if (activeTab === 'testimonials') currentList = testimonials;

      const newList = currentList.map(x => x.id === editingItem.id ? processedData : x);

      if (activeTab === 'destinations') updateDestinations(newList);
      else if (activeTab === 'hiddenGems') updateHiddenGems(newList);
      else if (activeTab === 'hostels') updateHostels(newList);
      else if (activeTab === 'tips') updateTips(newList);
      else if (activeTab === 'faqs') updateFaqs(newList);
      else if (activeTab === 'testimonials') updateTestimonials(newList);
    }

    // Reset modals
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleFieldChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const renderImageManager = (fieldName) => {
    const currentValue = formData[fieldName] || '';
    
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData(prev => ({ ...prev, [fieldName]: reader.result }));
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSelectSearchImage = (url) => {
      setFormData(prev => ({ ...prev, [fieldName]: url }));
    };

    return (
      <div style={{
        padding: '1.25rem',
        backgroundColor: 'var(--bg-main)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        marginBottom: '1rem',
        textAlign: 'left'
      }}>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.75rem', color: 'var(--text-heading)' }}>
          {fieldName === 'avatar' ? 'Profile Avatar Image Source' : 'Cover Image Source'}
        </label>
        
        {/* Toggle Mode Buttons */}
        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', backgroundColor: 'var(--bg-card)', padding: '0.2rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={() => setImageMode('url')}
            style={{
              flex: 1,
              padding: '0.45rem',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              backgroundColor: imageMode === 'url' ? 'var(--primary)' : 'transparent',
              color: imageMode === 'url' ? 'white' : 'var(--text-main)',
              transition: 'all var(--transition-fast)'
            }}
          >
            🌐 Paste URL
          </button>
          <button
            type="button"
            onClick={() => setImageMode('upload')}
            style={{
              flex: 1,
              padding: '0.45rem',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              backgroundColor: imageMode === 'upload' ? 'var(--primary)' : 'transparent',
              color: imageMode === 'upload' ? 'white' : 'var(--text-main)',
              transition: 'all var(--transition-fast)'
            }}
          >
            📤 Upload File
          </button>
          <button
            type="button"
            onClick={() => setImageMode('search')}
            style={{
              flex: 1,
              padding: '0.45rem',
              fontSize: '0.8rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              backgroundColor: imageMode === 'search' ? 'var(--primary)' : 'transparent',
              color: imageMode === 'search' ? 'white' : 'var(--text-main)',
              transition: 'all var(--transition-fast)'
            }}
          >
            🔍 Google Search
          </button>
        </div>

        {/* Tab Content */}
        {imageMode === 'url' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input
              type="text"
              name={fieldName}
              placeholder="Paste image web link (e.g. https://...)"
              value={currentValue.startsWith('data:') ? '' : currentValue}
              onChange={handleFieldChange}
              className="form-control"
              style={{ fontSize: '0.85rem' }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Provide any direct Unsplash or external image URL.
            </p>
          </div>
        )}

        {imageMode === 'upload' && (
          <div style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-card)',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>
              Drag & Drop or Click to Select File
            </p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Supports JPG, PNG, WEBP (Autoconverted to base64)
            </p>
          </div>
        )}

        {imageMode === 'search' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', padding: '0.25rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Search Google Images (e.g. Goa travel, Munnar hills...)"
                value={imgSearchQuery}
                onChange={(e) => setImgSearchQuery(e.target.value)}
                className="form-control"
                style={{ fontSize: '0.85rem', flexGrow: 1 }}
              />
              <button
                type="button"
                onClick={() => {
                  if (imgSearchQuery.trim()) {
                    window.open(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(imgSearchQuery)}`, '_blank');
                  }
                }}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                Search on Google ↗
              </button>
            </div>

            {/* Practical Guide / workflow tips for the user */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.85rem 1rem',
              fontSize: '0.825rem',
              color: 'var(--text-main)',
              lineHeight: 1.4
            }}>
              <strong style={{ color: 'var(--text-heading)', display: 'block', marginBottom: '0.35rem' }}>
                💡 How to link Google Images:
              </strong>
              <ol style={{ margin: 0, paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <li>Click <strong>"Search on Google"</strong> above (opens in Chrome).</li>
                <li>Find the image you like, right-click it, and select <strong>"Copy image address"</strong> (or "Copy link address").</li>
                <li>Switch back to this portal, go to the <strong>🌐 Paste URL</strong> tab above, and paste it.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Live Preview Box */}
        {currentValue && (
          <div style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
            marginTop: '1rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--border-color)'
          }}>
            <div style={{
              width: fieldName === 'avatar' ? '50px' : '80px',
              height: fieldName === 'avatar' ? '50px' : '50px',
              borderRadius: fieldName === 'avatar' ? '50%' : 'var(--radius-sm)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
              flexShrink: 0
            }}>
              <img
                src={currentValue}
                alt="Selected preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>
            <div style={{ textAlign: 'left', minWidth: 0, flexGrow: 1 }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block' }}>
                LIVE PREVIEW ACTIVE
              </span>
              <span style={{
                fontSize: '0.75rem',
                color: 'var(--text-main)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'block'
              }}>
                {currentValue.startsWith('data:') ? 'Uploaded local data (Base64)' : currentValue}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!isOwner) return null;

  return (
    <div className="page fade-in" style={{ padding: '3.5rem 0' }}>
      <div className="container">
        {/* Dashboard Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2.5rem',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '1.25rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem', textAlign: 'left' }}>
              Owner Control Center
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.975rem', textAlign: 'left' }}>
              Modify site sections, add new details, and update live data instantly.
            </p>
          </div>
          <button onClick={handleLogout} className="btn btn-outline" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', gap: '0.5rem' }}>
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Outer Split Layout: Sidebar and Main Content Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '250px 1fr',
            gap: '2.5rem',
            alignItems: 'flex-start'
          }}
          className="dashboard-layout"
        >
          {/* Left Column Sidebar */}
          <aside
            className="card"
            style={{
              padding: '1.5rem 1rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              textAlign: 'left'
            }}
          >
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', paddingLeft: '0.75rem', marginBottom: '1rem' }}>
              Site Sections
            </h3>

            {/* Sidebar Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <button
                onClick={() => setActiveTab('destinations')}
                className={`sidebar-tab ${activeTab === 'destinations' ? 'active' : ''}`}
              >
                <FiCompass /> Destinations
              </button>
              <button
                onClick={() => setActiveTab('hiddenGems')}
                className={`sidebar-tab ${activeTab === 'hiddenGems' ? 'active' : ''}`}
              >
                <FiMap /> Hidden Gems
              </button>
              <button
                onClick={() => setActiveTab('hostels')}
                className={`sidebar-tab ${activeTab === 'hostels' ? 'active' : ''}`}
              >
                <FiHome /> Hostels
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`sidebar-tab ${activeTab === 'tips' ? 'active' : ''}`}
              >
                <FiBookOpen /> Travel Tips
              </button>
              <button
                onClick={() => setActiveTab('faqs')}
                className={`sidebar-tab ${activeTab === 'faqs' ? 'active' : ''}`}
              >
                <FiHelpCircle /> FAQs
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`sidebar-tab ${activeTab === 'testimonials' ? 'active' : ''}`}
              >
                <FiMessageSquare /> Testimonials
              </button>
              <button
                onClick={() => setActiveTab('pages')}
                className={`sidebar-tab ${activeTab === 'pages' ? 'active' : ''}`}
              >
                <FiBookOpen /> Page Content
              </button>
              <button
                onClick={() => setActiveTab('theme')}
                className={`sidebar-tab ${activeTab === 'theme' ? 'active' : ''}`}
                style={{ borderTop: '1px solid var(--border-color)', borderRadius: 0, marginTop: '0.4rem', paddingTop: '0.8rem' }}
              >
                <FiEdit /> Customize Theme
              </button>
            </div>
          </aside>

          {/* Right Column Content Panel */}
          <main>
            {/* Active section information and creation trigger */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0, textTransform: 'capitalize' }}>
                {activeTab === 'hiddenGems' ? 'Hidden Gems' : activeTab === 'faqs' ? 'FAQs' : activeTab === 'theme' ? 'Global Theme Customizer' : activeTab === 'pages' ? 'Page Content Manager' : activeTab} Management
              </h2>
              {activeTab !== 'theme' && activeTab !== 'pages' && (
                <button onClick={openAddModal} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', gap: '0.35rem' }}>
                  <FiPlus /> Add New Item
                </button>
              )}
            </div>

            {/* Data Tables depending on tab */}
            <div
              className="card"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
                padding: '1.5rem',
                transform: 'none',
                overflowX: 'auto'
              }}
            >
              {/* Render Tab Table */}
              {activeTab === 'destinations' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Region/State</th>
                      <th>Daily Cost</th>
                      <th>Rating</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {destinations.map(item => (
                      <tr key={item.id} className="table-row-hover">
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.name}</td>
                        <td><span className="badge badge-nature">{item.type}</span></td>
                        <td>{item.state}</td>
                        <td style={{ fontWeight: 600 }}>₹{item.budgetEstimate}</td>
                        <td>★ {item.rating}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => openEditModal(item)} className="btn-table-edit" title="Edit"><FiEdit /></button>
                          <button onClick={() => handleDeleteItem(item.id)} className="btn-table-delete" title="Delete"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'hiddenGems' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Country</th>
                      <th>Est Budget</th>
                      <th>Attractions Count</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hiddenGems.map(item => (
                      <tr key={item.id} className="table-row-hover">
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.name}</td>
                        <td>{item.country}</td>
                        <td style={{ fontWeight: 600 }}>₹{item.estimatedBudget}</td>
                        <td>{item.attractions ? item.attractions.length : 0} spots</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => openEditModal(item)} className="btn-table-edit" title="Edit"><FiEdit /></button>
                          <button onClick={() => handleDeleteItem(item.id)} className="btn-table-delete" title="Delete"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'hostels' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Hostel Name</th>
                      <th>Location</th>
                      <th>Price/Night</th>
                      <th>Rating</th>
                      <th>Amenities</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hostels.map(item => (
                      <tr key={item.id} className="table-row-hover">
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.name}</td>
                        <td>{item.location}</td>
                        <td style={{ fontWeight: 600, color: 'var(--secondary)' }}>₹{item.price}</td>
                        <td>★ {item.rating}</td>
                        <td>{item.amenities ? item.amenities.length : 0} features</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => openEditModal(item)} className="btn-table-edit" title="Edit"><FiEdit /></button>
                          <button onClick={() => handleDeleteItem(item.id)} className="btn-table-delete" title="Delete"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'tips' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Tips Count</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tips.map(item => (
                      <tr key={item.id} className="table-row-hover">
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.points ? item.points.length : 0} items</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => openEditModal(item)} className="btn-table-edit" title="Edit"><FiEdit /></button>
                          <button onClick={() => handleDeleteItem(item.id)} className="btn-table-delete" title="Delete"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'faqs' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Question</th>
                      <th style={{ width: '45%' }}>Answer</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faqs.map(item => (
                      <tr key={item.id} className="table-row-hover">
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.question}</td>
                        <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>{item.answer}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => openEditModal(item)} className="btn-table-edit" title="Edit"><FiEdit /></button>
                          <button onClick={() => handleDeleteItem(item.id)} className="btn-table-delete" title="Delete"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activeTab === 'testimonials' && (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Role/University</th>
                      <th>Rating</th>
                      <th style={{ width: '40%' }}>Review</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map(item => (
                      <tr key={item.id} className="table-row-hover">
                        <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{item.name}</td>
                        <td>{item.role}</td>
                        <td>{item.rating} ★</td>
                        <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '250px' }}>{item.review}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => openEditModal(item)} className="btn-table-edit" title="Edit"><FiEdit /></button>
                          <button onClick={() => handleDeleteItem(item.id)} className="btn-table-delete" title="Delete"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Render Page Content Editor Tab */}
              {activeTab === 'pages' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', margin: 0 }}>
                    Select any page below to customize its main header titles and descriptions dynamically. Click and type inside fields to save immediately.
                  </p>

                  {/* Sub-selector tabs */}
                  <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.25rem', borderBottom: '1px solid var(--border-color)' }}>
                    {['home', 'destinations', 'hiddenGems', 'studentTravel', 'tips', 'about', 'contact'].map((pk) => (
                      <button
                        key={pk}
                        type="button"
                        onClick={() => setSelectedPageKey(pk)}
                        style={{
                          padding: '0.45rem 1.15rem',
                          fontSize: '0.825rem',
                          fontWeight: 600,
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-color)',
                          backgroundColor: selectedPageKey === pk ? 'var(--primary)' : 'var(--bg-main)',
                          color: selectedPageKey === pk ? 'white' : 'var(--text-main)',
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                          whiteSpace: 'nowrap',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        {pk === 'hiddenGems' ? 'Hidden Gems' : pk === 'studentTravel' ? 'Student Hub' : pk === 'tips' ? 'Travel Tips' : pk}
                      </button>
                    ))}
                  </div>

                  {/* Rich Editor Form */}
                  {(() => {
                    const pc = pageContents[selectedPageKey] || {};
                    const upd = (field, val) => {
                      const updated = { ...pageContents };
                      updated[selectedPageKey] = { ...updated[selectedPageKey], [field]: val };
                      updatePageContents(updated);
                    };
                    const FONTS = ['Outfit', 'Inter', 'Roboto', 'Montserrat', 'Playfair Display', 'Georgia', 'Courier New', 'Arial'];
                    const WEIGHTS = [{ label: 'Thin (300)', v: '300' }, { label: 'Regular (400)', v: '400' }, { label: 'Medium (500)', v: '500' }, { label: 'Semi-Bold (600)', v: '600' }, { label: 'Bold (700)', v: '700' }, { label: 'Extra-Bold (800)', v: '800' }];

                    return (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="page-editor-grid">

                        {/* ── LEFT COLUMN: Controls ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                          {/* ─ Heading Text ─ */}
                          <fieldset style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
                            <legend style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)', padding: '0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Heading</legend>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>

                              <div className="form-group" style={{ margin: 0 }}>
                                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Text</label>
                                <input type="text" value={pc.heading || ''} onChange={e => upd('heading', e.target.value)} className="form-control" />
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Color</label>
                                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input type="color" value={pc.headingColor || '#ffffff'} onChange={e => upd('headingColor', e.target.value)} style={{ width: '38px', height: '36px', padding: 0, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} />
                                    <input type="text" value={pc.headingColor || '#ffffff'} onChange={e => upd('headingColor', e.target.value)} className="form-control" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }} />
                                  </div>
                                </div>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Font Family</label>
                                  <select value={pc.headingFontFamily || 'Outfit'} onChange={e => upd('headingFontFamily', e.target.value)} className="form-control">
                                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                                  </select>
                                </div>
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Font Weight</label>
                                  <select value={pc.headingFontWeight || '800'} onChange={e => upd('headingFontWeight', e.target.value)} className="form-control">
                                    {WEIGHTS.map(w => <option key={w.v} value={w.v}>{w.label}</option>)}
                                  </select>
                                </div>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Font Style</label>
                                  <select value={pc.headingFontStyle || 'normal'} onChange={e => upd('headingFontStyle', e.target.value)} className="form-control">
                                    <option value="normal">Normal</option>
                                    <option value="italic">Italic</option>
                                    <option value="oblique">Oblique</option>
                                  </select>
                                </div>
                              </div>

                              <div className="form-group" style={{ margin: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                  <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Font Size</label>
                                  <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.8rem' }}>{pc.headingFontSize || '2.5'}rem</span>
                                </div>
                                <input type="range" min="1" max="5" step="0.1" value={pc.headingFontSize || '2.5'} onChange={e => upd('headingFontSize', e.target.value)} style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }} />
                              </div>

                              <div className="form-group" style={{ margin: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                  <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Letter Spacing</label>
                                  <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.8rem' }}>{pc.headingLetterSpacing || '-0.5'}px</span>
                                </div>
                                <input type="range" min="-5" max="15" step="0.5" value={pc.headingLetterSpacing || '-0.5'} onChange={e => upd('headingLetterSpacing', e.target.value)} style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }} />
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Text Transform</label>
                                  <select value={pc.headingTextTransform || 'none'} onChange={e => upd('headingTextTransform', e.target.value)} className="form-control">
                                    <option value="none">None</option>
                                    <option value="uppercase">UPPERCASE</option>
                                    <option value="lowercase">lowercase</option>
                                    <option value="capitalize">Capitalize</option>
                                  </select>
                                </div>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Text Decoration</label>
                                  <select value={pc.headingTextDecoration || 'none'} onChange={e => upd('headingTextDecoration', e.target.value)} className="form-control">
                                    <option value="none">None</option>
                                    <option value="underline">Underline</option>
                                    <option value="overline">Overline</option>
                                    <option value="line-through">Strikethrough</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </fieldset>

                          {/* ─ Subheading Text ─ */}
                          <fieldset style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
                            <legend style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--secondary)', padding: '0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subtitle / Description</legend>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>

                              <div className="form-group" style={{ margin: 0 }}>
                                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Text</label>
                                <textarea value={pc.subheading || ''} onChange={e => upd('subheading', e.target.value)} className="form-control" rows="3" />
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Color</label>
                                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <input type="color" value={pc.subheadingColor || '#cbd5e1'} onChange={e => upd('subheadingColor', e.target.value)} style={{ width: '38px', height: '36px', padding: 0, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }} />
                                    <input type="text" value={pc.subheadingColor || '#cbd5e1'} onChange={e => upd('subheadingColor', e.target.value)} className="form-control" style={{ fontFamily: 'monospace', fontSize: '0.8rem' }} />
                                  </div>
                                </div>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Font Family</label>
                                  <select value={pc.subheadingFontFamily || 'Inter'} onChange={e => upd('subheadingFontFamily', e.target.value)} className="form-control">
                                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                                  </select>
                                </div>
                              </div>

                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Font Weight</label>
                                  <select value={pc.subheadingFontWeight || '400'} onChange={e => upd('subheadingFontWeight', e.target.value)} className="form-control">
                                    {WEIGHTS.map(w => <option key={w.v} value={w.v}>{w.label}</option>)}
                                  </select>
                                </div>
                                <div className="form-group" style={{ margin: 0 }}>
                                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Font Style</label>
                                  <select value={pc.subheadingFontStyle || 'normal'} onChange={e => upd('subheadingFontStyle', e.target.value)} className="form-control">
                                    <option value="normal">Normal</option>
                                    <option value="italic">Italic</option>
                                    <option value="oblique">Oblique</option>
                                  </select>
                                </div>
                              </div>

                              <div className="form-group" style={{ margin: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                  <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Font Size</label>
                                  <span style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '0.8rem' }}>{pc.subheadingFontSize || '1.1'}rem</span>
                                </div>
                                <input type="range" min="0.7" max="2.5" step="0.05" value={pc.subheadingFontSize || '1.1'} onChange={e => upd('subheadingFontSize', e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)', cursor: 'pointer' }} />
                              </div>

                              <div className="form-group" style={{ margin: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                  <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Letter Spacing</label>
                                  <span style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '0.8rem' }}>{pc.subheadingLetterSpacing || '0'}px</span>
                                </div>
                                <input type="range" min="-2" max="10" step="0.5" value={pc.subheadingLetterSpacing || '0'} onChange={e => upd('subheadingLetterSpacing', e.target.value)} style={{ width: '100%', accentColor: 'var(--secondary)', cursor: 'pointer' }} />
                              </div>
                            </div>
                          </fieldset>

                          {/* ─ About Mission (only for About page) ─ */}
                          {selectedPageKey === 'about' && (
                            <fieldset style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
                              <legend style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent)', padding: '0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Mission Statement</legend>
                              <div className="form-group" style={{ margin: 0 }}>
                                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.3rem', fontSize: '0.85rem' }}>Text</label>
                                <textarea value={pc.mission || ''} onChange={e => upd('mission', e.target.value)} className="form-control" rows="4" />
                              </div>
                            </fieldset>
                          )}

                          {/* ─ Reset button ─ */}
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Reset all styles for "${selectedPageKey}" page to defaults?`)) {
                                const updated = { ...pageContents };
                                updated[selectedPageKey] = {
                                  heading: pageContents[selectedPageKey]?.heading,
                                  subheading: pageContents[selectedPageKey]?.subheading,
                                  ...(selectedPageKey === 'about' ? { mission: pageContents.about?.mission } : {}),
                                  headingColor: '#ffffff', headingFontFamily: 'Outfit', headingFontSize: '2.5',
                                  headingFontWeight: '800', headingLetterSpacing: '-0.5', headingFontStyle: 'normal',
                                  headingTextTransform: 'none', headingTextDecoration: 'none',
                                  subheadingColor: '', subheadingFontFamily: 'Inter', subheadingFontSize: '1.1',
                                  subheadingFontWeight: '400', subheadingLetterSpacing: '0', subheadingFontStyle: 'normal'
                                };
                                updatePageContents(updated);
                              }
                            }}
                            className="btn btn-outline"
                            style={{ alignSelf: 'flex-start', fontSize: '0.8rem', padding: '0.4rem 1rem' }}
                          >
                            Reset Page Styles
                          </button>
                        </div>

                        {/* ── RIGHT COLUMN: Live Preview ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: '1rem' }}>
                          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-heading)', margin: 0 }}>Live Banner Preview</h3>
                          <div
                            style={{
                              padding: '3rem 1.5rem',
                              background: selectedPageKey === 'home'
                                ? 'linear-gradient(rgba(15,23,42,0.7),rgba(15,23,42,0.8)),url("https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80")'
                                : selectedPageKey === 'destinations'
                                ? 'linear-gradient(135deg,var(--primary) 0%,#1e40af 100%)'
                                : selectedPageKey === 'hiddenGems'
                                ? 'linear-gradient(135deg,var(--secondary) 0%,#065f46 100%)'
                                : selectedPageKey === 'studentTravel'
                                ? 'linear-gradient(135deg,#10b981 0%,#047857 100%)'
                                : selectedPageKey === 'tips'
                                ? 'linear-gradient(135deg,#1e3a8a 0%,#1e40af 100%)'
                                : selectedPageKey === 'contact'
                                ? 'linear-gradient(135deg,var(--primary) 0%,#1e40af 100%)'
                                : 'linear-gradient(135deg,#1e293b 0%,#0f172a 100%)',
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              borderRadius: 'var(--radius-md)',
                              textAlign: 'center',
                              boxShadow: 'var(--shadow-md)',
                              minHeight: '200px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '0.75rem'
                            }}
                          >
                            <h1
                              style={{
                                color: pc.headingColor || '#ffffff',
                                fontFamily: `'${pc.headingFontFamily || 'Outfit'}', sans-serif`,
                                fontSize: `${pc.headingFontSize || '2.5'}rem`,
                                fontWeight: pc.headingFontWeight || '800',
                                letterSpacing: `${pc.headingLetterSpacing || '-0.5'}px`,
                                fontStyle: pc.headingFontStyle || 'normal',
                                textTransform: pc.headingTextTransform || 'none',
                                textDecoration: pc.headingTextDecoration || 'none',
                                margin: 0,
                                lineHeight: 1.2
                              }}
                            >
                              {pc.heading || '—'}
                            </h1>
                            <p
                              style={{
                                color: pc.subheadingColor || '#cbd5e1',
                                fontFamily: `'${pc.subheadingFontFamily || 'Inter'}', sans-serif`,
                                fontSize: `${pc.subheadingFontSize || '1.1'}rem`,
                                fontWeight: pc.subheadingFontWeight || '400',
                                letterSpacing: `${pc.subheadingLetterSpacing || '0'}px`,
                                fontStyle: pc.subheadingFontStyle || 'normal',
                                margin: 0,
                                maxWidth: '520px',
                                lineHeight: 1.6
                              }}
                            >
                              {pc.subheading || '—'}
                            </p>
                          </div>

                          {/* Quick-style presets */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>Quick Presets</p>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                              {[
                                { label: '🎯 Bold', hW: '900', hS: '3', hT: 'uppercase', hLS: '2', hFS: 'normal' },
                                { label: '✍️ Elegant', hF: 'Playfair Display', hW: '700', hS: '2.5', hFS: 'italic', hLS: '1' },
                                { label: '⚡ Modern', hF: 'Montserrat', hW: '800', hS: '2.8', hT: 'capitalize', hLS: '-1' },
                                { label: '📰 Classic', hF: 'Georgia', hW: '700', hS: '2.2', hFS: 'normal', hLS: '0' },
                              ].map(p => (
                                <button
                                  key={p.label}
                                  type="button"
                                  onClick={() => {
                                    const updated = { ...pageContents };
                                    updated[selectedPageKey] = {
                                      ...updated[selectedPageKey],
                                      headingFontFamily: p.hF || pc.headingFontFamily,
                                      headingFontWeight: p.hW || pc.headingFontWeight,
                                      headingFontSize: p.hS || pc.headingFontSize,
                                      headingFontStyle: p.hFS || 'normal',
                                      headingTextTransform: p.hT || 'none',
                                      headingLetterSpacing: p.hLS || '0'
                                    };
                                    updatePageContents(updated);
                                  }}
                                  style={{
                                    padding: '0.3rem 0.75rem',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    borderRadius: 'var(--radius-sm)',
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: 'var(--bg-main)',
                                    color: 'var(--text-main)',
                                    cursor: 'pointer',
                                    transition: 'all var(--transition-fast)'
                                  }}
                                >
                                  {p.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                </div>
              )}

              {/* Render Theme Customizer Tab */}
              {activeTab === 'theme' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'left' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', margin: 0 }}>
                    Customize the styling properties of the website. Adjust primary accents, text colors, select fonts, and adjust the font size scale factor. Edits will sync and apply to all customers' views instantly.
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '2.5rem'
                  }} className="theme-customizer-grid">
                    
                    {/* Controls Panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0 }}>
                        Color & Typography Settings
                      </h3>
                      
                      {/* Primary Color */}
                      <div className="form-group">
                        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Primary Accent Color</label>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <input
                            type="color"
                            value={siteStyles.primaryColor || '#0ea5e9'}
                            onChange={(e) => updateSiteStyles({ ...siteStyles, primaryColor: e.target.value })}
                            style={{ width: '45px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                          />
                          <input
                            type="text"
                            value={siteStyles.primaryColor || '#0ea5e9'}
                            onChange={(e) => updateSiteStyles({ ...siteStyles, primaryColor: e.target.value })}
                            className="form-control"
                            style={{ flexGrow: 1, fontFamily: 'monospace' }}
                          />
                        </div>
                      </div>

                      {/* Text Heading Color */}
                      <div className="form-group">
                        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Heading Text Color</label>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <input
                            type="color"
                            value={siteStyles.headingColor || '#0f172a'}
                            onChange={(e) => updateSiteStyles({ ...siteStyles, headingColor: e.target.value })}
                            style={{ width: '45px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                          />
                          <input
                            type="text"
                            value={siteStyles.headingColor || '#0f172a'}
                            onChange={(e) => updateSiteStyles({ ...siteStyles, headingColor: e.target.value })}
                            className="form-control"
                            style={{ flexGrow: 1, fontFamily: 'monospace' }}
                          />
                        </div>
                      </div>

                      {/* Text Body Color */}
                      <div className="form-group">
                        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Description & Body Text Color</label>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                          <input
                            type="color"
                            value={siteStyles.bodyColor || '#475569'}
                            onChange={(e) => updateSiteStyles({ ...siteStyles, bodyColor: e.target.value })}
                            style={{ width: '45px', height: '40px', padding: '0', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}
                          />
                          <input
                            type="text"
                            value={siteStyles.bodyColor || '#475569'}
                            onChange={(e) => updateSiteStyles({ ...siteStyles, bodyColor: e.target.value })}
                            className="form-control"
                            style={{ flexGrow: 1, fontFamily: 'monospace' }}
                          />
                        </div>
                      </div>

                      {/* Heading Font Family */}
                      <div className="form-group">
                        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Heading Font Style</label>
                        <select
                          value={siteStyles.fontFamily || 'Outfit'}
                          onChange={(e) => updateSiteStyles({ ...siteStyles, fontFamily: e.target.value })}
                          className="form-control"
                        >
                          <option value="Outfit">Outfit (Default Modern)</option>
                          <option value="Inter">Inter (Sleek Geometric)</option>
                          <option value="Roboto">Roboto (Clean Neo-grotesque)</option>
                          <option value="Georgia">Georgia (Classic Serif)</option>
                          <option value="Playfair Display">Playfair Display (Premium Elegant)</option>
                          <option value="Montserrat">Montserrat (Geometric Pro)</option>
                        </select>
                      </div>

                      {/* Body Font Family */}
                      <div className="form-group">
                        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>Body & Paragraph Font Style</label>
                        <select
                          value={siteStyles.bodyFontFamily || 'Inter'}
                          onChange={(e) => updateSiteStyles({ ...siteStyles, bodyFontFamily: e.target.value })}
                          className="form-control"
                        >
                          <option value="Inter">Inter (Default Geometric)</option>
                          <option value="Roboto">Roboto (Highly Readable)</option>
                          <option value="Arial">Arial (Standard Sans-Serif)</option>
                          <option value="Georgia">Georgia (Serif Body)</option>
                          <option value="Courier New">Courier New (Monospace Style)</option>
                        </select>
                      </div>
                    </div>

                    {/* Sizing & Live Preview Panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--text-heading)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', margin: 0 }}>
                        Font Sizing Scales
                      </h3>

                      {/* Heading Font Size Scale */}
                      <div className="form-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <label style={{ fontWeight: 600 }}>Heading Font Size Scale</label>
                          <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>{siteStyles.headingSizeScale || '1'}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.8"
                          max="1.5"
                          step="0.05"
                          value={siteStyles.headingSizeScale || '1'}
                          onChange={(e) => updateSiteStyles({ ...siteStyles, headingSizeScale: e.target.value })}
                          style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        />
                      </div>

                      {/* Body Font Size Scale */}
                      <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                          <label style={{ fontWeight: 600 }}>Body & Description Size Scale</label>
                          <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.85rem' }}>{siteStyles.bodySizeScale || '1'}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.8"
                          max="1.3"
                          step="0.05"
                          value={siteStyles.bodySizeScale || '1'}
                          onChange={(e) => updateSiteStyles({ ...siteStyles, bodySizeScale: e.target.value })}
                          style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
                        />
                      </div>

                      {/* Live Customer-View Simulator Card */}
                      <div
                        style={{
                          padding: '1.5rem',
                          backgroundColor: 'var(--bg-main)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          textAlign: 'left',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>
                          Live Customer View Simulator
                        </span>

                        <h2 style={{ margin: 0, fontSize: '1.5rem' }}>
                          Escape the Tourist Traps
                        </h2>
                        
                        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                          Escape the tourist traps. Explore quiet beaches, scenic valleys, mountain towns, and ancient fortresses with minimal crowds. Maximize your experience while minimizing your expenses.
                        </p>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <button type="button" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                            Explore Places
                          </button>
                          <button type="button" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                            Calculate Budget
                          </button>
                        </div>
                      </div>

                      {/* Reset Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("Are you sure you want to reset all site styles to default settings?")) {
                            updateSiteStyles({
                              primaryColor: '#0ea5e9',
                              headingColor: '',
                              bodyColor: '',
                              fontFamily: 'Outfit',
                              bodyFontFamily: 'Inter',
                              headingSizeScale: '1',
                              bodySizeScale: '1'
                            });
                          }
                        }}
                        className="btn btn-outline"
                        style={{ alignSelf: 'flex-start', marginTop: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                      >
                        Reset Styling Defaults
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* CRUD Form overlay Modal */}
      {(editingItem !== null || isAddingNew) && (
        <div
          onClick={() => { setEditingItem(null); setIsAddingNew(false); }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease-out'
          }}
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="card"
            style={{
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transform: 'none'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)' }}>
                {isAddingNew ? 'Create New Item' : `Edit: ${editingItem.name || editingItem.title || 'Item'}`}
              </h3>
              <button
                onClick={() => { setEditingItem(null); setIsAddingNew(false); }}
                className="btn-icon-only"
                style={{ borderRadius: '50%' }}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Form Scroll Area */}
            <form onSubmit={handleSave} style={{ overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
              
              {/* Form Fields: Destinations */}
              {activeTab === 'destinations' && (
                <>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-name">Destination Name</label>
                      <input id="field-name" type="text" name="name" required value={formData.name || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field-state">State / Region</label>
                      <input id="field-state" type="text" name="state" required value={formData.state || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-country">Country</label>
                      <input id="field-country" type="text" name="country" required value={formData.country || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field-type">Travel Type</label>
                      <select id="field-type" name="type" value={formData.type || 'Adventure'} onChange={handleFieldChange} className="form-control">
                        <option value="Adventure">Adventure</option>
                        <option value="Nature">Nature</option>
                        <option value="Beach">Beach</option>
                        <option value="Heritage">Heritage</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-budgetEstimate">Daily Budget Estimate (INR)</label>
                      <input id="field-budgetEstimate" type="number" name="budgetEstimate" required value={formData.budgetEstimate || 0} onChange={handleFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field-bestSeason">Best Season to Visit</label>
                      <input id="field-bestSeason" type="text" name="bestSeason" required value={formData.bestSeason || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                  </div>
                  {renderImageManager('image')}
                  <div className="form-group">
                    <label htmlFor="field-description">Short Description</label>
                    <textarea id="field-description" name="description" rows="2" required value={formData.description || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-detailedDescription">Detailed Overview</label>
                    <textarea id="field-detailedDescription" name="detailedDescription" rows="3" required value={formData.detailedDescription || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-attractions">Attractions (separated by commas)</label>
                    <input id="field-attractions" type="text" name="attractions" placeholder="e.g. Amer Fort, Hawa Mahal" value={formData.attractions || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-itinerary">Recommended Itinerary (separated by newlines)</label>
                    <textarea id="field-itinerary" name="itinerary" rows="3" placeholder="Day 1: Arrive and relax&#10;Day 2: City tour" value={formData.itinerary || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                </>
              )}

              {/* Form Fields: Hidden Gems */}
              {activeTab === 'hiddenGems' && (
                <>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-gem-name">Gem Name</label>
                      <input id="field-gem-name" type="text" name="name" required value={formData.name || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field-gem-country">Country</label>
                      <input id="field-gem-country" type="text" name="country" required value={formData.country || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-gem-budget">Est. Daily Budget (INR)</label>
                      <input id="field-gem-budget" type="number" name="estimatedBudget" required value={formData.estimatedBudget || 0} onChange={handleFieldChange} className="form-control" />
                    </div>
                    {renderImageManager('image')}
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-gem-desc">Description</label>
                    <textarea id="field-gem-desc" name="description" rows="3" required value={formData.description || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-gem-attr">Attractions (separated by commas)</label>
                    <input id="field-gem-attr" type="text" name="attractions" placeholder="Om Beach, Half Moon Beach" value={formData.attractions || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-gem-food">Local Food Hacks (separated by commas)</label>
                    <input id="field-gem-food" type="text" name="foodRecommendations" placeholder="Nutella pancakes, seafood thali" value={formData.foodRecommendations || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-gem-tips">Travel Tips (separated by commas)</label>
                    <input id="field-gem-tips" type="text" name="travelTips" placeholder="Rent a scooter, stay in shacks" value={formData.travelTips || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                </>
              )}

              {/* Form Fields: Hostels */}
              {activeTab === 'hostels' && (
                <>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-hostel-name">Hostel Name</label>
                      <input id="field-hostel-name" type="text" name="name" required value={formData.name || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field-hostel-location">Location</label>
                      <input id="field-hostel-location" type="text" name="location" required value={formData.location || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-hostel-price">Price/Night (INR)</label>
                      <input id="field-hostel-price" type="number" name="price" required value={formData.price || 0} onChange={handleFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field-hostel-rating">User Rating (1.0 to 5.0)</label>
                      <input id="field-hostel-rating" type="number" step="0.1" name="rating" required value={formData.rating || 4.5} onChange={handleFieldChange} className="form-control" />
                    </div>
                  </div>
                  {renderImageManager('image')}
                  <div className="form-group">
                    <label htmlFor="field-hostel-desc">Description</label>
                    <textarea id="field-hostel-desc" name="description" rows="3" required value={formData.description || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-hostel-amenities">Amenities (separated by commas)</label>
                    <input id="field-hostel-amenities" type="text" name="amenities" placeholder="Free Wi-Fi, Pool, Cafe" value={formData.amenities || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                </>
              )}

              {/* Form Fields: Travel Tips */}
              {activeTab === 'tips' && (
                <>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-tip-title">Article Title</label>
                      <input id="field-tip-title" type="text" name="title" required value={formData.title || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field-tip-category">Category</label>
                      <select id="field-tip-category" name="category" value={formData.category || 'Packing Tips'} onChange={handleFieldChange} className="form-control">
                        <option value="Packing Tips">Packing Tips</option>
                        <option value="Safety Tips">Safety Tips</option>
                        <option value="Budget-saving Tips">Budget-saving Tips</option>
                        <option value="Best Travel Seasons">Best Travel Seasons</option>
                        <option value="Local Etiquette">Local Etiquette</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-tip-summary">Summary</label>
                    <textarea id="field-tip-summary" name="summary" rows="3" required value={formData.summary || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-tip-points">Action Checklists (separated by newlines)</label>
                    <textarea id="field-tip-points" name="points" rows="5" placeholder="Roll clothes instead of fold&#10;Bring microfiber towel" value={formData.points || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                </>
              )}

              {/* Form Fields: FAQs */}
              {activeTab === 'faqs' && (
                <>
                  <div className="form-group">
                    <label htmlFor="field-faq-q">Question</label>
                    <textarea id="field-faq-q" name="question" rows="2" required value={formData.question || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-faq-a">Answer</label>
                    <textarea id="field-faq-a" name="answer" rows="4" required value={formData.answer || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                </>
              )}

              {/* Form Fields: Testimonials */}
              {activeTab === 'testimonials' && (
                <>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-test-name">Reviewer Name</label>
                      <input id="field-test-name" type="text" name="name" required value={formData.name || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="field-test-role">Role / University</label>
                      <input id="field-test-role" type="text" name="role" required value={formData.role || ''} onChange={handleFieldChange} className="form-control" />
                    </div>
                  </div>
                  <div className="grid-2" style={{ gap: '1rem' }}>
                    <div className="form-group">
                      <label htmlFor="field-test-rating">Rating (1 to 5 Stars)</label>
                      <select id="field-test-rating" name="rating" value={formData.rating || 5} onChange={handleFieldChange} className="form-control">
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                      </select>
                    </div>
                    {renderImageManager('avatar')}
                  </div>
                  <div className="form-group">
                    <label htmlFor="field-test-review">Review Comment</label>
                    <textarea id="field-test-review" name="review" rows="4" required value={formData.review || ''} onChange={handleFieldChange} className="form-control" />
                  </div>
                </>
              )}

              {/* Action Buttons Row */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
                <button type="submit" className="btn btn-primary" style={{ flexGrow: 1, padding: '0.85rem' }}>
                  <FiCheck /> Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => { setEditingItem(null); setIsAddingNew(false); }}
                  className="btn btn-outline"
                  style={{ flexGrow: 1, padding: '0.85rem' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Internal Custom Admin CSS definitions */}
      <style>{`
        .sidebar-tab {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          font-weight: 600;
          color: var(--text-main);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .sidebar-tab:hover {
          background-color: var(--primary-light);
          color: var(--primary);
        }
        .sidebar-tab.active {
          background-color: var(--primary);
          color: white;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }
        .admin-table th {
          padding: 0.85rem 0.5rem;
          border-bottom: 2px solid var(--border-color);
          font-weight: 700;
          color: var(--text-heading);
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .admin-table td {
          padding: 1rem 0.5rem;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-main);
          font-size: 0.925rem;
          vertical-align: middle;
        }
        
        .btn-table-edit, .btn-table-delete {
          background: transparent;
          border: 1px solid var(--border-color);
          cursor: pointer;
          padding: 0.4rem;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.4rem;
          transition: all var(--transition-fast);
        }
        .btn-table-edit {
          color: var(--primary);
        }
        .btn-table-edit:hover {
          background-color: var(--primary-light);
          border-color: var(--primary);
        }
        .btn-table-delete {
          color: #ef4444;
        }
        .btn-table-delete:hover {
          background-color: #fee2e2;
          border-color: #ef4444;
        }

        @media (max-width: 900px) {
          .dashboard-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .theme-customizer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .page-editor-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OwnerDashboard;

import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiCompass, FiInfo } from 'react-icons/fi';

const BudgetCalculator = () => {
  const [duration, setDuration] = useState(7);
  const [accommodation, setAccommodation] = useState('hostel'); // hostel (600), budgetHotel (2500), free (0)
  const [food, setFood] = useState(800);
  const [transport, setTransport] = useState('bus'); // walking (100), bus (300), scooter (800), taxi (2000)
  const [misc, setMisc] = useState(300);
  const [totalCost, setTotalCost] = useState(0);

  // Accomodation costs per day in INR
  const accommodationRates = {
    free: 0,
    hostel: 600,
    budgetHotel: 2500
  };

  // Transport costs per day in INR
  const transportRates = {
    walking: 100,
    bus: 300,
    scooter: 800,
    taxi: 2000
  };

  useEffect(() => {
    const accCost = accommodationRates[accommodation];
    const transCost = transportRates[transport];
    const dailyTotal = accCost + transCost + Number(food) + Number(misc);
    setTotalCost(dailyTotal * duration);
  }, [duration, accommodation, food, transport, misc]);

  // Suggest destinations based on daily average cost in INR
  const getSuggestions = () => {
    const dailyAverage = totalCost / duration;
    if (dailyAverage <= 1800) {
      return {
        tier: "Shoestring Budget",
        color: "var(--secondary)",
        description: "You're living like a local! These Indian destinations are incredibly budget-friendly and offer a full experience on minimal costs.",
        places: ["Hampi (Karnataka)", "Rishikesh (Uttarakhand)", "Alleppey (Kerala)"]
      };
    } else if (dailyAverage <= 3500) {
      return {
        tier: "Mid-Range Budget",
        color: "var(--primary)",
        description: "Great balance! You can enjoy cozy stays, beautiful cafes, scooter rentals, and amazing adventures without stressing.",
        places: ["Munnar (Kerala)", "Pondicherry", "Gokarna (Karnataka)", "Mawlynnong (Meghalaya)"]
      };
    } else {
      return {
        tier: "Premium Budget",
        color: "var(--accent)",
        description: "Comfort travel! You can check out heritage hotels, adventure sports, premium cottages, and top-tier guides.",
        places: ["Goa", "Manali (Himachal Pradesh)", "Spiti Valley (Himachal)", "Ziro Valley (Arunachal)"]
      };
    }
  };

  const suggestion = getSuggestions();
  const dailyAverage = totalCost / duration || 0;

  // Breakdown percentages for progress bars
  const accCostTotal = accommodationRates[accommodation] * duration;
  const foodCostTotal = food * duration;
  const transCostTotal = transportRates[transport] * duration;
  const miscCostTotal = misc * duration;

  const getPercent = (value) => {
    if (totalCost === 0) return 0;
    return Math.round((value / totalCost) * 100);
  };

  return (
    <div
      className="card"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        transform: 'none',
        gap: 0,
      }}
      className="calculator-container"
    >
      {/* Inputs Section */}
      <div
        style={{
          padding: '2.5rem 2rem',
          backgroundColor: 'var(--bg-card)',
          borderRight: '1px solid var(--border-color)',
          textAlign: 'left'
        }}
        className="calculator-inputs"
      >
        <h4
          style={{
            fontSize: '1.25rem',
            marginBottom: '1.5rem',
            color: 'var(--text-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FiDollarSign style={{ color: 'var(--primary)' }} /> Estimate Trip Expenses
        </h4>

        {/* Trip Duration */}
        <div className="form-group">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Trip Duration:</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{duration} Days</span>
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
        </div>

        {/* Accommodation Choice */}
        <div className="form-group">
          <label htmlFor="calc-accommodation">Accommodation Type:</label>
          <select
            id="calc-accommodation"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
            className="form-control"
            style={{ cursor: 'pointer' }}
          >
            <option value="free">Couchsurfing / Homestays (₹0/day)</option>
            <option value="hostel">Hostel Shared Dorm (~₹600/day)</option>
            <option value="budgetHotel">Budget Hotel Room (~₹2,500/day)</option>
          </select>
        </div>

        {/* Daily Food Budget */}
        <div className="form-group">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Daily Food Budget:</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{food} / day</span>
          </label>
          <input
            type="range"
            min="200"
            max="5000"
            step="100"
            value={food}
            onChange={(e) => setFood(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
            <FiInfo /> Local street eats: ₹200-400/day, cafes: ₹800-1500/day.
          </span>
        </div>

        {/* Transport Mode */}
        <div className="form-group">
          <label htmlFor="calc-transport">Transport Mode:</label>
          <select
            id="calc-transport"
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
            className="form-control"
            style={{ cursor: 'pointer' }}
          >
            <option value="walking">Walk / Bicycle (~₹100/day)</option>
            <option value="bus">Local Bus / Metro (~₹300/day)</option>
            <option value="scooter">Scooter Rental (~₹800/day)</option>
            <option value="taxi">Taxi / Cabs (~₹2,000/day)</option>
          </select>
        </div>

        {/* Misc Daily Expenses */}
        <div className="form-group">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Misc & Shopping Budget:</span>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{misc} / day</span>
          </label>
          <input
            type="range"
            min="0"
            max="3000"
            step="100"
            value={misc}
            onChange={(e) => setMisc(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Outputs Section */}
      <div
        style={{
          padding: '2.5rem 2rem',
          backgroundColor: 'var(--primary-light)',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        className="calculator-outputs"
      >
        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-heading)' }}>
            Cost Breakdown & Estimate
          </h4>

          {/* Total Cost Display */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Estimated Total Cost
            </span>
            <span style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--text-heading)', display: 'block', lineHeight: 1.1 }}>
              ₹{totalCost.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginTop: '0.25rem', display: 'block' }}>
              Average of <strong>₹{dailyAverage.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</strong> per day
            </span>
          </div>

          {/* Breakdown Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {/* Accommodation */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Accommodation (₹{accCostTotal.toLocaleString('en-IN')})</span>
                <span style={{ fontWeight: 600 }}>{getPercent(accCostTotal)}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${getPercent(accCostTotal)}%`, backgroundColor: 'var(--primary)' }} />
              </div>
            </div>

            {/* Food */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Food (₹{foodCostTotal.toLocaleString('en-IN')})</span>
                <span style={{ fontWeight: 600 }}>{getPercent(foodCostTotal)}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${getPercent(foodCostTotal)}%`, backgroundColor: 'var(--secondary)' }} />
              </div>
            </div>

            {/* Transport */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Transport (₹{transCostTotal.toLocaleString('en-IN')})</span>
                <span style={{ fontWeight: 600 }}>{getPercent(transCostTotal)}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${getPercent(transCostTotal)}%`, backgroundColor: 'var(--accent)' }} />
              </div>
            </div>

            {/* Misc */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.2rem' }}>
                <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Misc & Tips (₹{miscCostTotal.toLocaleString('en-IN')})</span>
                <span style={{ fontWeight: 600 }}>{getPercent(miscCostTotal)}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${getPercent(miscCostTotal)}%`, backgroundColor: '#a855f7' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            borderLeft: `5px solid ${suggestion.color}`,
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <h5 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-heading)', marginBottom: '0.5rem' }}>
            <FiCompass style={{ color: suggestion.color }} /> {suggestion.tier} Suggestions:
          </h5>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            {suggestion.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {suggestion.places.map((place, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.15rem 0.5rem',
                  backgroundColor: 'var(--bg-main)',
                  color: 'var(--text-heading)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 500,
                  border: '1px solid var(--border-color)'
                }}
              >
                {place}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .calculator-container {
            grid-template-columns: 1fr !important;
          }
          .calculator-inputs {
            border-right: none !important;
            border-bottom: 1px solid var(--border-color);
          }
        }
      `}</style>
    </div>
  );
};

export default BudgetCalculator;

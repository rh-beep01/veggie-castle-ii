import React from 'react';
import { Flame, Sparkles, Clock, ShieldCheck, ArrowRight, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Hero({ onExploreMenu, onOpenReservation }) {
  return (
    <section className="hero-section" id="hero">
      <div className="hero-backdrop">
        <img 
          src="/images/hero-feast.jpg" 
          alt="Veggie Castle II Queens Feast" 
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-tag-wrapper">
            <span className="badge badge-gold">
              <Sparkles size={14} /> South Richmond Hill's Premier Protein Plate House
            </span>
            <span className="hero-address-badge">
              {RESTAURANT_INFO.address}
            </span>
          </div>

          <h1 className="hero-title">
            Bubbling Silken Protein Plate & <span className="hero-title-highlight">Sizzling LA Jerk Vegan Chicken</span>
          </h1>

          <p className="hero-description">
            Handcrafted Korean comfort food prepared with 24-hour slow-simmered broths, premium soft silken tofu, and flame-charred Korean BBQ short ribs. Served piping hot in authentic earthenware stone pots with generous house sides.
          </p>

          <div className="hero-cta-group">
            <button 
              className="btn-primary hero-btn-main"
              onClick={onExploreMenu}
              id="hero-order-direct-button"
            >
              <Flame size={18} /> Order Direct (0% Fees) <ArrowRight size={16} />
            </button>
            <button 
              className="btn-secondary hero-btn-sec"
              onClick={onOpenReservation}
              id="hero-reserve-table-button"
            >
              <Utensils size={18} /> Reserve a Table
            </button>
          </div>

          {/* Quick value trust badges */}
          <div className="hero-trust-bar">
            <div className="trust-item">
              <ShieldCheck size={18} className="trust-icon" />
              <div>
                <strong>0% Delivery App Fees</strong>
                <span>Support our local family kitchen</span>
              </div>
            </div>
            <div className="trust-item">
              <Clock size={18} className="trust-icon" />
              <div>
                <strong>Curbside Ready in 15–20 Mins</strong>
                <span>Fast pickup on 8th St</span>
              </div>
            </div>
            <div className="trust-item">
              <Flame size={18} className="trust-icon" />
              <div>
                <strong>Authentic Stone Pots</strong>
                <span>Boiling hot to the last spoonful</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

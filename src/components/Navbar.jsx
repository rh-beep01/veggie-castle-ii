import React, { useState, useEffect } from 'react';
import { Phone, ShoppingBag, MapPin, Menu as MenuIcon, X } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Navbar({ cartCount, cartTotal, onOpenCart, onOpenReservation }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top utility bar */}
      <div className="navbar-top-banner">
        <div className="container top-banner-content">
          <div className="banner-left">
            <span className="banner-pill">0% Fee Direct Online Ordering</span>
            <span className="banner-text">100% Plant-Based Caribbean Comfort & Cold-Pressed Juices</span>
          </div>
          <div className="banner-right">
            <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="banner-link">
              <Phone size={13} /> {RESTAURANT_INFO.phone}
            </a>
            <span className="banner-sep">?</span>
            <span className="banner-link">
              <MapPin size={13} /> {RESTAURANT_INFO.neighborhood}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="navbar-main">
        <div className="container navbar-container">
          {/* Logo */}
          <a href="#" className="brand-logo" id="nav-brand-logo">
            <div className="seal-badge">
              <span className="seal-korean">100% VEGAN</span>
            </div>
            <div className="brand-text">
              <span className="brand-title">{RESTAURANT_INFO.name}</span>
              <span className="brand-sub">South Richmond Hill ? Queens, NY</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <a href="#featured" className="nav-link">Featured Feast</a>
            <a href="#menu" className="nav-link">Grill & Plates</a>
            <a href="#menu" className="nav-link">Juice Cures</a>
            <a href="#heritage" className="nav-link">Our Heritage</a>
            <a href="#location" className="nav-link">Location & Hours</a>
          </nav>

          {/* Action buttons */}
          <div className="nav-actions">
            <button 
              className="btn-secondary nav-reserve-btn"
              onClick={onOpenReservation}
              id="nav-reserve-button"
            >
              Reserve Table
            </button>

            <button 
              className="nav-cart-btn"
              onClick={onOpenCart}
              id="nav-cart-button"
              aria-label="View shopping cart"
            >
              <div className="cart-icon-wrapper">
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="cart-badge-count">{cartCount}</span>}
              </div>
              <span className="cart-btn-text">
                {cartTotal > 0 ? `$${cartTotal.toFixed(2)}` : 'Cart'}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <a href="#featured" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Featured Feast</a>
          <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Grill Menu & Burgers</a>
          <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Protein Plates & Sides</a>
          <a href="#menu" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Fresh Cold-Pressed Juices</a>
          <a href="#heritage" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Our Ital Heritage</a>
          <a href="#location" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">Location & Hours</a>
          <div className="mobile-nav-cta">
            <button 
              className="btn-primary" 
              onClick={() => { setMobileMenuOpen(false); onOpenReservation(); }}
              style={{ width: '100%', marginBottom: '10px' }}
            >
              Reserve a Table
            </button>
            <a 
              href={`tel:${RESTAURANT_INFO.phoneRaw}`} 
              className="btn-secondary" 
              style={{ width: '100%', textAlign: 'center' }}
            >
              Call {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

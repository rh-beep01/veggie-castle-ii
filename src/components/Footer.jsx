import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="seal-badge-footer">
            <span>100% VEGAN</span>
          </div>
          <h3>{RESTAURANT_INFO.name}</h3>
          <p>{RESTAURANT_INFO.tagline}</p>
          <span className="footer-address">{RESTAURANT_INFO.address}</span>
        </div>

        <div className="footer-links-group">
          <h4>Navigation</h4>
          <a href="#hero">Home</a>
          <a href="#featured">Featured Specials</a>
          <a href="#menu">Full Menu</a>
          <a href="#heritage">Ital Heritage</a>
          <a href="#location">Location & Hours</a>
        </div>

        <div className="footer-direct-banner">
          <h4>Direct 0% Commission Guarantee</h4>
          <p>
            When you order direct through this website, 100% of your money supports our vegan kitchen, local farmers, and staff without third-party commission markups.
          </p>
          <div className="footer-phone">
            Call for Takeout: <a href={`tel:${RESTAURANT_INFO.phoneRaw}`}>{RESTAURANT_INFO.phone}</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-row">
          <span>? {new Date().getFullYear()} Veggie Castle II. All rights reserved.</span>
          <span>100% Vegan Caribbean Comfort Food ? 132-09 Liberty Ave, South Richmond Hill, NY</span>
        </div>
      </div>
    </footer>
  );
}

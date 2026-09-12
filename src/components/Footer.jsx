import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="seal-badge-footer">
            <span>{RESTAURANT_INFO.koreanName}</span>
          </div>
          <h3>{RESTAURANT_INFO.name}</h3>
          <p>{RESTAURANT_INFO.tagline}</p>
          <span className="footer-address">{RESTAURANT_INFO.address}</span>
        </div>

        <div className="footer-links-group">
          <h4>Navigation</h4>
          <a href="#hero">Home</a>
          <a href="#combos">Combos (콤보)</a>
          <a href="#menu">Soon Tofu (순두부)</a>
          <a href="#story">Our Story</a>
          <a href="#location">Location & Hours</a>
        </div>

        <div className="footer-direct-banner">
          <h4>Direct 0% Commission Guarantee</h4>
          <p>
            When you order direct through this website, 100% of your money supports our chefs, staff, and local ingredients without third-party delivery commissions.
          </p>
          <div className="footer-phone">
            Call for Takeout: <a href={`tel:${RESTAURANT_INFO.phoneRaw}`}>{RESTAURANT_INFO.phone}</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-row">
          <span>© {new Date().getFullYear()} Tofu Chon (두부촌). All rights reserved.</span>
          <span>Authentic Koreatown Korean Cuisine • 3526 W 8th St, Los Angeles, CA</span>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';
import { MapPin, Phone, Clock, Instagram, Navigation, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function LocationHoursSection() {
  return (
    <section className="location-section section-padding" id="location">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-red">Visit Us</span>
          <h2 className="section-title">Location & Hours</h2>
          <p className="section-subtitle">
            Located at 132-09 Liberty Ave in South Richmond Hill, Queens. Dine-in, take-out, and local delivery available.
          </p>
        </div>

        <div className="location-card-grid">
          {/* Info Card */}
          <div className="location-info-card">
            <div className="loc-info-header">
              <span className="loc-korean">{RESTAURANT_INFO.koreanName}</span>
              <h3>Veggie Castle II Queens</h3>
              <p className="loc-address">
                <MapPin size={18} className="text-red" /> {RESTAURANT_INFO.address}
              </p>
            </div>

            <div className="loc-details-list">
              <div className="loc-detail-row">
                <Clock size={20} className="loc-icon" />
                <div>
                  <strong>Hours of Operation</strong>
                  {RESTAURANT_INFO.hours.map((h, i) => (
                    <div key={i} className="hour-sub">{h.days}: {h.time}</div>
                  ))}
                </div>
              </div>

              <div className="loc-detail-row">
                <Phone size={20} className="loc-icon" />
                <div>
                  <strong>Direct Phone Line</strong>
                  <div>
                    <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="text-gold font-bold">
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="loc-detail-row">
                <Instagram size={20} className="loc-icon" />
                <div>
                  <strong>Instagram</strong>
                  <div>
                    <a href={RESTAURANT_INFO.instagramUrl} target="_blank" rel="noreferrer" className="text-gold">
                      {RESTAURANT_INFO.instagram}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="loc-actions">
              <a 
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold loc-directions-btn"
              >
                <Navigation size={18} /> Open in Google Maps
              </a>
              <a 
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="btn-secondary loc-call-btn"
              >
                <Phone size={18} /> Call Store
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Card */}
          <div className="map-visual-card">
            <iframe 
              title="Veggie Castle II Location"
              src="https://maps.google.com/maps?q=3526%20W%208th%20St,%20Los%20Angeles,%20CA%2090005&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="map-iframe"
              loading="lazy"
            ></iframe>
            <div className="map-card-footer">
              <ShieldCheck size={16} className="text-green" />
              <span>Easy street parking & dedicated plaza parking lot accessible from 8th St.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

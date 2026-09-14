import React from 'react';
import { Flame, Star, Plus } from 'lucide-react';
import { MENU_ITEMS } from '../data/menuData';

export default function CombosSpotlight({ onSelectItem }) {
  const combos = MENU_ITEMS.filter(item => item.category === 'combos').slice(0, 4);

  return (
    <section className="combos-section section-padding" id="combos">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-red">
            <Flame size={14} /> Signature Combinations
          </span>
          <h2 className="section-title">Best of Both Worlds: Protein Plate + BBQ Combos</h2>
          <p className="section-subtitle">
            Every combo includes your choice of freshly bubbling Protein Plate stew, tender BBQ meats or fried yellow croaker, steamed rice, and full seasonal sides.
          </p>
        </div>

        <div className="combos-grid">
          {combos.map((combo) => (
            <div key={combo.id} className="combo-card">
              <div className="combo-card-image-wrap">
                <img 
                  src={combo.image} 
                  alt={combo.name} 
                  className="combo-card-img"
                  loading="lazy"
                />
                {combo.badge && (
                  <span className="combo-card-badge badge-gold">
                    <Star size={12} /> {combo.badge}
                  </span>
                )}
                <div className="combo-card-price-tag">
                  ${combo.price.toFixed(2)}
                </div>
              </div>

              <div className="combo-card-body">
                <div className="combo-card-header">
                  <span className="korean-sub">{combo.koreanName}</span>
                  <h3 className="combo-card-title">{combo.name}</h3>
                </div>
                <p className="combo-card-desc">{combo.description}</p>
                
                <div className="combo-card-footer">
                  <span className="combo-includes">Includes Protein Plate + Meat + Rice + Sides</span>
                  <button 
                    className="btn-primary combo-add-btn"
                    onClick={() => onSelectItem(combo)}
                    id={`customize-combo-${combo.id}`}
                  >
                    <Plus size={16} /> Customize & Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

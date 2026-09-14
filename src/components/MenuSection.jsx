import React, { useState } from 'react';
import { Search, Plus, Sparkles, Flame, Check } from 'lucide-react';
import { MENU_ITEMS, CATEGORIES } from '../data/menuData';

export default function MenuSection({ onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.koreanName.includes(searchQuery) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="menu-section section-padding" id="menu">
      <div className="container">
        <div className="section-header">
          <span className="badge badge-gold">
            <Sparkles size={14} /> Authentic South Richmond Hill Menu
          </span>
          <h2 className="section-title">Explore Our Full Menu</h2>
          <p className="section-subtitle">
            All prices match our in-restaurant menu board. Direct online ordering with 0% platform markups.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="menu-filter-bar">
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                id={`cat-btn-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input 
              type="text"
              placeholder="Search dishes (e.g. Jerk Vegan Chicken, Protein Plate, Pancake)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
              id="menu-search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="menu-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="menu-item-card">
              <div className="item-card-image-wrap">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="item-card-img"
                  loading="lazy"
                />
                {item.badge && (
                  <span className="item-badge">{item.badge}</span>
                )}
              </div>

              <div className="item-card-content">
                <div className="item-card-header">
                  <div>
                    <span className="item-korean">{item.koreanName}</span>
                    <h3 className="item-title">{item.name}</h3>
                  </div>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                </div>

                <p className="item-desc">{item.description}</p>

                <div className="item-card-actions">
                  {item.hasSpiceLevel ? (
                    <span className="item-modifier-hint">🌶️ Customizable Spice Level</span>
                  ) : (
                    <span className="item-modifier-hint">✨ Freshly Prepared</span>
                  )}
                  
                  <button 
                    className="item-add-btn"
                    onClick={() => onSelectItem(item)}
                    id={`add-item-${item.id}`}
                  >
                    <Plus size={16} /> Add to Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="no-items-placeholder">
            <p>No dishes found matching "{searchQuery}".</p>
            <button className="btn-secondary" onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

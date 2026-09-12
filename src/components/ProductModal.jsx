import React, { useState } from 'react';
import { X, Plus, Minus, Check, Flame, ShoppingBag } from 'lucide-react';
import { SPICE_LEVELS } from '../data/menuData';

export default function ProductModal({ item, onClose, onAddToCart }) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSpice, setSelectedSpice] = useState(SPICE_LEVELS[1].id); // Default Medium
  const [eggOption, setEggOption] = useState('with-egg');
  const [riceOption, setRiceOption] = useState('white-rice');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const handleAdd = () => {
    const customizedItem = {
      ...item,
      customOptions: {
        spiceLevel: item.hasSpiceLevel ? SPICE_LEVELS.find(s => s.id === selectedSpice)?.name : null,
        egg: item.hasSpiceLevel ? (eggOption === 'with-egg' ? 'Fresh Raw Egg Included' : 'No Egg') : null,
        rice: riceOption === 'purple-rice' ? 'Purple Multigrain Rice (+$1.00)' : 'Steamed White Rice',
        instructions: specialInstructions.trim() || null
      },
      itemTotalPrice: item.price + (riceOption === 'purple-rice' ? 1.00 : 0.00),
      quantity
    };
    onAddToCart(customizedItem);
    onClose();
  };

  const calculatedTotal = (item.price + (riceOption === 'purple-rice' ? 1.00 : 0.00)) * quantity;

  return (
    <div className="modal-backdrop animate-fade" onClick={onClose}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()} id="product-customize-modal">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-image-header">
          <img src={item.image} alt={item.name} className="modal-header-img" />
          <div className="modal-image-overlay">
            <span className="modal-korean">{item.koreanName}</span>
            <h2 className="modal-title">{item.name}</h2>
            <span className="modal-price">${item.price.toFixed(2)}</span>
          </div>
        </div>

        <div className="modal-scroll-body">
          <p className="modal-desc">{item.description}</p>

          {/* Spice Level Selector */}
          {item.hasSpiceLevel && (
            <div className="modal-option-group">
              <label className="option-group-label">
                <Flame size={16} className="text-red" /> Choose Your Spice Level <span className="required-tag">*Required</span>
              </label>
              <div className="spice-level-options">
                {SPICE_LEVELS.map((spice) => (
                  <button
                    key={spice.id}
                    type="button"
                    className={`spice-option-card ${selectedSpice === spice.id ? 'active' : ''}`}
                    onClick={() => setSelectedSpice(spice.id)}
                  >
                    <div className="spice-header">
                      <span className="spice-name">{spice.name}</span>
                      {selectedSpice === spice.id && <Check size={16} className="check-icon" />}
                    </div>
                    <span className="spice-desc">{spice.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Egg Preference for Soon Tofu */}
          {item.hasSpiceLevel && (
            <div className="modal-option-group">
              <label className="option-group-label">Egg Preference</label>
              <div className="radio-group">
                <label className={`radio-pill ${eggOption === 'with-egg' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="eggOption" 
                    checked={eggOption === 'with-egg'} 
                    onChange={() => setEggOption('with-egg')}
                  />
                  <span>Fresh Raw Egg (Crack into boiling stew) - Free</span>
                </label>
                <label className={`radio-pill ${eggOption === 'no-egg' ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="eggOption" 
                    checked={eggOption === 'no-egg'} 
                    onChange={() => setEggOption('no-egg')}
                  />
                  <span>No Egg</span>
                </label>
              </div>
            </div>
          )}

          {/* Rice Option */}
          <div className="modal-option-group">
            <label className="option-group-label">Rice Selection</label>
            <div className="radio-group">
              <label className={`radio-pill ${riceOption === 'white-rice' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="riceOption" 
                  checked={riceOption === 'white-rice'} 
                  onChange={() => setRiceOption('white-rice')}
                />
                <span>Steamed White Rice (Included)</span>
              </label>
              <label className={`radio-pill ${riceOption === 'purple-rice' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="riceOption" 
                  checked={riceOption === 'purple-rice'} 
                  onChange={() => setRiceOption('purple-rice')}
                />
                <span>Healthy Purple Multigrain Rice (+$1.00)</span>
              </label>
            </div>
          </div>

          {/* Special Requests */}
          <div className="modal-option-group">
            <label className="option-group-label">Kitchen Notes / Special Requests</label>
            <textarea
              className="modal-textarea"
              placeholder="E.g. Extra scallions, dressing on the side, allergies..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={2}
            ></textarea>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="quantity-stepper">
            <button 
              className="stepper-btn"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="stepper-count">{quantity}</span>
            <button 
              className="stepper-btn"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus size={16} />
            </button>
          </div>

          <button 
            className="btn-primary modal-add-btn"
            onClick={handleAdd}
            id="modal-confirm-add-button"
          >
            <ShoppingBag size={18} /> Add {quantity} to Order • ${calculatedTotal.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}

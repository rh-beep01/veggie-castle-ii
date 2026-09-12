import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onProceedCheckout }) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.itemTotalPrice * item.quantity), 0);
  const tax = subtotal * 0.095; // LA 9.5% sales tax
  const total = subtotal + tax;

  // Approximate third party delivery fee savings
  const thirdPartyFeesSaved = subtotal > 0 ? (subtotal * 0.25).toFixed(2) : '0.00';

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer animate-fade" onClick={(e) => e.stopPropagation()} id="cart-drawer-panel">
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <ShoppingBag size={20} className="text-red" />
            <h2 className="drawer-title">Your Order ({cart.length})</h2>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* 0% Commission Callout */}
        <div className="cart-savings-banner">
          <Sparkles size={18} className="savings-icon" />
          <div className="savings-text">
            <strong>You're saving ~${thirdPartyFeesSaved}</strong> in DoorDash/UberEats app commission fees by ordering directly with us!
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} className="empty-icon" />
              <h3>Your cart is empty</h3>
              <p>Explore our Koreatown Soon Tofu stews and sizzling BBQ combos to add your favorite dishes.</p>
              <button className="btn-primary" onClick={onClose} style={{ marginTop: '16px' }}>
                Browse Full Menu
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-thumbnail" />
                  <div className="cart-item-details">
                    <div className="cart-item-title-row">
                      <h4 className="cart-item-name">{item.name}</h4>
                      <span className="cart-item-price">
                        ${(item.itemTotalPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {item.customOptions && (
                      <div className="cart-item-options">
                        {item.customOptions.spiceLevel && (
                          <span className="cart-opt-tag">🌶️ {item.customOptions.spiceLevel}</span>
                        )}
                        {item.customOptions.egg && (
                          <span className="cart-opt-tag">🥚 {item.customOptions.egg}</span>
                        )}
                        {item.customOptions.rice && (
                          <span className="cart-opt-tag">🍚 {item.customOptions.rice}</span>
                        )}
                        {item.customOptions.instructions && (
                          <span className="cart-opt-note">Note: "{item.customOptions.instructions}"</span>
                        )}
                      </div>
                    )}

                    <div className="cart-item-controls">
                      <div className="mini-stepper">
                        <button 
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(index, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>

                      <button 
                        className="cart-remove-btn"
                        onClick={() => onRemoveItem(index)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Summary */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated LA Tax (9.5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row highlight">
              <span>Platform Service Fee</span>
              <span className="text-green font-bold">$0.00 (FREE DIRECT)</span>
            </div>
            <div className="summary-total-row">
              <span>Total</span>
              <span className="total-amount">${total.toFixed(2)}</span>
            </div>

            <button 
              className="btn-primary checkout-btn"
              onClick={onProceedCheckout}
              id="cart-checkout-button"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>
            <p className="curbside-pickup-note">
              📍 Curbside Pickup at {RESTAURANT_INFO.address}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

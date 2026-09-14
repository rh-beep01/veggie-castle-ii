import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, Phone, Car, CreditCard } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function CheckoutModal({ isOpen, onClose, cart, onClearCart }) {
  if (!isOpen) return null;

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('15-20');
  const [vehicleInfo, setVehicleInfo] = useState('');
  const [orderId, setOrderId] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (item.itemTotalPrice * item.quantity), 0);
  const total = subtotal * 1.095;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please fill out your name and mobile phone number.');
      return;
    }
    const newOrderId = `TC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderPlaced(true);
    onClearCart();
  };

  return (
    <div className="modal-backdrop animate-fade" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()} id="checkout-modal-container">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!orderPlaced ? (
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-header">
              <h2>Quick Curbside Pickup Checkout</h2>
              <p>Direct ordering with zero middleman app commissions.</p>
            </div>

            <div className="form-section">
              <label className="form-label">Full Name *</label>
              <input 
                type="text" 
                required
                className="form-input" 
                placeholder="e.g. Min-Jun Kim / Sarah Lee"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="form-section">
              <label className="form-label">Mobile Phone Number (for order SMS updates) *</label>
              <input 
                type="tel" 
                required
                className="form-input" 
                placeholder="(213) 000-0000"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>

            <div className="form-section">
              <label className="form-label">Pickup Time Estimate</label>
              <select 
                className="form-select"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              >
                <option value="15-20">ASAP (Ready in ~15–20 minutes)</option>
                <option value="30">In 30 minutes</option>
                <option value="45">In 45 minutes</option>
                <option value="60">In 1 hour</option>
              </select>
            </div>

            <div className="form-section">
              <label className="form-label">Car Make & Color (Optional for Curbside Hand-Off)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Silver Tesla Model 3 or White Honda Civic"
                value={vehicleInfo}
                onChange={(e) => setVehicleInfo(e.target.value)}
              />
            </div>

            <div className="checkout-order-summary-box">
              <div className="summary-line">
                <span>Items ({cart.length})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-line font-bold total">
                <span>Total Due at Pickup</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <span className="pay-tag">💵 Pay at Counter / Apple Pay / Credit Card Accepted</span>
            </div>

            <button type="submit" className="btn-primary checkout-submit-btn" id="confirm-order-button">
              Place Direct Pickup Order (${total.toFixed(2)})
            </button>
          </form>
        ) : (
          <div className="order-success-view">
            <CheckCircle size={64} className="success-icon" />
            <h2>Order Placed Successfully!</h2>
            <div className="order-id-badge">Order #{orderId}</div>
            
            <p className="success-msg">
              Thank you, <strong>{customerName}</strong>! Your order has been sent directly to the kitchen at <strong>Veggie Castle II</strong>.
            </p>

            <div className="pickup-details-card">
              <div className="pickup-item">
                <Clock size={18} className="pickup-icon" />
                <div>
                  <strong>Estimated Ready Time:</strong>
                  <span>~{pickupTime} minutes from now</span>
                </div>
              </div>
              <div className="pickup-item">
                <MapPin size={18} className="pickup-icon" />
                <div>
                  <strong>Pickup Location:</strong>
                  <span>{RESTAURANT_INFO.address} (South Richmond Hill)</span>
                </div>
              </div>
              <div className="pickup-item">
                <Phone size={18} className="pickup-icon" />
                <div>
                  <strong>Store Questions?</strong>
                  <span>Call {RESTAURANT_INFO.phone}</span>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <a 
                href={RESTAURANT_INFO.mapsUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-gold"
                style={{ width: '100%', marginBottom: '10px' }}
              >
                Get Google Maps Directions
              </a>
              <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }}>
                Back to Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, CheckCircle, Calendar, Users, Clock, Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function ReservationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [reserved, setReserved] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('18:30');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please provide your name and phone number.');
      return;
    }
    setReserved(true);
  };

  return (
    <div className="modal-backdrop animate-fade" onClick={onClose}>
      <div className="reservation-modal" onClick={(e) => e.stopPropagation()} id="reservation-modal-container">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!reserved ? (
          <form onSubmit={handleSubmit} className="reservation-form">
            <div className="checkout-header">
              <span className="badge badge-gold">Table Reservation</span>
              <h2>Book a Table at Veggie Castle II</h2>
              <p>Enjoy piping-hot stone stews & BBQ with friends and family.</p>
            </div>

            <div className="form-row">
              <div className="form-section">
                <label className="form-label">Party Size</label>
                <select className="form-select" value={guests} onChange={(e) => setGuests(e.target.value)}>
                  {[1,2,3,4,5,6,7,8,10,12].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              <div className="form-section">
                <label className="form-label">Date</label>
                <input 
                  type="date" 
                  required
                  className="form-input" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-section">
                <label className="form-label">Time</label>
                <select className="form-select" value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="11:30">11:30 AM (Lunch)</option>
                  <option value="12:30">12:30 PM (Lunch)</option>
                  <option value="13:30">1:30 PM (Lunch)</option>
                  <option value="17:30">5:30 PM (Dinner)</option>
                  <option value="18:30">6:30 PM (Dinner)</option>
                  <option value="19:30">7:30 PM (Dinner)</option>
                  <option value="20:30">8:30 PM (Dinner)</option>
                </select>
              </div>

              <div className="form-section">
                <label className="form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  required
                  className="form-input" 
                  placeholder="(213) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-section">
              <label className="form-label">Your Full Name *</label>
              <input 
                type="text" 
                required
                className="form-input" 
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-section">
              <label className="form-label">Special Requests (Optional)</label>
              <textarea 
                className="modal-textarea"
                placeholder="Celebration, booth request, baby high-chair..."
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '12px' }}>
              Confirm Table Reservation
            </button>
          </form>
        ) : (
          <div className="order-success-view">
            <CheckCircle size={64} className="success-icon" style={{ color: 'var(--accent-gold)' }} />
            <h2>Reservation Confirmed!</h2>
            <p className="success-msg">
              We look forward to welcoming you, <strong>{name}</strong>, for a party of <strong>{guests}</strong> on <strong>{date || 'Today'}</strong> at <strong>{time}</strong>.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              We will hold your table for 15 minutes past your booking time. If running late, please call us at {RESTAURANT_INFO.phone}.
            </p>
            <button className="btn-secondary" onClick={onClose} style={{ width: '100%' }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

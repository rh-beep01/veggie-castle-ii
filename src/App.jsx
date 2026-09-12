import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CombosSpotlight from './components/CombosSpotlight';
import MenuSection from './components/MenuSection';
import StorySection from './components/StorySection';
import LocationHoursSection from './components/LocationHoursSection';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ReservationModal from './components/ReservationModal';
import './App.css';

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('tofuchon_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('tofuchon_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.itemTotalPrice * item.quantity), 0);

  const handleAddToCart = (customizedItem) => {
    setCart((prevCart) => {
      // Check if item with same ID and same options already exists
      const existingIdx = prevCart.findIndex(
        (ci) => ci.id === customizedItem.id && 
                JSON.stringify(ci.customOptions) === JSON.stringify(customizedItem.customOptions)
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += customizedItem.quantity;
        return updated;
      }
      return [...prevCart, customizedItem];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      if (newQuantity <= 0) {
        updated.splice(index, 1);
      } else {
        updated[index].quantity = newQuantity;
      }
      return updated;
    });
  };

  const handleRemoveItem = (index) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleExploreMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="app-wrapper">
      <Navbar 
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      <main>
        <Hero 
          onExploreMenu={handleExploreMenu}
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        <CombosSpotlight 
          onSelectItem={(item) => setSelectedItem(item)}
        />

        <MenuSection 
          onSelectItem={(item) => setSelectedItem(item)}
        />

        <StorySection />

        <LocationHoursSection />
      </main>

      <Footer />

      {/* Modals & Drawers */}
      <ProductModal 
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={handleProceedCheckout}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onClearCart={handleClearCart}
      />

      <ReservationModal 
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
}

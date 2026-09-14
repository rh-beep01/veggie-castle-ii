import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  X, 
  Plus, 
  Minus, 
  Check, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Menu as MenuIcon, 
  Star, 
  Heart, 
  Trash2, 
  CreditCard, 
  ShieldCheck, 
  Printer, 
  ExternalLink,
  Utensils,
  Flame,
  Info,
  ChevronDown,
  Navigation,
  Truck,
  Home,
  Banknote
} from 'lucide-react';
import confetti from 'canvas-confetti';
import Button from './components/ui/Button';
import BrandLogo from './components/BrandLogo';
import { RESTAURANT_INFO, SPICE_LEVELS, CATEGORIES, MENU_ITEMS } from './data/menuData';

// Dynamic Hero Food Slideshow Dataset
const HERO_SLIDES = [
  {
    image: '/images/vegan-feast-hero.jpg',
    badge: 'Royal Caribbean Vegan Feast',
    title: 'Grand Ital Protein Banquet',
    botanical: '100% Plant-Based ? Island Herbs & Spices',
    desc: 'Generous platter of tender jerk BBQ jackfruit, golden sweet fried plantains, Jamaican rice and peas, creamy vegan baked mac and cheese, callaloo, and steamed island greens.',
    targetId: 'protein-large'
  },
  {
    image: '/images/cold-pressed-juices.jpg',
    badge: 'Fresh Daily Cold-Pressed Cures',
    title: 'Signature Raw Juice Bar Cures',
    botanical: 'Cold Buster ? Multi V ? Pure Green ? Acai Berry',
    desc: 'Artisan cold-pressed immunity elixirs packed with fresh ginger, turmeric, organic kale, beets, sea moss, and tropical citrus. 100% raw and revitalizing.',
    targetId: 'juice-multi-v'
  },
  {
    image: '/images/oyster-mushroom-burger.jpg',
    badge: 'Queens Fan Favorite #1',
    title: 'Crispy Fried Oyster Mushroom Burger',
    botanical: 'Fried Oyster Mushrooms ? Chipotle Remoulade ? Brioche',
    desc: 'Oversized crispy golden oyster mushrooms layered with melted vegan cheddar, crisp romaine lettuce, ripe tomato, dill pickles, and dripping house chipotle remoulade with waffle fries.',
    targetId: 'grill-oyster-mushroom-burger'
  },
  {
    image: '/images/vegan-curry-plate.jpg',
    badge: 'Warm Turmeric Island Simmer',
    title: 'Golden Curry Chickpea & Tofu Plate',
    botanical: 'Yellow Turmeric Rice ? Sweet Plantains ? Spiced Cabbage',
    desc: 'Fragrant golden curry simmered with organic tofu cubes, tender chickpeas, and Jamaican pimento, served alongside yellow turmeric rice and caramelized sweet plantains.',
    targetId: 'protein-medium'
  }
];

export default function App() {
  // Navigation & UI States
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all');

  // Hero Slideshow State
  const [heroSlide, setHeroSlide] = useState(0);
  const [isSlidePaused, setIsSlidePaused] = useState(false);

  // Auto-advance hero slideshow every 4.2 seconds unless hovered
  useEffect(() => {
    if (isSlidePaused) return;
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isSlidePaused]);

  // Cart State with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('veggie_castle_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('veggie_castle_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Product Customization Modal State
  const [modalSpice, setModalSpice] = useState('medium');
  const [modalRice, setModalRice] = useState('Jamaican Rice & Peas');
  const [modalAddOns, setModalAddOns] = useState([]);
  const [modalInstructions, setModalInstructions] = useState('');
  const [modalQuantity, setModalQuantity] = useState(1);

  // Cart & Order Settings
  const [orderType, setOrderType] = useState('pickup');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promoMsg, setPromoMsg] = useState({ text: '', type: '' });

  // Driver Tip Options: Chip buttons + Custom support
  const [driverTip, setDriverTip] = useState(4.00);
  const [isCustomTip, setIsCustomTip] = useState(false);
  const [customTipInput, setCustomTipInput] = useState('');

  // Checkout Form State
  const [checkoutStep, setCheckoutStep] = useState('details'); // details, payment, confirmed
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [pickupTime, setPickupTime] = useState('ASAP (Ready in 15-20 mins)');
  const [deliveryTime, setDeliveryTime] = useState('ASAP (Estimated 30-45 mins)');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryApt, setDeliveryApt] = useState('');
  const [deliveryZip, setDeliveryZip] = useState('Richmond Hill (11419)');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Table Reservation Form State
  const [reserveDate, setReserveDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [reserveTime, setReserveTime] = useState('6:30 PM');
  const [reserveGuests, setReserveGuests] = useState('2 Guests');
  const [reserveSeating, setReserveSeating] = useState('Indoor Seating');
  const [reserveOccasion, setReserveOccasion] = useState('Casual Dinner');
  const [reserveName, setReserveName] = useState('');
  const [reservePhone, setReservePhone] = useState('');
  const [reserveNotes, setReserveNotes] = useState('');
  const [reserveConfirmed, setReserveConfirmed] = useState(false);
  const [confirmedResCode, setConfirmedResCode] = useState('');

  // Toast message
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(null), 3000);
    return () => clearTimeout(t);
  }, [toastMessage]);

  // WCAG 2.2 AA Accessibility: Escape key listener closes drawers & modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (mobileNavOpen) setMobileNavOpen(false);
        if (selectedProduct) setSelectedProduct(null);
        if (cartOpen) setCartOpen(false);
        if (checkoutOpen) setCheckoutOpen(false);
        if (reserveOpen) setReserveOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileNavOpen, selectedProduct, cartOpen, checkoutOpen, reserveOpen]);

  // Financial Calculations
  const cartItemCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const salesTax = taxableAmount * 0.08875; // NY sales tax 8.875%
  const deliveryFee = orderType === 'delivery' ? 4.99 : 0;
  const tipAmount = orderType === 'delivery' ? driverTip : 0;
  const grandTotal = taxableAmount + salesTax + deliveryFee + tipAmount;

  // Featured signature items
  const featuredItems = MENU_ITEMS.filter((i) => i.isPopular || i.isCombo).slice(0, 6);

  // Filtered menu items
  const filteredMenu = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q || 
      item.name.toLowerCase().includes(q) || 
      (item.badge && item.badge.toLowerCase().includes(q)) || 
      (item.description && item.description.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  // Open Product Customization Modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalSpice(product.hasprepStyle ? 'medium' : null);
    const needsRice = product.category === 'proteins' || product.hasRice;
    setModalRice(needsRice ? 'Jamaican Rice & Peas' : null);
    setModalAddOns([]);
    setModalInstructions('');
    setModalQuantity(1);
  };

  // Add Item to Cart
  const handleAddToCart = () => {
    if (!selectedProduct) return;

    let unitPrice = selectedProduct.price;
    const addOnTotal = modalAddOns.reduce((sum, a) => sum + a.price, 0);
    unitPrice += addOnTotal;

    const needsRice = selectedProduct.category === 'proteins' || selectedProduct.hasRice;
    const chosenRice = needsRice ? modalRice : null;
    const cartItemId = `${selectedProduct.id}-${modalSpice || 'none'}-${chosenRice || 'none'}-${modalAddOns.map(a => a.name).join('_')}-${Date.now()}`;

    const newItem = {
      cartItemId,
      product: selectedProduct,
      name: selectedProduct.name,
      badge: selectedProduct.badge || '100% Vegan',
      unitPrice,
      basePrice: selectedProduct.price,
      quantity: modalQuantity,
      image: selectedProduct.image,
      prepStyle: modalSpice,
      riceOption: chosenRice,
      addOns: modalAddOns,
      specialInstructions: modalInstructions
    };

    setCart((prev) => [...prev, newItem]);
    setSelectedProduct(null);
    setToastMessage(`Added ${modalQuantity}x ${selectedProduct.name} to order!`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean));
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  // Apply Promo Code
  const applyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'VEGGIE10' || code === 'QUEENS10' || code === 'ITAL10') {
      setDiscountPercent(10);
      setDiscountCode(code);
      setPromoMsg({ text: '10% South Richmond Hill Community discount applied!', type: 'success' });
    } else if (code === 'WELCOME') {
      setDiscountPercent(15);
      setDiscountCode(code);
      setPromoMsg({ text: '15% Welcome discount applied!', type: 'success' });
    } else {
      setPromoMsg({ text: 'Invalid promo code. Try "VEGGIE10"', type: 'error' });
    }
  };

  // Handle Tip Chip Selection
  const handleSelectTip = (amount) => {
    setIsCustomTip(false);
    setDriverTip(amount);
  };

  const handleCustomTipChange = (val) => {
    setCustomTipInput(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed >= 0) {
      setDriverTip(parsed);
    } else {
      setDriverTip(0);
    }
  };

  // Complete Order
  const handleCompleteOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderNumber = `VC-${Math.floor(1000 + Math.random() * 9000)}`;
    const confirmed = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      orderType,
      subtotal,
      discountAmount,
      salesTax,
      deliveryFee,
      tipAmount,
      grandTotal,
      customerName,
      customerPhone,
      customerEmail,
      fulfillmentTime: orderType === 'pickup' ? pickupTime : deliveryTime,
      deliveryAddress,
      deliveryApt,
      deliveryZip,
      deliveryNotes,
      paymentMethod
    };

    setConfirmedOrder(confirmed);
    setCheckoutStep('confirmed');
    setCart([]);

    try {
      confetti({
        particleCount: 130,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#8C1D24', '#C88A2C', '#1E3A8A', '#F5EDE2']
      });
    } catch {
      // ignore
    }
  };

  // Handle Reservation submission
  const handleBookReservation = (e) => {
    e.preventDefault();
    const code = `VC-RES-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedResCode(code);
    setReserveConfirmed(true);
  };

  const currentSlide = HERO_SLIDES[heroSlide];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background text-foreground selection:bg-accent/30 pb-20 md:pb-0">
      
            {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#1C1716] text-[#EADFD3] px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-medium border-b border-[#2C2422] relative z-20">
        <div className="mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-3 max-w-7xl">
          
          {/* Top Row on Mobile: Address & Quick Phone Call */}
          <div className="flex items-center justify-between gap-2 w-full sm:w-auto">
            <a
              href={RESTAURANT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-accent hover:text-white transition-colors group min-w-0"
              title="Open in Google Maps"
            >
              <MapPin className="size-3 text-accent shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-semibold underline decoration-accent/50 underline-offset-2 group-hover:decoration-white truncate text-[11px] sm:text-xs">
                132-09 Liberty Ave, Queens NY
              </span>
              <span className="hidden md:inline-flex items-center gap-0.5 text-[10px] bg-accent/20 text-accent px-1.5 py-0.5 rounded-full font-bold ml-1">
                Directions <ExternalLink className="size-2 ml-0.5" />
              </span>
            </a>

            {/* Direct Phone Call Button on Mobile */}
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="sm:hidden flex items-center gap-1 text-white hover:text-accent font-mono font-bold text-[10px] bg-white/10 px-2 py-0.5 rounded-md shrink-0 border border-white/15"
            >
              <Phone className="size-2.5 text-accent shrink-0" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>

          {/* Center Message (Desktop only) */}
          <p className="hidden lg:block text-center text-xs text-[#EADFD3]/90 truncate mx-2">
            <strong className="text-white">Queens' Iconic 100% Plant-Based Caribbean Comfort &amp; Cold-Pressed Juices</strong>
          </p>

          {/* Bottom Row on Mobile / Right on Desktop: Hours & Phone */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-[10px] sm:text-xs shrink-0 w-full sm:w-auto border-t border-white/10 sm:border-t-0 pt-0.5 sm:pt-0">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span>Open Daily: 9:30 AM – 10:00 PM</span>
            </span>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="hidden sm:flex items-center gap-1 text-[#EADFD3] hover:text-white font-mono font-semibold transition-colors"
              title="Direct Call Veggie Castle II"
            >
              <Phone className="size-3 text-accent shrink-0" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>

        </div>
      </div>

      {/* Vital Botanical Heritage Ribbon */}
      <div className="vital-ribbon"></div>

      {/* 2. STICKY LUXURY HEADER */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md shadow-xs">
        <div className="mx-auto flex h-16 sm:h-18 max-w-7xl items-center justify-between gap-2 sm:gap-3 px-3 sm:px-6 lg:px-8">
          
          {/* Brand Logo & Title */}
          <a href="#top" className="group text-decoration-none block py-1" aria-label="Veggie Castle II Home">
            <BrandLogo size="sm" variant="light" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center flex-1 mx-4 gap-6 xl:gap-7 whitespace-nowrap">
            <a href="#featured" className="nav-link text-[13px] font-semibold text-foreground/80 hover:text-primary transition-colors py-1">
              Combos
            </a>
            <a href="#menu" className="nav-link text-[13px] font-semibold text-foreground/80 hover:text-primary transition-colors py-1">
              Full Menu
            </a>
            <a href="#sides-guide" className="nav-link text-[13px] font-semibold text-foreground/80 hover:text-primary transition-colors py-1">
              Sides &amp; Spice
            </a>
            <a href="#heritage" className="nav-link text-[13px] font-semibold text-foreground/80 hover:text-primary transition-colors py-1">
              Our Story
            </a>
            <a href="#reviews" className="nav-link text-[13px] font-semibold text-foreground/80 hover:text-primary transition-colors py-1">
              Reviews
            </a>
            <a href="#location" className="nav-link text-[13px] font-semibold text-foreground/80 hover:text-primary transition-colors py-1">
              Hours &amp; Map
            </a>
          </nav>

          {/* Header Action Buttons (Mobile-Optimized to prevent cut-off) */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Book Table Button - Always visible! Compact on mobile */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReserveOpen(true)}
              className="rounded-full text-[11px] sm:text-xs font-semibold h-8 sm:h-9 px-2 sm:px-3.5 border-primary/30 hover:bg-primary/5"
            >
              <Calendar className="size-3 sm:size-3.5 text-accent mr-1 shrink-0" />
              <span className="hidden sm:inline">Book Table</span>
              <span className="sm:hidden">Book</span>
            </Button>

            {/* Cart Button - Fully visible on all phones */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center gap-1.5 sm:gap-2 h-8 sm:h-9 px-2.5 sm:px-4 rounded-full bg-primary text-white border border-primary hover:bg-primary/90 shadow-xs transition-all active:scale-95 shrink-0 cursor-pointer"
              title="View Cart / Order Tray"
            >
              <div className="relative flex items-center">
                <ShoppingBag className="size-3.5 sm:size-4 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white text-[9px] sm:text-[10px] font-black shadow-xs ring-1 ring-white/40">
                    {cartItemCount}
                  </span>)}
              </div>
              <span className="font-bold text-white text-[11px] sm:text-xs">Cart</span>
              {cartItemCount > 0 && (
                <span className="font-mono font-bold text-xs pl-1.5 border-l border-white/30 text-amber-200 hidden md:inline">
                  ${subtotal.toFixed(2)}
                </span>)}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden flex items-center justify-center p-1.5 sm:p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileNavOpen ? <X className="size-4 sm:size-5" /> : <MenuIcon className="size-4 sm:size-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="lg:hidden border-t border-border bg-card px-4 py-5 shadow-lg animate-fadeIn">
            <div className="flex flex-col gap-2.5 font-medium text-xs sm:text-sm">
              <a href="#featured" onClick={() => setMobileNavOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors">
                Signature Combos
              </a>
              <a href="#menu" onClick={() => setMobileNavOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors">
                Full Menu &amp; Ordering
              </a>
              <a href="#sides-guide" onClick={() => setMobileNavOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors">
                Sides &amp; Spice Guide
              </a>
              <a href="#heritage" onClick={() => setMobileNavOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors">
                Our Ital Heritage &amp; Story
              </a>
              <a href="#reviews" onClick={() => setMobileNavOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors">
                South Richmond Hill Reviews
              </a>
              <a href="#location" onClick={() => setMobileNavOpen(false)} className="px-3 py-2 rounded-lg hover:bg-muted text-foreground transition-colors">
                Hours &amp; Location Map
              </a>

              <div className="pt-3 border-t border-border flex flex-col gap-2">
                <Button
                  variant="default"
                  onClick={() => { setMobileNavOpen(false); setReserveOpen(true); }}
                  className="w-full justify-center text-xs"
                >
                  <Calendar className="size-4 mr-1.5" /> Book a Table
                </Button>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-muted/50 font-mono font-semibold text-xs text-foreground"
                >
                  <Phone className="size-4 text-accent" /> Call {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>)}
      </header>

      {/* 3. HERO SECTION WITH AUTHENTIC CARIBBEAN ITAL RESTAURANT HERITAGE & DYNAMIC FOOD SLIDESHOW */}
      <section id="top" className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-[#2C2220] bg-[#120D0B] text-white">
        
        {/* Caribbean Restaurant Interior Background - Bright & Warm Island Ambiance */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/images/vegan-hero-bg.jpg"
            alt="Veggie Castle II Caribbean Vegan Restaurant & Juice Bar Ambiance"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-left lg:object-left brightness-[0.88] contrast-[1.08] transition-all duration-700"
          />
          {/* Reduced vintage effect: Gentle warm tint that lets the Hanok woodwork, lanterns, and brassware shine through */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07170B]/85 via-[#07170B]/45 to-transparent lg:w-[60%] w-full" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#07170B]/50 via-transparent to-[#07170B]/80" />
        </div>

        {/* Warm Caribbean island sunset ambient light glows */}
        <div className="absolute top-10 left-12 w-80 h-80 rounded-full bg-amber-500/20 blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-amber-600/15 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content - NO GIANT WINDOW, open background with small discrete chips */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              
              {/* Small discrete rating badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-amber-500/40 text-xs font-semibold mb-6 shadow-md">
                <div className="flex items-center text-amber-400">
                  <Star className="size-3.5 fill-current" />
                  <Star className="size-3.5 fill-current" />
                  <Star className="size-3.5 fill-current" />
                  <Star className="size-3.5 fill-current" />
                  <Star className="size-3.5 fill-current" />
                </div>
                <span className="font-bold text-white">4.8 / 5.0</span>
                <span className="text-[#EADFD3]/80">• 1,240+ South Richmond Hill Diners</span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="hidden sm:inline-block text-amber-300 font-bold">132-09 Liberty Ave, Queens NY</span>
              </div>

              {/* Headline with Caribbean Elegance */}
              <h1 className="section-title text-white tracking-wide mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-3xl sm:text-4xl lg:text-5xl font-black">
                Authentic Caribbean <span className="text-amber-400 italic">Plant-Based Living</span> &amp; Cold-Pressed Juices
              </h1>

              {/* Caribbean Ital Heritage Sub-Headline */}
              <p className="text-sm sm:text-base font-semibold text-emerald-400 tracking-wider mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                Queens' Iconic 100% Ital Plant-Based Kitchen • South Richmond Hill, NY
              </p>

              {/* Real-time Kitchen Operational Trust Signal */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-semibold text-emerald-200 mb-4 backdrop-blur-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span><strong>Kitchen Open Daily</strong> • 9:30 AM – 10:00 PM • Pickup ready in ~15m</span>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#EADFD3] leading-relaxed mb-8 max-w-2xl font-normal drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
                Simmered with love in South Richmond Hill: 100% vegan jerk proteins, slow-cooked Ital greens, seasoned rice & peas, and raw cold-pressed vitality cures.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => {
                    const el = document.getElementById('menu');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="rounded-full shadow-lg hover:shadow-xl w-full sm:w-auto text-sm font-bold bg-[#8C1D24] hover:bg-[#A3232C] text-white border border-amber-500/30"
                >
                  <ShoppingBag className="size-4.5 mr-1.5 text-white" />
                  <span>Order Online</span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setReserveOpen(true)}
                  className="rounded-full w-full sm:w-auto text-sm font-bold bg-black/40 backdrop-blur-md border border-amber-400/50 text-amber-200 hover:bg-black/60 hover:text-white"
                >
                  <Calendar className="size-4 mr-1.5 text-amber-400" />
                  <span>Book a Table</span>
                </Button>

                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-white/20 bg-black/40 backdrop-blur-md hover:bg-black/60 font-semibold text-sm text-white transition-colors w-full sm:w-auto"
                  title="Direct Call Veggie Castle II"
                >
                  <Phone className="size-4 text-amber-400" />
                  <span>Call Direct</span>
                </a>

                {/* Follow on Instagram CTA Button */}
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-5 rounded-full border border-pink-500/40 bg-gradient-to-r from-purple-950/60 via-pink-950/60 to-rose-950/60 hover:from-purple-900/80 hover:to-pink-900/80 backdrop-blur-md font-semibold text-sm text-white transition-all duration-200 hover:scale-105 shadow-md group w-full sm:w-auto cursor-pointer"
                  title="Follow Veggie Castle II on Instagram (@veggiecastle)"
                >
                  <svg className="size-4 text-pink-400 group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  <span>Follow @veggiecastle</span>
                  <ExternalLink className="size-3 text-pink-300/70 group-hover:text-pink-200 transition-colors" />
                </a>
              </div>

              {/* Trust Badges Bar in discrete small frosted chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15 w-full">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/35 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-red-900/60 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">0% Extra Fees</p>
                    <p className="text-[11px] text-[#EADFD3]/70">Direct pricing</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/35 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">20-25 Min</p>
                    <p className="text-[11px] text-[#EADFD3]/70">Fast pickup</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/35 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-red-900/60 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/20">
                    <Flame className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Fresh Daily</p>
                    <p className="text-[11px] text-[#EADFD3]/70">Handmade tofu</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-black/35 backdrop-blur-sm border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Utensils className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Free Sides</p>
                    <p className="text-[11px] text-[#EADFD3]/70">Full side dishes</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card: DYNAMIC INTERACTIVE SLIDESHOW */}
            <div className="lg:col-span-5 relative" 
              onMouseEnter={() => setIsSlidePaused(true)}
              onMouseLeave={() => setIsSlidePaused(false)}
            >
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-2 rounded-3xl bg-linear-to-tr from-primary/25 via-accent/25 to-primary/15 blur-md pointer-events-none"></div>

                {/* Main Slideshow Container */}
                <div className="relative rounded-2xl overflow-hidden bg-card border-2 border-border shadow-2xl">
                  
                  {/* Image with smooth fade effect - bright, crystal clear, minimal shadow */}
                  <div className="relative h-96 sm:h-[420px] w-full overflow-hidden bg-muted">
                    <img
                      key={currentSlide.image}
                      src={currentSlide.image}
                      alt={currentSlide.title}
                      className="w-full h-full object-cover animate-fadeIn duration-500 scale-100 hover:scale-105 transition-transform duration-700"
                      fetchPriority="high"
                      decoding="async"
                    />
                    {/* Very subtle, minimal bottom gradient so the image is fully bright and vivid */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10 pointer-events-none" />

                    {/* Left & Right Slideshow Arrow Controls (Translucent Liquid Glass Buttons) */}
                    <button
                      type="button"
                      onClick={() => setHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/40 hover:bg-white/75 text-stone-950 flex items-center justify-center backdrop-blur-md shadow-md border border-white/60 transition-all active:scale-90 cursor-pointer z-10"
                      aria-label="Previous dish slide"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/40 hover:bg-white/75 text-stone-950 flex items-center justify-center backdrop-blur-md shadow-md border border-white/60 transition-all active:scale-90 cursor-pointer z-10"
                      aria-label="Next dish slide"
                    >
                      <ChevronRight className="size-5" />
                    </button>

                    {/* Floating Caribbean Ital Tag top-left (Liquid Glass) */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDFBF7]/90 text-primary backdrop-blur-md border border-white/80 text-[11px] font-bold tracking-wide shadow-md">
                        <Flame className="size-3 text-primary" /> {currentSlide.badge}
                      </span>
                    </div>

                    {/* TRUE TRANSLUCENT LIQUID GLASS DESCRIPTION WINDOW (Noticeably transparent, full title room, zero truncation) */}
                    <div className="absolute bottom-3 left-3 right-3 z-10 rounded-2xl bg-white/35 hover:bg-white/45 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.18)] p-3 text-foreground transition-all duration-300">
                      <div className="flex items-center justify-between gap-3">
                        
                        {/* Food info: Full title and botanical description with total breathing room */}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-display text-sm sm:text-base font-black text-stone-950 leading-tight drop-shadow-2xs">
                            {currentSlide.title}
                          </h3>
                          <p className="text-xs font-bold text-[#8C1D24] mt-0.5 drop-shadow-2xs">
                            {currentSlide.botanical}
                          </p>
                        </div>

                        {/* Right side: Progress Bar Dots + Direct Order Button (No duplicate number badge) */}
                        <div className="flex items-center gap-2.5 shrink-0">
                          {/* Progress Dots */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/20 backdrop-blur-sm border border-white/30">
                            {HERO_SLIDES.map((_, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setHeroSlide(idx)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                  heroSlide === idx ? 'w-4.5 bg-amber-300' : 'w-1.5 bg-white/60 hover:bg-white'
                                }`}
                                aria-label={`Go to slide ${idx + 1}`}
                              />))}
                          </div>

                          {/* Direct Order Button */}
                          <button
                            type="button"
                            onClick={() => {
                              const found = MENU_ITEMS.find(m => m.id === currentSlide.targetId) || MENU_ITEMS[0];
                              openProductModal(found);
                            }}
                            className="h-8.5 px-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95 shrink-0"
                          >
                            <span>Order</span>
                            <ArrowRight className="size-3" />
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>

                </div>

                {/* Clean, Non-Intrusive Floating Heritage Badge (Top Right only, bottom-left overlap completely eliminated) */}
                <div className="absolute -top-3.5 -right-2 sm:-right-3 bg-white/90 backdrop-blur-md border border-white/80 text-foreground px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-2 z-20">
                  <Award className="size-4 text-accent shrink-0" />
                  <span className="text-[11px] font-bold text-foreground">
                    <span className="text-primary font-black">#1</span> K-Town Heritage
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SIGNATURE COMBOS & SPECIALTIES SPOTLIGHT */}
      <section id="featured" className="py-16 sm:py-20 bg-secondary/40 border-b border-border relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="eyebrow">Signature Combos &amp; House Favorites</p>
              <h2 className="section-title text-foreground">
                The Authentic <span className="text-primary italic">Caribbean Vegan Feast</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl">
                Every plate is served with your choice of wholesome plant-based proteins, seasoned rice, and our famous selection of Caribbean Ital sides.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const el = document.getElementById('menu');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full text-xs font-bold"
              >
                View Full Menu ({MENU_ITEMS.length} items) <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featuredItems.map((item) => (
              <div 
                key={item.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Image Header with Badge */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-muted">
                  <img 
                    src={item.image || '/images/vegan-curry-plate.jpg'} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                  
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Content & Action */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mt-1 mb-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Row: Prominent Price & CTA */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none">Price</span>
                      <span className="font-mono font-extrabold text-xl text-primary mt-1">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => openProductModal(item)}
                      className="rounded-full px-4 h-9 text-xs font-semibold shadow-xs"
                    >
                      <Plus className="size-3.5 mr-1" /> Add to Order
                    </Button>
                  </div>
                </div>

              </div>))}
          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE FULL MENU & ONLINE ORDERING */}
      <section id="menu" className="py-16 sm:py-24 border-b border-border relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <p className="eyebrow">Explore Our Authentic Dishes</p>
            <h2 className="section-title text-foreground">
              Order Online for <span className="text-primary italic">Pickup &amp; Delivery</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">
              Direct from our kitchen to your table with zero third-party markups. Select any dish to customize preparation styles and side options.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 mb-8 bg-card p-3.5 sm:p-4 rounded-2xl border border-border shadow-xs">
            
            {/* Search Input Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Jerk, Oyster Mushroom, Juice, Burger, Plantains..."
                className="w-full pl-9 pr-8 py-2.5 text-xs rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>)}
            </div>

            {/* Food Categories: Non-scrollable, all visible together in one go */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                const count = cat.id === 'all' 
                  ? MENU_ITEMS.length 
                  : MENU_ITEMS.filter(i => i.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-2.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between sm:justify-center gap-1.5 ${
                      isActive 
                        ? 'bg-primary text-white shadow-xs' 
                        : 'bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span className="truncate">{cat.label}</span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-background/80 text-muted-foreground'
                    }`}>
                      {count}
                    </span>
                  </button>);
              })}
            </div>

          </div>

          {searchQuery && (
            <div className="mb-6 flex items-center justify-between text-xs text-muted-foreground">
              <span>Showing results for "{searchQuery}" ({filteredMenu.length} items found)</span>
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="text-primary font-bold hover:underline cursor-pointer"
              >
                Clear search
              </button>
            </div>)}

          {filteredMenu.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border p-8">
              <p className="font-display text-lg font-bold text-foreground">No dishes match your search</p>
              <p className="text-xs text-muted-foreground mt-1">Try searching for "jerk", "mushroom", "juice", or "burger".</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="mt-4 rounded-full text-xs"
              >
                Reset Filters
              </Button>
            </div>) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openProductModal(item)}
                  className="group bg-card rounded-2xl border border-border p-4 hover:border-primary/50 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-muted shrink-0 relative border border-border/60">
                      <img
                        src={item.image || '/images/vegan-curry-plate.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                        loading="lazy"
                      />
                      {item.hasprepStyle && (
                        <span className="absolute bottom-1 right-1 bg-black/60 text-amber-300 p-1 rounded-md backdrop-blur-xs">
                          <Flame className="size-3" />
                        </span>)}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1 mb-1">
                          <h4 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                            {item.name}
                          </h4>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5 my-1.5">
                          <span className="inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-950 border border-emerald-300">
                            {item.badge || "100% Ital"}
                          </span>
                          {(item.category === 'juices' || item.category === 'blends' || item.category === 'salads') && (
                            <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300">
                              Gluten-Free
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                        <span className="font-mono tabular-nums font-extrabold text-base text-primary">
                          ${item.price.toFixed(2)}
                        </span>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProductModal(item);
                          }}
                          className="h-7 px-3 text-xs font-bold rounded-lg group-hover:bg-primary group-hover:text-white transition-colors"
                        >
                          <Plus className="size-3 mr-0.5" /> Order
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>))}
            </div>)}

        </div>
      </section>

      {/* 6. CARIBBEAN SIDES & SPICE GUIDE */}
      <section id="sides-guide" className="py-16 sm:py-20 bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6">
              <p className="eyebrow">Scotch Bonnet &amp; Island Herbs</p>
              <h2 className="section-title text-foreground mb-4">
                Choose Your <span className="text-primary italic">Spice Harmony</span>
              </h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Our Caribbean vegan entrees are slow-simmered with Scotch Bonnet peppers, Jamaican pimento, fresh thyme, scallions, and coconut milk. Customize your preferred heat tier:
              </p>

              <div className="space-y-3">
                {SPICE_LEVELS.map((spice) => (
                  <div 
                    key={spice.id}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-card border border-border shadow-2xs hover:border-primary/40 transition-colors"
                  >
                    <div 
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white font-bold text-xs shadow-xs"
                      style={{ backgroundColor: spice.color }}
                    >
                      <Flame className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">
                        {spice.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {spice.desc}
                      </p>
                    </div>
                  </div>))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
              <div className="relative h-48 rounded-xl overflow-hidden mb-6 border border-border">
                <img 
                  src="/images/vegan-curry-plate.jpg" 
                  alt="Veggie Castle II Caribbean Sides Platter" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                <span className="absolute bottom-3 left-3 bg-primary text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  23 Fresh Daily Sides
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Ital Vitality</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-2">
                Nourishing Island Sides
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-5">
                In Caribbean Ital cooking, sides are the soul of the plate. At Veggie Castle II, choose from 23 freshly prepared vegan sides made from whole ingredients:
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs font-medium">
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/60">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                  <span>Jamaican Rice &amp; Peas</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/60">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0"></span>
                  <span>Golden Sweet Plantains</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/60">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                  <span>Creamy Vegan Mac &amp; Cheese</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/60">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0"></span>
                  <span>Steamed Island Callaloo</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/60">
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0"></span>
                  <span>Slow-Cooked Collard Greens</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/60">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0"></span>
                  <span>Vegan Rasta Pasta</span>
                </div>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs text-foreground flex items-center gap-2">
                <Info className="size-4 text-primary shrink-0" />
                <span>Every protein plate includes 2 to 3 freshly cooked sides of your choice!</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. OUR HERITAGE & ITAL STORY */}
      <section id="heritage" className="py-16 sm:py-24 border-b border-border relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border-2 border-border shadow-xl">
                <img
                  src="/images/vegan-feast-hero.jpg"
                  alt="Veggie Castle II Authentic Caribbean Vegan Feast"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">South Richmond Hill Tradition</span>
                  <h4 className="font-display font-bold text-xl sm:text-2xl mt-1">100% Plant-Based Ital Living</h4>
                  <p className="text-xs text-white/80 mt-1">Honest Caribbean comfort food cooked fresh with natural herbs and pure love.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <p className="eyebrow">The Veggie Castle II Heritage</p>
              <h2 className="section-title text-foreground mb-6">
                Soul Food of <span className="text-primary italic">South Richmond Hill, Queens</span>
              </h2>

              <div className="space-y-4 text-muted-foreground text-sm sm:text-base leading-relaxed">
                <p>
                  Located at 132-09 Liberty Ave in the vibrant heart of South Richmond Hill, Queens, <strong className="text-foreground">Veggie Castle II</strong> has been a cherished neighborhood haven celebrating the vitality of authentic Caribbean vegan cooking.
                </p>
                <p>
                  Our kitchen is rooted in the rich traditions of Ital living ? seasoning every pot with fresh Scotch Bonnet peppers, island thyme, pimento, scallions, garlic, and rich coconut milk. From whole organic jackfruit and savory seitan to slow-braised collards, everything is made 100% plant-based from scratch daily.
                </p>
                <p>
                  Paired with our famous raw cold-pressed juice cures, sea moss elixirs, and crispy Oyster Mushroom burgers, we invite you to taste the energy, healing, and deep warmth of real Caribbean comfort right here in Queens.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Button
                  variant="default"
                  onClick={() => setReserveOpen(true)}
                  className="rounded-full font-bold text-xs"
                >
                  <Calendar className="size-3.5 mr-1" /> Reserve a Table
                </Button>
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-accent hover:underline flex items-center gap-1"
                >
                  Follow on Instagram {RESTAURANT_INFO.instagram} <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. South Richmond Hill REVIEWS & TESTIMONIALS */}
      <section id="reviews" className="py-16 sm:py-20 bg-secondary/30 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow">Guest Testimonials</p>
            <h2 className="section-title text-foreground">
              Loved by <span className="text-primary italic">Local Diners</span>
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Read what Queens and NYC plant-based enthusiasts have to say about our vegan plates, burgers, and juices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="bg-card rounded-2xl border border-border p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />))}
                </div>
                <p className="text-xs sm:text-sm text-foreground italic leading-relaxed mb-4">
                  "Hands down the best Caribbean vegan food in all of NYC! The Jerk Jackfruit and Vegan Mac & Cheese with sweet plantains is pure perfection. Fresh, deeply seasoned, and massive portions."
                </p>
              </div>
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center">
                  JK
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Jennifer K.</p>
                  <p className="text-[10px] text-muted-foreground">South Richmond Hill Resident • Yelp Elite</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />))}
                </div>
                <p className="text-xs sm:text-sm text-foreground italic leading-relaxed mb-4">
                  "I take the train out to Liberty Ave just for the Oyster Mushroom Burger and the Cold Buster juice. The crunch on the burger is unreal and the remoulade sauce is incredible. Ordering direct online is so easy!"
                </p>
              </div>
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center">
                  DL
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">David L.</p>
                  <p className="text-[10px] text-muted-foreground">Food Blogger • Google Local Guide</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />))}
                </div>
                <p className="text-xs sm:text-sm text-foreground italic leading-relaxed mb-4">
                  "The large protein platter with Curry Chickpeas, Callaloo, and Jamaican Rice & Peas is my weekly staple. 100% plant-based comfort food that actually leaves you feeling energized and good."
                </p>
              </div>
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold text-xs flex items-center justify-center">
                  SM
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Sarah M.</p>
                  <p className="text-[10px] text-muted-foreground">Verified Diner</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 9. LOCATION, HOURS & LIVE EMBEDDED GOOGLE MAP */}
      <section id="location" className="py-16 sm:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            <div className="lg:col-span-5 flex flex-col justify-between bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-xs">
              <div>
                <p className="eyebrow">Visit &amp; Dine</p>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-4">
                  Veggie Castle II 
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
                  Conveniently situated at 132-09 Liberty Ave in South Richmond Hill, Queens with <strong className="text-foreground">curbside pickup and delivery</strong> available daily.
                </p>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">{RESTAURANT_INFO.address}</p>
                      <p className="text-muted-foreground">{RESTAURANT_INFO.neighborhood}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="size-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">Operating Hours</p>
                      {RESTAURANT_INFO.hours.map((h, i) => (
                        <p key={i} className="text-muted-foreground">
                          {h.days}: <span className="text-foreground font-medium">{h.time}</span>
                        </p>))}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="size-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">Direct Inquiries &amp; Phone Orders</p>
                      <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="font-mono text-primary font-bold hover:underline">
                        {RESTAURANT_INFO.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={RESTAURANT_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-white font-bold text-xs shadow-xs hover:bg-[#73161c] transition-colors text-center"
                >
                  <Navigation className="size-4" /> Get Driving Directions
                </a>
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setReserveOpen(true)}
                  className="rounded-xl text-xs font-bold"
                >
                  <Calendar className="size-4 mr-1 text-accent" /> Book Table
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-card rounded-2xl border border-border overflow-hidden shadow-xs flex flex-col">
              <div className="relative w-full h-72 sm:h-96 bg-muted">
                <iframe
                  title="Veggie Castle II South Richmond Hill Location Map"
                  src="https://maps.google.com/maps?q=Veggie+Castle+II+132-09+Liberty+Ave,+South+Richmond+Hill,+NY+11419&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="p-4 sm:p-5 bg-muted/40 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-left w-full sm:w-auto">
                  <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span>132-09 Liberty Ave, South Richmond Hill, NY 11419</span>
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Free parking in rear lot • Between S Hobart Blvd &amp; S Harvard Blvd
                  </p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                  <a
                    href={RESTAURANT_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all text-xs font-bold shadow-2xs cursor-pointer"
                    title="Open location in Google Maps"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="size-3 text-accent" />
                  </a>
                  <a
                    href="https://maps.apple.com/?q=Tofu+Chon+3526+W+8th+St+Los+Angeles+CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card border border-border text-foreground hover:border-primary hover:text-primary transition-all text-xs font-bold shadow-2xs cursor-pointer"
                    title="Open location in Apple Maps"
                  >
                    <span>Apple Maps</span>
                    <ExternalLink className="size-3 text-accent" />
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 10. LUXURY FOOTER */}
      <footer className="bg-[#181413] text-[#EADFD3] py-14 border-t border-[#2C2422]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            <div>
              <div className="mb-4">
                <BrandLogo size="md" variant="dark" />
              </div>
              <p className="text-xs text-[#EADFD3]/70 leading-relaxed mb-4">
                100% Vegan Caribbean Comfort Food, Plant-Based Platters & Raw Cold-Pressed Juices in South Richmond Hill, Queens, NY.
              </p>
              <p className="text-xs text-emerald-400 font-mono">
                0% Third-party Commission When You Order Direct
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-4">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-[#EADFD3]/80">
                <li><a href="#featured" className="hover:text-white transition-colors">Signature Combos</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Full Online Menu</a></li>
                <li><a href="#sides-guide" className="hover:text-white transition-colors">Sides &amp; Ital Guide</a></li>
                <li><a href="#heritage" className="hover:text-white transition-colors">Our Heritage</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Location &amp; Directions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-4">Operating Hours</h4>
              <ul className="space-y-2 text-xs text-[#EADFD3]/80">
                {RESTAURANT_INFO.hours.map((h, i) => (
                  <li key={i}>
                    <p className="font-semibold text-white">{h.days}</p>
                    <p className="text-muted-foreground">{h.time}</p>
                  </li>))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-4">Contact &amp; Orders</h4>
              <div className="space-y-2 text-xs text-[#EADFD3]/80">
                <p>{RESTAURANT_INFO.address}</p>
                <p>Phone: <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="text-white font-mono hover:underline">{RESTAURANT_INFO.phone}</a></p>
                <p>Instagram: <a href={RESTAURANT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{RESTAURANT_INFO.instagram}</a></p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-[#2C2422] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#EADFD3]/60">
            <p>© {new Date().getFullYear()} Veggie Castle II. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Crafted with pride for South Richmond Hill, Queens NY</span>
            </p>
          </div>
        </div>
      </footer>

      {/* 11. PERSISTENT FLOATING "ORDER NOW / CART" ACTION WIDGET */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2">
        <button
          type="button"
          onClick={() => {
            if (cartItemCount > 0) {
              setCartOpen(true);
            } else {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="group flex items-center gap-3 px-4 sm:px-5 py-3 rounded-full bg-primary text-white shadow-2xl hover:bg-[#73161c] border-2 border-amber-300/40 transition-all duration-300 active:scale-95 cursor-pointer floating-cart-glow"
          title={cartItemCount > 0 ? "View Cart / Order Tray" : "Order Online Now (0% Fees)"}
          aria-label="Order Online and View Cart"
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="size-5 text-amber-200 group-hover:scale-110 transition-transform" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-[10px] font-black ring-2 ring-white shadow-xs">
                {cartItemCount}
              </span>)}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[12px] font-black uppercase tracking-wider text-amber-100 leading-tight">
              {cartItemCount > 0 ? `Cart (${cartItemCount})` : "Order Now"}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-white/90">
              {cartItemCount > 0 ? `$${subtotal.toFixed(2)} • View Cart` : "Pickup ready in ~15m • 0% Fees"}
            </span>
          </div>
          <ArrowRight className="size-4 text-amber-200 group-hover:translate-x-1 transition-transform ml-0.5 hidden sm:inline" />
        </button>
      </div>

      {/* =========================================================================
          --- MODAL 1: PRODUCT CUSTOMIZATION DIALOG (MASSONI CINEMATIC DNA) ---
          ========================================================================= */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg max-h-[90vh] bg-card rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-fadeIn border border-border">
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/55 text-white hover:bg-black/80 transition-colors cursor-pointer shadow-md"
            >
              <X className="size-5" />
            </button>

            {/* Cinematic Hero Banner with Caribbean Ital Culinary Typography */}
            <div className="relative h-56 w-full bg-muted shrink-0 overflow-hidden">
              <img 
                src={selectedProduct?.image || '/images/vegan-feast-hero.jpg'} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover" 
              />
              <div className="hero-shade absolute inset-0" />
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <p className="text-xs font-display italic text-amber-300 font-semibold tracking-wide">
                  {selectedProduct.badge || '100% Vegan'} • Queens, NY Heritage
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  {selectedProduct.name}
                </h3>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-foreground">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Island Spice & Preparation Style Selector */}
              {selectedProduct.hasprepStyle && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
                    <span>Select preparation style </span>
                    <span className="text-primary font-semibold text-[11px]">* Required</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SPICE_LEVELS.map((spice) => {
                      const isSelected = modalSpice === spice.id;
                      return (
                        <button
                          key={spice.id}
                          type="button"
                          onClick={() => setModalSpice(spice.id)}
                          className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                            isSelected 
                              ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs ring-1 ring-primary/40' 
                              : 'border-border hover:bg-muted/50 text-foreground'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span 
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: spice.color }}
                            />
                            <span className="truncate">{spice.name.split('(')[0]}</span>
                          </div>
                          {isSelected && <Check className="size-4 text-primary shrink-0" />}
                        </button>);
                    })}
                  </div>
                </div>)}

              {/* Rice Selection - Only for Protein Platters & Entrees that include rice */}
              {(selectedProduct.category === 'proteins' || selectedProduct.hasRice) && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
                    <span>Choice of Rice</span>
                    <span className="text-accent font-semibold text-[11px]">Included</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      'Jamaican Rice & Peas',
                      'Yellow Rice',
                      'No Rice'
                    ].map((rice) => {
                      const isSelected = modalRice === rice;
                      return (
                        <button
                          key={rice}
                          type="button"
                          onClick={() => setModalRice(rice)}
                          className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-center cursor-pointer ${
                            isSelected
                              ? 'border-primary bg-primary text-white font-bold shadow-sm'
                              : 'border-border bg-card hover:bg-muted/50 text-foreground font-medium'
                          }`}
                        >
                          <span className="block text-[11px] leading-tight font-medium">{rice}</span>
                        </button>);
                    })}
                  </div>
                </div>)}

              {/* Chef Extras & Add-ons */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  Chef Extras &amp; Add-ons 
                </label>
                <div className="space-y-1.5">
                  {[
                    { name: 'Extra Sweet Fried Plantains (4 pcs)', price: 3.50 },
                    { name: 'Extra Creamy Vegan Mac & Cheese Side', price: 4.00 },
                    { name: 'Extra House Jerk BBQ Sauce', price: 1.50 },
                    { name: 'Fresh Avocado Slices', price: 2.50 }
                  ].map((addon, idx) => {
                    const isChecked = modalAddOns.some(a => a.name === addon.name);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            setModalAddOns(modalAddOns.filter(a => a.name !== addon.name));
                          } else {
                            setModalAddOns([...modalAddOns, addon]);
                          }
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                          isChecked 
                            ? 'border-primary bg-primary/5 text-primary font-semibold ring-1 ring-primary/20' 
                            : 'border-border hover:bg-muted/50 text-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-primary border-primary text-white' : 'border-zinc-400'}`}>
                            {isChecked && <Check className="size-3" />}
                          </div>
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-bold text-accent">+${addon.price.toFixed(2)}</span>
                      </button>);
                  })}
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Special Notes / Dietary Requests
                </label>
                <textarea
                  value={modalInstructions}
                  onChange={(e) => setModalInstructions(e.target.value)}
                  placeholder="e.g. Scallions on side, extra crispy yellow croaker, broth extra hot..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-input text-xs focus:border-primary focus:outline-none bg-background text-foreground"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-muted/40 border-t border-border flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setModalQuantity(Math.max(1, modalQuantity - 1))}
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0.5"
                >
                  <Minus className="size-4" />
                </button>
                <span className="font-bold text-sm w-6 text-center font-mono">{modalQuantity}</span>
                <button
                  type="button"
                  onClick={() => setModalQuantity(modalQuantity + 1)}
                  className="text-muted-foreground hover:text-primary cursor-pointer p-0.5"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                variant="default"
                className="flex-1 font-bold text-xs sm:text-sm h-12 shadow-md rounded-2xl cursor-pointer"
              >
                <span>Add to Order</span>
                <span className="ml-2 font-mono">
                  ${((selectedProduct.price + modalAddOns.reduce((s, a) => s + a.price, 0)) * modalQuantity).toFixed(2)}
                </span>
              </Button>
            </div>

          </div>
        </div>)}

      {/* =========================================================================
          --- MODAL 2: SLIDE-OVER CART DRAWER (MASSONI TAKEOUT TRAY) ---
          ========================================================================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-card shadow-2xl flex flex-col text-foreground border-l border-border">
              
              <div className="p-6 border-b border-border bg-muted/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-xs">
                    <ShoppingBag className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold">Your Takeout Tray</h3>
                    <p className="text-xs text-muted-foreground">{cart.length} items in order</p>
                  </div>
                </div>
                <button 
                  onClick={() => setCartOpen(false)} 
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="p-4 bg-muted/20 border-b border-border">
                <div className="grid grid-cols-2 p-1 bg-card rounded-xl border border-border text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      orderType === 'pickup' 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <MapPin className="size-3.5" />
                    <span>Curbside Pickup (Free)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      orderType === 'delivery' 
                        ? 'bg-primary text-white shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Truck className="size-3.5" />
                    <span>Delivery ($4.99)</span>
                  </button>
                </div>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-2 px-1">
                  {orderType === 'pickup' ? (
                    <>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="size-3.5 text-accent" /> Ready in: <strong className="text-foreground">20–25 mins</strong>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                        <MapPin className="size-3" /> 132-09 Liberty Ave (Pickup)
                      </span>
                    </>) : (
                    <>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="size-3.5 text-accent" /> Estimated: <strong className="text-foreground">35–45 mins</strong>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                        <Truck className="size-3" /> To Your Door
                      </span>
                    </>)}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="size-12 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="font-display font-bold text-base text-foreground">Your tray is empty</p>
                    <p className="text-xs text-muted-foreground mt-1 mb-4">Add your favorite Caribbean vegan plates, burgers, or fresh cold-pressed juices.</p>
                    <Button 
                      onClick={() => {
                        setCartOpen(false);
                        const el = document.getElementById('menu');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }} 
                      variant="default" 
                      size="sm"
                      className="rounded-full font-bold text-xs"
                    >
                      Explore Menu
                    </Button>
                  </div>) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl border border-border bg-background flex gap-3 shadow-2xs">
                      <img src={item.image || '/images/vegan-curry-plate.jpg'} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0 border border-border/60" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-display font-bold text-xs truncate text-foreground">{item.name}</h4>
                          <span className="font-bold font-mono text-xs text-primary shrink-0">${(item.unitPrice * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5 space-y-0.5">
                          {item.prepStyle && <p className="text-primary font-semibold">Spice: {item.prepStyle.toUpperCase()}</p>}
                          {item.riceOption && <p>Rice: {item.riceOption}</p>}
                          {item.addOns?.length > 0 && <p className="text-accent font-medium">+{item.addOns.map(a => a.name).join(', ')}</p>}
                          {item.specialInstructions && <p className="italic">Note: "{item.specialInstructions}"</p>}
                        </div>

                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-border/50">
                          <div className="flex items-center gap-2 border border-border rounded-full px-2 py-0.5 text-xs bg-muted/20">
                            <button onClick={() => updateCartQuantity(item.cartItemId, -1)} className="text-muted-foreground hover:text-primary cursor-pointer p-0.5">
                              <Minus className="size-3" />
                            </button>
                            <span className="font-bold font-mono px-1 text-foreground">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.cartItemId, 1)} className="text-muted-foreground hover:text-primary cursor-pointer p-0.5">
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.cartItemId)} className="text-[11px] text-muted-foreground hover:text-red-600 flex items-center gap-1 cursor-pointer transition-colors">
                            <Trash2 className="size-3" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>)))}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-border bg-muted/20 space-y-3">
                  <form onSubmit={applyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder='Promo code (try "KOREA10")'
                      className="flex-1 p-2 rounded-xl border border-input text-xs uppercase font-semibold bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <Button type="submit" variant="secondary" size="sm" className="text-xs font-bold rounded-xl cursor-pointer">
                      Apply
                    </Button>
                  </form>
                  {promoMsg.text && (
                    <p className={`text-xs font-semibold ${promoMsg.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {promoMsg.text}
                    </p>)}

                  <div className="space-y-1 text-xs text-muted-foreground pt-2 border-t border-border">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-foreground font-mono">${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Discount ({discountCode} - {discountPercent}%)</span>
                        <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                      </div>)}
                    <div className="flex justify-between">
                      <span>LA County Sales Tax (9.5%)</span>
                      <span className="font-semibold text-foreground font-mono">${salesTax.toFixed(2)}</span>
                    </div>
                    {orderType === 'delivery' && (
                      <>
                        <div className="flex justify-between">
                          <span>Delivery Fee (South Richmond Hill Area)</span>
                          <span className="font-semibold text-foreground font-mono">${deliveryFee.toFixed(2)}</span>
                        </div>
                        {driverTip > 0 && (
                          <div className="flex justify-between">
                            <span>Driver Tip</span>
                            <span className="font-semibold text-foreground font-mono">${driverTip.toFixed(2)}</span>
                          </div>)}
                      </>)}
                    <div className="flex justify-between text-base font-bold text-foreground pt-1.5 border-t border-border">
                      <span>Total Due</span>
                      <span className="font-display text-primary text-lg font-mono">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => { setCartOpen(false); setCheckoutStep('details'); setCheckoutOpen(true); }}
                    variant="default"
                    className="w-full h-12 text-sm font-bold shadow-md rounded-xl cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </div>)}

            </div>
          </div>
        </div>)}

      {/* =========================================================================
          --- MODAL 3: CHECKOUT MODAL WITH KOREAN FEAST BANNER & DRIVER TIP CHIPS ---
          ========================================================================= */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden my-8 animate-fadeIn text-foreground border border-border">
            
            {/* Top Caribbean Feast Visual Banner Header */}
            <div className="relative h-44 w-full bg-muted overflow-hidden shrink-0">
              <img 
                src="/images/vegan-feast-hero.jpg" 
                alt="Caribbean Vegan Feast Table" 
                className="w-full h-full object-cover"
              />
              <div className="hero-shade absolute inset-0" />
              
              {checkoutStep !== 'confirmed' && (
                <button 
                  onClick={() => setCheckoutOpen(false)} 
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/55 text-white hover:bg-black/80 cursor-pointer transition-colors shadow-md"
                >
                  <X className="size-5" />
                </button>)}

              <div className="absolute bottom-3.5 left-5 right-5 text-white">
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
                     • South Richmond Hill Direct
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  {checkoutStep === 'confirmed' 
                    ? (confirmedOrder?.orderType === 'delivery' ? 'Delivery Order Confirmed!' : 'Pickup Order Confirmed!')
                    : (orderType === 'delivery' ? 'Local Delivery Checkout' : 'Curbside Pickup Checkout')}
                </h3>
              </div>
            </div>

            {checkoutStep !== 'confirmed' ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (checkoutStep === 'details') {
                  setCheckoutStep('payment');
                } else {
                  handleCompleteOrder(e);
                }
              }}>
                
                {/* 2-Step Navigation Tab Bar */}
                <div className="flex border-b border-border bg-muted/40 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('details')}
                    className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                      checkoutStep === 'details' 
                        ? 'border-primary text-primary bg-card' 
                        : 'border-transparent text-muted-foreground'
                    }`}
                  >
                    {orderType === 'delivery' ? '1. Delivery Details' : '1. Pickup Details'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { 
                      if (customerName && customerPhone && (orderType === 'pickup' || deliveryAddress.trim())) {
                        setCheckoutStep('payment'); 
                      }
                    }}
                    className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                      checkoutStep === 'payment' 
                        ? 'border-primary text-primary bg-card' 
                        : 'border-transparent text-muted-foreground'
                    }`}
                  >
                    2. Payment &amp; Submit
                  </button>
                </div>

                <div className="p-6 space-y-4 max-h-[58vh] overflow-y-auto">
                  {checkoutStep === 'details' ? (
                    <div className="space-y-4">
                      
                      {/* Fulfillment Switcher */}
                      <div className="p-1 bg-muted/60 rounded-xl border border-border grid grid-cols-2 text-xs font-bold">
                        <button
                          type="button"
                          onClick={() => {
                            setOrderType('pickup');
                            if (paymentMethod === 'cod') setPaymentMethod('counter');
                          }}
                          className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            orderType === 'pickup' 
                              ? 'bg-primary text-white shadow-sm' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <MapPin className="size-3.5" />
                          <span>Curbside Pickup (Free)</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setOrderType('delivery');
                            if (paymentMethod === 'counter') setPaymentMethod('card');
                          }}
                          className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            orderType === 'delivery' 
                              ? 'bg-primary text-white shadow-sm' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Truck className="size-3.5" />
                          <span>Doorstep Delivery ($4.99)</span>
                        </button>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                              Full Name <span className="text-primary">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={customerName}
                              onChange={(e) => setCustomerName(e.target.value)}
                              placeholder="e.g. Marcus Campbell"
                              className="w-full p-2.5 rounded-xl border border-input text-xs bg-background focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                              Phone Number <span className="text-primary">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={customerPhone}
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              placeholder="(718) 555-0199"
                              className="w-full p-2.5 rounded-xl border border-input text-xs bg-background focus:border-primary focus:outline-none"
                            />
                            <span className="text-[10px] text-muted-foreground mt-0.5 block">
                              {orderType === 'delivery' ? 'Used for driver delivery notifications' : 'Used for pickup readiness SMS'}
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                            Email Address (Receipt)
                          </label>
                          <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            placeholder="marcus@example.com"
                            className="w-full p-2.5 rounded-xl border border-input text-xs bg-background focus:border-primary focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* PICKUP SPECIFIC SECTION */}
                      {orderType === 'pickup' && (
                        <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                          <div className="flex items-start gap-2.5">
                            <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-xs text-foreground block">Pickup Counter &amp; Curbside Bay</span>
                              <p className="text-xs font-semibold text-primary">132-09 Liberty Ave, South Richmond Hill, NY 11419</p>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                Designated free parking in rear lot. Come right in or text us and we'll bring it to your car!
                              </p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                              Pickup Time Preference
                            </label>
                            <select
                              value={pickupTime}
                              onChange={(e) => setPickupTime(e.target.value)}
                              className="w-full p-2.5 rounded-xl border border-input text-xs bg-background focus:border-primary focus:outline-none font-medium"
                            >
                              <option value="ASAP (Ready in 15-20 mins)">ASAP (Ready in 15-20 mins)</option>
                              <option value="Today in 35 mins">Today in 35 mins</option>
                              <option value="Today in 50 mins">Today in 50 mins</option>
                              <option value="Today in 1 hour 15 mins">Today in 1 hour 15 mins</option>
                            </select>
                          </div>
                        </div>)}

                      {/* DELIVERY SPECIFIC SECTION WITH INTERACTIVE TIP CHIPS */}
                      {orderType === 'delivery' && (
                        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                            <Truck className="size-4 text-amber-700" />
                            <span>South Richmond Hill Doorstep Delivery Information</span>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                              Street Address <span className="text-primary">*</span>
                            </label>
                            <div className="relative">
                              <Home className="size-4 absolute left-3 top-3 text-muted-foreground" />
                              <input
                                type="text"
                                required
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                placeholder="e.g. 104-20 Liberty Ave"
                                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-input text-xs bg-background focus:border-primary focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                              Apt / Suite / Gate Code
                            </label>
                            <input
                              type="text"
                              value={deliveryApt}
                              onChange={(e) => setDeliveryApt(e.target.value)}
                              placeholder="Apt 4B / Callbox #12"
                              className="w-full p-2.5 rounded-xl border border-input text-xs bg-background focus:border-primary focus:outline-none"
                            />
                          </div>

                          {/* DEDICATED PROMINENT DRIVER TIP CHIPS SECTION */}
                          <div className="pt-2 border-t border-amber-500/20">
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                                Driver Tip 
                              </label>
                              <span className="text-[11px] font-semibold text-amber-700">
                                100% directly to your local driver
                              </span>
                            </div>

                            {/* Tip Chip Buttons */}
                            <div className="grid grid-cols-5 gap-1.5">
                              {[
                                { label: '$3.00', value: 3.00 },
                                { label: '$4.00', value: 4.00 },
                                { label: '$5.00', value: 5.00 },
                                { label: '$7.00', value: 7.00 }
                              ].map((tip) => {
                                const isSelected = !isCustomTip && driverTip === tip.value;
                                return (
                                  <button
                                    key={tip.label}
                                    type="button"
                                    onClick={() => handleSelectTip(tip.value)}
                                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                                      isSelected 
                                        ? 'bg-primary text-white shadow-sm ring-2 ring-primary/30' 
                                        : 'bg-card border border-amber-500/30 text-foreground hover:bg-amber-100/50'
                                    }`}
                                  >
                                    {tip.label}
                                  </button>);
                              })}

                              {/* Custom Tip Chip */}
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCustomTip(true);
                                  if (!customTipInput) {
                                    setCustomTipInput('6.00');
                                    setDriverTip(6.00);
                                  }
                                }}
                                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                                  isCustomTip 
                                    ? 'bg-primary text-white shadow-sm ring-2 ring-primary/30' 
                                    : 'bg-card border border-amber-500/30 text-foreground hover:bg-amber-100/50'
                                }`}
                              >
                                Custom
                              </button>
                            </div>

                            {/* Custom Tip Input if active */}
                            {isCustomTip && (
                              <div className="mt-2.5 flex items-center gap-2 bg-card p-2 rounded-xl border border-primary/40 animate-fadeIn">
                                <span className="font-bold text-xs text-primary">$</span>
                                <input
                                  type="number"
                                  step="0.50"
                                  min="0"
                                  value={customTipInput}
                                  onChange={(e) => handleCustomTipChange(e.target.value)}
                                  placeholder="Enter custom tip (e.g. 8.00)"
                                  className="w-full text-xs font-mono font-bold bg-transparent focus:outline-none"
                                />
                                <span className="text-[11px] text-muted-foreground whitespace-nowrap">Custom Tip</span>
                              </div>)}
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                              Driver Dropoff Notes
                            </label>
                            <input
                              type="text"
                              value={deliveryNotes}
                              onChange={(e) => setDeliveryNotes(e.target.value)}
                              placeholder="Leave at front door, ring doorbell, lobby front desk..."
                              className="w-full p-2.5 rounded-xl border border-input text-xs bg-background focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>)}

                      {/* General Kitchen Notes */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          Special Kitchen Requests
                        </label>
                        <input
                          type="text"
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          placeholder="Extra Sides, chopsticks for 3 people, sauce on side..."
                          className="w-full p-2.5 rounded-xl border border-input text-xs bg-background focus:border-primary focus:outline-none"
                        />
                      </div>

                    </div>) : (
                    /* STEP 2: PAYMENT & SUBMISSION */
                    <div className="space-y-4">
                      
                      {/* Order Summary Recap Pill */}
                      <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs space-y-1.5">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Items Subtotal:</span>
                          <span className="font-semibold text-foreground font-mono">${subtotal.toFixed(2)}</span>
                        </div>
                        {discountAmount > 0 && (
                          <div className="flex justify-between text-emerald-600 font-semibold">
                            <span>Promo Discount:</span>
                            <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                          </div>)}
                        <div className="flex justify-between text-muted-foreground">
                          <span>Sales Tax (8.875%):</span>
                          <span className="font-mono">${salesTax.toFixed(2)}</span>
                        </div>
                        {orderType === 'delivery' && (
                          <div className="flex justify-between text-muted-foreground">
                            <span>Delivery + Tip (${driverTip.toFixed(2)}):</span>
                            <span className="font-mono">${(deliveryFee + driverTip).toFixed(2)}</span>
                          </div>)}
                        <div className="flex justify-between text-sm font-bold text-foreground pt-1.5 border-t border-border">
                          <span>Total to Pay:</span>
                          <span className="font-display text-primary text-base font-mono">${grandTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Payment Method Selector Grid */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                          Select Payment Method
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('card')}
                            className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                              paymentMethod === 'card' 
                                ? 'border-primary bg-primary/10 text-primary shadow-2xs' 
                                : 'border-border text-foreground hover:bg-muted/40'
                            }`}
                          >
                            <CreditCard className="size-4 mx-auto mb-1 text-accent" />
                            Credit Card
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setPaymentMethod('applepay')}
                            className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                              paymentMethod === 'applepay' 
                                ? 'border-primary bg-primary/10 text-primary shadow-2xs' 
                                : 'border-border text-foreground hover:bg-muted/40'
                            }`}
                          >
                            <span className="block text-sm"> / G Pay</span>
                            Digital Wallet
                          </button>

                          {orderType === 'delivery' ? (
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('cod')}
                              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                                paymentMethod === 'cod' 
                                  ? 'border-primary bg-primary/10 text-primary shadow-2xs' 
                                  : 'border-border text-foreground hover:bg-muted/40'
                              }`}
                            >
                              <Banknote className="size-4 mx-auto mb-1 text-accent" />
                              Cash on Delivery
                            </button>) : (
                            <button
                              type="button"
                              onClick={() => setPaymentMethod('counter')}
                              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer ${
                                paymentMethod === 'counter' 
                                  ? 'border-primary bg-primary/10 text-primary shadow-2xs' 
                                  : 'border-border text-foreground hover:bg-muted/40'
                              }`}
                            >
                              <MapPin className="size-4 mx-auto mb-1 text-accent" />
                              Pay at Pickup
                            </button>)}
                        </div>
                      </div>

                      {/* Simulated Card Form */}
                      {paymentMethod === 'card' && (
                        <div className="p-3.5 rounded-xl bg-muted/30 border border-border space-y-2.5 text-xs">
                          <div>
                            <span className="text-muted-foreground block mb-1 font-semibold">Card Number (Simulated)</span>
                            <input 
                              type="text" 
                              readOnly 
                              value="4242 •••• •••• 8833" 
                              className="w-full p-2 rounded-lg border border-input font-mono bg-card text-foreground" 
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-muted-foreground block mb-1 font-semibold">Exp Date</span>
                              <input 
                                type="text" 
                                readOnly 
                                value="09/28" 
                                className="w-full p-2 rounded-lg border border-input font-mono bg-card text-foreground" 
                              />
                            </div>
                            <div>
                              <span className="text-muted-foreground block mb-1 font-semibold">CVC</span>
                              <input 
                                type="text" 
                                readOnly 
                                value="789" 
                                className="w-full p-2 rounded-lg border border-input font-mono bg-card text-foreground" 
                              />
                            </div>
                          </div>
                          <p className="text-[11px] text-emerald-700 flex items-center gap-1 pt-1 font-semibold">
                            <ShieldCheck className="size-3.5" /> 256-Bit SSL Encrypted Direct Checkout
                          </p>
                        </div>)}

                    </div>)}
                </div>

                {/* Modal Footer Controls */}
                <div className="p-4 bg-muted/40 border-t border-border flex justify-between gap-3">
                  {checkoutStep === 'payment' ? (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCheckoutStep('details')}
                      className="rounded-xl text-xs font-bold"
                    >
                      Back
                    </Button>) : (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCheckoutOpen(false)}
                      className="rounded-xl text-xs font-bold"
                    >
                      Cancel
                    </Button>)}

                  {checkoutStep === 'details' ? (
                    <Button 
                      type="submit" 
                      variant="default" 
                      size="sm" 
                      className="flex-1 font-bold rounded-xl text-xs shadow-sm"
                    >
                      Continue to Payment &rarr;
                    </Button>) : (
                    <Button 
                      type="submit" 
                      variant="default" 
                      size="sm" 
                      className="flex-1 font-bold rounded-xl text-xs shadow-md"
                    >
                      Place Order • ${grandTotal.toFixed(2)}
                    </Button>)}
                </div>

              </form>) : (
              /* STEP 3: ORDER CONFIRMED */
              <div className="p-6 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="size-9" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-1.5">
                    ORDER ID: {confirmedOrder?.orderNumber}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Respect & One Love, {confirmedOrder?.customerName}!
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    {confirmedOrder?.orderType === 'delivery'
                      ? 'Your order has been transmitted directly to Veggie Castle II\'s kitchen and our driver is preparing for dispatch.'
                      : 'Your piping hot Caribbean vegan feast and fresh cold-pressed juices are now being handcrafted with love for curbside pickup.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 text-left text-xs space-y-2 border border-border">
                  <div className="flex justify-between font-bold">
                    <span>{confirmedOrder?.orderType === 'delivery' ? 'Estimated Delivery Window:' : 'Estimated Ready Time:'}</span>
                    <span className="text-primary font-mono">{confirmedOrder?.fulfillmentTime}</span>
                  </div>

                  {confirmedOrder?.orderType === 'delivery' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Delivery Destination:</span>
                        <span className="font-semibold text-right max-w-[60%] truncate">
                          {confirmedOrder?.deliveryAddress}{confirmedOrder?.deliveryApt ? `, ${confirmedOrder.deliveryApt}` : ''} ({confirmedOrder?.deliveryZip})
                        </span>
                      </div>
                      {confirmedOrder?.deliveryNotes && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Driver Note:</span>
                          <span className="italic text-right max-w-[60%]">"{confirmedOrder.deliveryNotes}"</span>
                        </div>)}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status Updates:</span>
                        <span>Sent via SMS to {confirmedOrder?.customerPhone}</span>
                      </div>
                    </>) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pickup Counter:</span>
                        <span>132-09 Liberty Ave, South Richmond Hill, NY 11419</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Curbside Bay:</span>
                        <span className="text-emerald-700 font-bold">Free Rear Customer Lot • Call (718) 641-8342</span>
                      </div>
                    </>)}

                  <div className="flex justify-between pt-1 border-t border-border">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-semibold">
                      {confirmedOrder?.paymentMethod === 'cod' 
                        ? 'Cash upon Delivery' 
                        : confirmedOrder?.paymentMethod === 'counter' 
                        ? 'Pay at Pickup Counter' 
                        : confirmedOrder?.paymentMethod === 'applepay'
                        ? 'Digital Wallet ( / G Pay)'
                        : 'Credit Card (Paid Online)'}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-bold pt-1 border-t border-border">
                    <span>Total {confirmedOrder?.paymentMethod === 'cod' || confirmedOrder?.paymentMethod === 'counter' ? 'Due' : 'Paid'}:</span>
                    <span className="font-display text-primary font-mono">${confirmedOrder?.grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => window.print()} 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    <Printer className="size-3.5 mr-1" /> Print Receipt
                  </Button>
                  <Button 
                    onClick={() => setCheckoutOpen(false)} 
                    variant="default" 
                    size="sm" 
                    className="flex-1 font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Back to Menu
                  </Button>
                </div>
              </div>)}

          </div>
        </div>)}

      {/* =========================================================================
          --- MODAL 4: TABLE RESERVATION MODAL WITH KOREAN DINING ROOM PHOTO BANNER ---
          ========================================================================= */}
      {reserveOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl overflow-hidden my-8 animate-fadeIn text-foreground border border-border">
            
            {/* Cinematic Caribbean Dining Room Interior Header Banner */}
            <div className="relative h-48 w-full bg-muted overflow-hidden shrink-0">
              <img 
                src="/images/vegan-hero-bg.jpg" 
                alt="Veggie Castle II Caribbean Vegan Dining Room" 
                className="w-full h-full object-cover"
              />
              <div className="hero-shade absolute inset-0" />
              
              <button 
                onClick={() => {
                  setReserveOpen(false);
                  setReserveConfirmed(false);
                }} 
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/55 text-white hover:bg-black/80 cursor-pointer transition-colors shadow-md"
              >
                <X className="size-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <p className="text-xs font-display italic text-amber-300 font-semibold tracking-wide">
                      • 132-09 Liberty Ave, South Richmond Hill, Queens
                </p>
                <h3 className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                  Table Reservation 
                </h3>
              </div>
            </div>

            {!reserveConfirmed ? (
              <form onSubmit={handleBookReservation} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">Date</label>
                    <input 
                      type="date" 
                      required 
                      value={reserveDate} 
                      onChange={(e) => setReserveDate(e.target.value)} 
                      className="w-full p-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:border-primary font-medium" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">Time</label>
                    <select 
                      value={reserveTime} 
                      onChange={(e) => setReserveTime(e.target.value)} 
                      className="w-full p-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:border-primary font-medium" 
                    >
                      <option value="11:30 AM">11:30 AM (Lunch)</option>
                      <option value="12:00 PM">12:00 PM (Lunch)</option>
                      <option value="1:00 PM">1:00 PM (Lunch)</option>
                      <option value="5:00 PM">5:00 PM (Dinner)</option>
                      <option value="5:30 PM">5:30 PM (Dinner)</option>
                      <option value="6:00 PM">6:00 PM (Dinner)</option>
                      <option value="6:30 PM">6:30 PM (Dinner)</option>
                      <option value="7:00 PM">7:00 PM (Dinner)</option>
                      <option value="7:30 PM">7:30 PM (Dinner)</option>
                      <option value="8:00 PM">8:00 PM (Dinner)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">Party Size</label>
                    <select 
                      value={reserveGuests} 
                      onChange={(e) => setReserveGuests(e.target.value)} 
                      className="w-full p-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:border-primary font-medium" 
                    >
                      <option value="1 Guest">1 Guest</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="3 Guests">3 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="6 Guests">6 Guests</option>
                      <option value="8+ Large Party">8+ Large Party</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">Seating Area</label>
                    <select 
                      value={reserveSeating} 
                      onChange={(e) => setReserveSeating(e.target.value)} 
                      className="w-full p-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:border-primary font-medium" 
                    >
                      <option value="Indoor Seating">Indoor Seating</option>
                      <option value="Cozy Window Booth">Cozy Window Booth</option>
                      <option value="Traditional Low Table (Ondol)">Traditional Low Table (Ondol)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">Dining Occasion</label>
                    <select 
                      value={reserveOccasion} 
                      onChange={(e) => setReserveOccasion(e.target.value)} 
                      className="w-full p-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:border-primary font-medium" 
                    >
                      <option value="Casual Dinner">Casual Dinner</option>
                      <option value="Family Gathering">Family Gathering</option>
                      <option value="Birthday Celebration">Birthday Celebration</option>
                      <option value="K-Town Business Lunch">K-Town Business Lunch</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-border space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
                      Guest Full Name <span className="text-primary">*</span>
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={reserveName} 
                      onChange={(e) => setReserveName(e.target.value)} 
                      placeholder="Your full name" 
                      className="w-full p-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:border-primary" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
                      Mobile Phone (SMS Confirmation) <span className="text-primary">*</span>
                    </label>
                    <input 
                      type="tel" 
                      required 
                      value={reservePhone} 
                      onChange={(e) => setReservePhone(e.target.value)} 
                      placeholder="(213) 555-0199" 
                      className="w-full p-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:border-primary" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-muted-foreground mb-1">
                      Special Requests (Booster seats, dietary notes)
                    </label>
                    <input 
                      type="text" 
                      value={reserveNotes} 
                      onChange={(e) => setReserveNotes(e.target.value)} 
                      placeholder="e.g. Baby booster seat, celebrating a birthday..." 
                      className="w-full p-2.5 rounded-xl border border-input text-xs bg-background text-foreground focus:outline-none focus:border-primary" 
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-between gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setReserveOpen(false)}
                    className="rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="default" 
                    size="sm" 
                    className="flex-1 font-bold rounded-xl text-xs shadow-md cursor-pointer"
                  >
                    Confirm Table Reservation
                  </Button>
                </div>
              </form>) : (
              /* RESERVATION CONFIRMED FINALE */
              <div className="p-6 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="size-9" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-1.5">
                    CONFIRMATION: {confirmedResCode}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Table Reserved, {reserveName}!
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    We look forward to serving you an authentic bubbling Plant-Based &amp; Vegan experience in our traditional dining room.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/40 text-left text-xs space-y-2 border border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date &amp; Time:</span>
                    <span className="font-bold text-foreground">{reserveDate} at {reserveTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Party Size:</span>
                    <span className="font-bold text-accent">{reserveGuests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seating:</span>
                    <span>{reserveSeating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">132-09 Liberty Ave, South Richmond Hill, NY 11419</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parking:</span>
                    <span className="text-emerald-700 font-bold">Free Customer Lot in Rear</span>
                  </div>
                </div>

                <Button
                  variant="default"
                  onClick={() => {
                    setReserveOpen(false);
                    setReserveConfirmed(false);
                  }}
                  className="rounded-xl text-xs font-bold px-8 shadow-sm cursor-pointer"
                >
                  Done
                </Button>
              </div>)}

          </div>
        </div>)}

      {/* 16. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-24 lg:bottom-20 right-6 z-50 bg-[#1C1716] text-white px-4 py-3 rounded-2xl shadow-xl border border-accent/40 flex items-center gap-3 animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>)}

      {/* 11. MOBILE THUMB-ZONE ERGONOMIC CONVERSION BAR (Fixed Bottom for Phones) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border px-3 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.12)] flex items-center justify-between gap-2 safe-area-pb"
        aria-label="Quick Mobile Actions"
      >
        <a
          href={`tel:${RESTAURANT_INFO.phoneRaw}`}
          className="flex-1 flex flex-col items-center justify-center h-12 rounded-xl bg-muted/80 text-foreground font-semibold text-[11px] border border-border/80 active:bg-muted"
          title="Direct Call Veggie Castle II"
        >
          <Phone className="size-4 text-accent mb-0.5" />
          <span>Call</span>
        </a>

        <a
          href={RESTAURANT_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center h-12 rounded-xl bg-muted/80 text-foreground font-semibold text-[11px] border border-border/80 active:bg-muted"
          title="Open Directions in Google Maps"
        >
          <MapPin className="size-4 text-primary mb-0.5" />
          <span>Map</span>
        </a>

        <button
          type="button"
          onClick={() => {
            if (cartItemCount > 0) {
              setCartOpen(true);
            } else {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex-[2.2] flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-white font-bold text-xs shadow-md active:scale-98 transition-transform cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="size-4 text-white" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white text-[9px] font-black ring-1 ring-white">
                {cartItemCount}
              </span>
            )}
          </div>
          <span>
            {cartItemCount > 0 ? `Cart (${cartItemCount}) • $${subtotal.toFixed(2)}` : 'Order Now • ~15m'}
          </span>
        </button>
      </nav>

    </main>);
}



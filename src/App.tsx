/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence
} from "motion/react";
import {
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Phone,
  Instagram,
  Check,
  Sparkles,
  Info,
  Trash2,
  ArrowRight,
  Heart,
  Briefcase,
  Gift
} from "lucide-react";
import {
  Product,
  TREASURES,
  COLLECTIONS,
  OBSIDIAN_PRODUCT,
  EXCLUSIVE_FLAVORS,
  LOGO_URL
} from "./data";

interface CartItem {
  product: Product;
  quantity: number;
}

interface guestFeedback {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  likes: number;
}

export default function App() {
  // Cart States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'success'>('cart');
  const [shippingForm, setShippingForm] = useState({ name: "", phone: "", address: "", pin: "" });
  const [paymentForm, setPaymentForm] = useState({ cardNo: "", cardExpiry: "", cardCVV: "" });
  const [isProcessingCheckout, setIsProcessingCheckout] = useState(false);

  // Selected Product (Quick View Modal)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Feedback State
  const [feedbacks, setFeedbacks] = useState<guestFeedback[]>([
    {
      id: "init-1",
      name: "Sienna Moretti",
      email: "sienna@luxuryconfections.it",
      message: "The Berry Satin is unlike anything I have ever eaten. The transition from the delicate outer shell to the wild strawberry infusion is brilliant. Truly an artistic masterpiece!",
      createdAt: "Today at 3:15 PM",
      likes: 12
    },
    {
      id: "init-2",
      name: "Rajesh Iyer",
      email: "rajesh.iyer@mumbai.in",
      message: "Exquisite presentation and very deep flavors. The Buttered Elixir with fleur de sel has that perfect hint of aged butter and sea salt that hits the palate just right.",
      createdAt: "Yesterday",
      likes: 8
    }
  ]);
  const [feedbackInput, setFeedbackInput] = useState({ name: "", email: "", message: "" });
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Sticky Navbar State
  const [isNavbarGlass, setIsNavbarGlass] = useState(false);

  // Active section tracking for visual underline
  const [activeSection, setActiveSection] = useState("hero");

  // Horizontal scroll container references
  const collectionsScrollRef = useRef<HTMLDivElement>(null);
  const flavorsScrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Toast notifications for additions
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll and glass nav listener
  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarGlass(window.scrollY > 50);

      // Simple active section check
      const sections = ["treasures", "collections", "obsidian", "story", "feedback"];
      let currentSection = "hero";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Particle background canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ["#D4AF37", "#e9c349", "#f2ca50", "#735c00"];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(45, Math.floor(canvas.width / 35));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 0.4 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.45 + 0.1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.008
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speed;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(p.size, p.size / 2);
        ctx.lineTo(p.size / 2, p.size);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    // Use ResizeObserver for responsive resizing of the background canvas
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Cart helper functions
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }
      return [...prevCart, { product, quantity }];
    });
    triggerToast(`Added ${quantity}x ${product.name} to your shopping bag.`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, amount: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const nextQuantity = item.quantity + amount;
            return { ...item, quantity: Math.max(1, nextQuantity) };
          }
          return item;
        })
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountApplied(false);
  };

  // Pricing calculations
  const subtotal = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  const discount = discountApplied ? Math.round(subtotal * 0.15) : 0;
  const delivery = subtotal > 150 ? 0 : 40;
  const total = subtotal - discount + delivery;

  const checkoutCartItemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Form handle submit
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.name || !feedbackInput.email || !feedbackInput.message) return;

    const newFeedback: guestFeedback = {
      id: "feed-" + Date.now(),
      name: feedbackInput.name,
      email: feedbackInput.email,
      message: feedbackInput.message,
      createdAt: "Just now",
      likes: 0
    };

    setFeedbacks([newFeedback, ...feedbacks]);

    // Send email to davidsonnj2009@gmail.com using client mailto redirection
    const subject = `Candélisse Website Feedback from ${feedbackInput.name}`;
    const body = `Dear G. Davidson Nathaniel Joshua / Candélisse Team,\n\nI am submitting the following feedback / complaint regarding Candélisse.\n\nFrom: ${feedbackInput.name}\nEmail: ${feedbackInput.email}\n\nMessage:\n${feedbackInput.message}\n\nBest regards,\n${feedbackInput.name}`;
    
    const mailtoUrl = `mailto:davidsonnj2009@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;

    setFeedbackInput({ name: "", email: "", message: "" });
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
    }, 4500);
  };

  const likeFeedback = (id: string) => {
    setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, likes: f.likes + 1 } : f));
  };

  // Scroll helpers
  const handleScrollClick = (ref: React.RefObject<HTMLDivElement | null>, amount: number) => {
    if (ref.current) {
      ref.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  // Start Simulated Checkout
  const runSimulatedCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingCheckout(true);
    setTimeout(() => {
      setIsProcessingCheckout(false);
      setCheckoutStep('success');
      clearCart();
    }, 2500);
  };

  return (
    <div className="relative min-h-screen bg-black text-[#e3e2e2] font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      
      {/* Background Canvas Particles */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Elegant Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] max-w-sm bg-[#1b1c1c] border border-primary/30 p-4 shadow-2xl rounded-lg flex items-center space-x-3 backdrop-blur-md"
          >
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">Confectionery Alert</p>
              <p className="text-sm text-gray-200 mt-0.5">{toastMessage}</p>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavbarGlass ? "bg-black/80 backdrop-blur-xl border-b border-outline/10 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop flex justify-between items-center">
          <a href="#" className="font-serif text-2xl md:text-2xl text-primary tracking-widest hover:opacity-85 transition-opacity">
            Candélisse
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-10 text-xs font-semibold uppercase tracking-[0.2em]">
            <a
              href="#treasures"
              className={`transition-colors duration-300 py-1 border-b-2 ${
                activeSection === "treasures" ? "text-primary border-primary" : "text-[#d0c5af] border-transparent hover:text-primary"
              }`}
            >
              Treasures
            </a>
            <a
              href="#collections"
              className={`transition-colors duration-300 py-1 border-b-2 ${
                activeSection === "collections" ? "text-primary border-primary" : "text-[#d0c5af] border-transparent hover:text-primary"
              }`}
            >
              Collections
            </a>
            <a
              href="#obsidian"
              className={`transition-colors duration-300 py-1 border-b-2 ${
                activeSection === "obsidian" ? "text-primary border-primary" : "text-[#d0c5af] border-transparent hover:text-primary"
              }`}
            >
              Obsidian
            </a>
            <a
              href="#story"
              className={`transition-colors duration-300 py-1 border-b-2 ${
                activeSection === "story" ? "text-primary border-primary" : "text-[#d0c5af] border-transparent hover:text-primary"
              }`}
            >
              Our Story
            </a>
          </div>

          {/* Interactive shopping controller trigger */}
          <button
            onClick={() => {
              setCheckoutStep('cart');
              setIsCartOpen(true);
            }}
            className="group relative p-2 text-primary hover:scale-105 transition-all duration-300 cursor-pointer focus:outline-none"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-6 h-6 stroke-2" />
            {checkoutCartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black font-mono font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {checkoutCartItemCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10 pt-20">
        <div className="max-w-4xl space-y-10 mt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex justify-center"
          >
            <img
              alt="Candélisse Stamp Icon"
              src={LOGO_URL}
              className="w-48 md:w-56 transition-transform duration-1000 hover:scale-[1.03] mt-4"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-primary tracking-wide leading-tight px-2">
              Unwrap Pure Indulgence
            </h1>
            <p className="font-sans text-base sm:text-lg text-[#d0c5af] max-w-2xl mx-auto italic leading-relaxed">
              A sensory journey through the world's most exquisite confectionery craftsmanship.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-6"
          >
            <a
              href="#treasures"
              className="inline-block bg-transparent border border-primary text-primary px-10 sm:px-12 py-3.5 sm:py-4 text-xs font-semibold tracking-[0.2em] hover:bg-primary hover:text-[#241a00] hover:shadow-[0_0_30px_rgba(242,202,80,0.2)] transition-all duration-500 uppercase"
            >
              Explore the Menu
            </a>
          </motion.div>
        </div>

        {/* Floating Mouse Reminder */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#d0c5af]">Scroll to discover</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </header>

      {/* INDIVIDUAL TREASURES SECTION (THE ESSENTIALS) */}
      <section className="relative py-28 max-w-7xl mx-auto px-4 md:px-margin-desktop z-10" id="treasures">
        <div className="text-center mb-20 space-y-4">
          <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] font-semibold block animate-pulse">
            The Essentials
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#e3e2e2] tracking-wide">
            Individual Treasures
          </h2>
          <div className="w-16 h-0.5 bg-primary/40 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-16">
          {TREASURES.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col justify-between"
            >
              <div>
                {/* Image Wrap */}
                <div 
                  onClick={() => setSelectedProduct(item)}
                  className="cursor-pointer relative aspect-square bg-[#1b1c1c] border border-outline/10 flex items-center justify-center transition-all duration-500 hover:border-primary/40 gold-glow overflow-hidden group-hover:shadow-[0_4px_30px_rgba(212,175,55,0.05)]"
                >
                  <img
                    alt={item.name}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 select-none"
                    src={item.image}
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#e3e2e2] bg-[#121414]/90 border border-primary/40 px-4 py-2 hover:bg-primary hover:text-black transition-colors rounded-sm">
                      Inspect Details
                    </span>
                  </div>
                </div>

                <div className="mt-8 text-center px-4 self-grow">
                  <h3 className="font-serif text-xl sm:text-2xl text-primary mb-2 group-hover:text-primary-fixed duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm font-sans text-gray-400 leading-relaxed mb-4 min-h-[40px]">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price and Cart controls */}
              <div className="text-center px-4 mt-2 space-y-3">
                <span className="text-lg font-semibold text-[#e3e2e2] font-mono block">₹{item.price}</span>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="w-full sm:w-auto inline-flex items-center justify-center bg-transparent hover:bg-primary border border-primary/40 hover:border-primary text-primary hover:text-black font-semibold text-xs tracking-wider uppercase px-6 py-2.5 transition-all duration-300 rounded-sm"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add to Bag
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CURATED SETS SECTION (THE COLLECTIONS) */}
      <section className="relative py-28 bg-[#0d0e0f]/80 z-10 border-y border-[#1f2020]" id="collections">
        <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-gutter">
          <div className="space-y-3">
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] font-semibold block">
              Curated Sets
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e3e2e2] tracking-wide">
              The Collections
            </h2>
            <p className="text-sm font-sans text-[#d0c5af] italic max-w-lg leading-relaxed">
              Curated luxury boxes structured for every high-end occasion, designed meticulously to evoke absolute ecstasy.
            </p>
          </div>

          {/* Slide Buttons */}
          <div className="flex gap-4 self-end">
            <button
              onClick={() => handleScrollClick(collectionsScrollRef, -340)}
              className="w-11 h-11 border border-outline/20 hover:border-primary/50 text-white hover:text-primary flex items-center justify-center hover:bg-primary/5 transition-all rounded-full focus:outline-none"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScrollClick(collectionsScrollRef, 340)}
              className="w-11 h-11 border border-outline/20 hover:border-primary/50 text-white hover:text-primary flex items-center justify-center hover:bg-primary/5 transition-all rounded-full focus:outline-none"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={collectionsScrollRef}
          className="flex overflow-x-auto desktop-scroll-container gap-gutter px-4 md:px-margin-desktop pb-14 snap-x cursor-grab active:cursor-grabbing max-w-7xl mx-auto hide-scrollbar"
        >
          {COLLECTIONS.map((item) => (
            <div
              key={item.id}
              className="min-w-[80%] sm:min-w-[45%] lg:min-w-[31%] snap-center group flex flex-col justify-between"
            >
              <div 
                onClick={() => setSelectedProduct(item)}
                className="cursor-pointer relative aspect-[1.75] bg-[#1f2020] border border-outline/10 overflow-hidden rounded-sm"
              >
                <img
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src={item.image}
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover overlay explaining details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-1">Curated Box</span>
                  <h4 className="font-serif text-lg text-[#e3e2e2] mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-300 line-clamp-2 leading-normal mb-3">
                    {item.description}
                  </p>
                  <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold self-start hover:underline">
                    Quick Inspection →
                  </span>
                </div>
              </div>

              {/* Collection Controls */}
              <div className="mt-4 flex items-center justify-between px-2">
                <div>
                  <h3 className="font-serif text-base text-[#e3e2e2]">{item.name}</h3>
                  <span className="text-xs font-mono text-[#d0c5af]">Rs. {item.price} /box</span>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-transparent hover:bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 transition-colors duration-300 rounded-sm"
                >
                  Add Box
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE OBSIDIAN SELECTION (PEAK LUXURY) */}
      <section className="relative py-32 px-4 md:px-margin-desktop bg-black z-10" id="obsidian">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] font-semibold block animate-pulse">
              Peak Luxury
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary leading-tight">
              The Obsidian Selection
            </h2>
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl">
              An unprecedented exploration of taste. The Obsidian Selection features 12 masterfully crafted pieces: 
              <strong> 6 of our timeless classics</strong> expertly paired with <strong>6 exclusive, ultra-rare experimental flavors</strong>. 
              Each box is hand-packed in our signature dual-coated matte black lacquer casing, delivering supreme prestige.
            </p>

            <div className="border-l-2 border-primary/30 pl-4 py-1">
              <p className="text-xs font-mono text-[#d0c5af] max-w-md italic">
                "We limits production of the Obsidian lacquer cases to ensure each client experiences ultimate artisanal perfection."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 pt-4">
              <div>
                <span className="text-xs font-mono text-[#d0c5af] block tracking-wide uppercase">Prestige Pricing</span>
                <span className="text-2xl sm:text-3xl text-white font-serif tracking-tight">Rs. 370 <span className="text-xs font-mono text-[#d0c5af]">/box</span></span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(OBSIDIAN_PRODUCT)}
                  className="bg-primary text-[#241a00] hover:bg-primary-fixed px-10 sm:px-12 py-3.5 sm:py-4 text-xs font-semibold tracking-widest uppercase rounded-full hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] transition-all duration-300"
                >
                  Acquire Edition
                </button>
                <button
                  onClick={() => setSelectedProduct(OBSIDIAN_PRODUCT)}
                  className="px-6 py-3.5 sm:py-4 text-xs border border-outline/30 hover:border-primary text-gray-300 hover:text-white rounded-full transition-colors font-semibold"
                >
                  Inspect Box
                </button>
              </div>
            </div>
          </motion.div>

          {/* Interactive circular floating visual columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center p-4"
          >
            {/* Elegant halo circle background glow */}
            <div className="absolute w-[80%] h-[80%] bg-primary/5 rounded-full blur-[90px] animate-pulse" />
            <div className="absolute w-[60%] h-[60%] border border-primary/10 rounded-full animate-spin" style={{ animationDuration: "120s" }} />

            <div className="w-full max-h-[400px] md:max-h-[500px] overflow-hidden flex items-center justify-center z-10 transition-transform duration-1000 hover:scale-[1.03]">
              <img
                alt="The Obsidian Selection Box Close-up"
                className="w-full h-auto max-h-full object-contain pointer-events-none select-none"
                src={OBSIDIAN_PRODUCT.image}
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* LIMITED EDITIONS / EXCLUSIVE FLAVORS */}
      <section className="relative py-28 max-w-7xl mx-auto px-4 md:px-margin-desktop z-10">
        <div className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-gutter">
          <div className="space-y-3">
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] font-semibold block">
              Limited Editions
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e3e2e2] tracking-wide">
              Exclusive Flavors
            </h2>
            <p className="text-sm font-sans text-[#d0c5af] max-w-lg leading-relaxed">
              Rare, small-batch recipe designs integrated into our luxury bundles.
            </p>
          </div>

          <div className="flex gap-4 self-end">
            <button
              onClick={() => handleScrollClick(flavorsScrollRef, -320)}
              className="w-10 h-10 border border-outline/20 hover:border-primary text-white hover:text-primary flex items-center justify-center hover:bg-primary/5 transition-all rounded-full focus:outline-none"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScrollClick(flavorsScrollRef, 320)}
              className="w-10 h-10 border border-outline/20 hover:border-primary text-white hover:text-primary flex items-center justify-center hover:bg-primary/5 transition-all rounded-full focus:outline-none"
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Flavors Slider */}
        <div
          ref={flavorsScrollRef}
          className="flex overflow-x-auto desktop-scroll-container gap-gutter pb-10 snap-x cursor-grab active:cursor-grabbing hide-scrollbar"
        >
          {EXCLUSIVE_FLAVORS.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedProduct(item)}
              className="min-w-[70%] sm:min-w-[40%] lg:min-w-[30%] aspect-square bg-[#1b1c1c] border border-outline/10 snap-center overflow-hidden cursor-pointer relative group rounded-sm"
            >
              <img
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                src={item.image}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-1">Rare Craft</span>
                <h4 className="font-serif text-base text-white">{item.name}</h4>
                <p className="text-xs text-gray-300 mt-1 line-clamp-3 leading-normal">
                  {item.description}
                </p>
                <span className="text-[10px] font-mono text-primary font-bold mt-3 uppercase tracking-widest">
                  Read Monograph →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-l-2 border-primary/40 pl-6 space-y-1">
          <p className="text-sm font-sans italic text-gray-400">
            These exclusive flavors are curated specifically for active culinary bundles, and are not available for separate individual retail purchase.
          </p>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="relative py-28 bg-[#121414] px-4 md:px-margin-desktop border-t border-[#1f2020] z-10" id="story">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em] font-semibold block">
              Our Legacy
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#e3e2e2]">
              Our Story
            </h2>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mt-2 rounded-full" />
          </motion.div>

          <p className="font-sans text-base sm:text-[18px] text-[#d0c5af] leading-[1.8] italic font-light justify-center">
            "Hola! Thank you so much for visiting our page. I hope you like to view our products. Here you could find
            rare, exotic and exclusive flavours of candies that will please your cravings for sweets. If you want any
            suggestions, complaints or request, feel free to contact us and state your problems and we're pretty sure we
            will do our best to provide you further services or returns. Do follow our <a href="https://instagram.com/_candelisse_off" target="_blank" rel="noreferrer" className="text-primary hover:underline font-semibold">Instagram page</a> for more updates.
            Thank you once again."
          </p>

          <div className="space-y-2 pt-4">
            <p className="text-xs font-mono text-primary tracking-[0.3em] uppercase font-bold">
              G. Davidson Nathaniel Joshua
            </p>
            <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Founder & CEO of Candélisse
            </p>
          </div>
        </div>
      </section>

      {/* SHARE YOUR THOUGHTS COMPONENT */}
      <section className="relative py-28 px-4 md:px-margin-desktop max-w-7xl mx-auto z-10" id="feedback">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Column A: Information and Contact details */}
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-mono text-primary uppercase tracking-[0.25em] font-semibold block">
                Guestbook
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#e3e2e2] tracking-wide">
                Share Your Thoughts
              </h2>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-lg">
                We believe luxury is a continuous dialogue. Your feedback, suggestions, and cravings guide us in refining the Candélisse confectionery experience to absolute masterwork.
              </p>
            </div>

            {/* Direct Line Cards */}
            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/5 group-hover:border-primary transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">Direct Line</p>
                  <p className="text-base sm:text-lg text-white font-semibold font-mono tracking-wide">+91 9345338652</p>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary/5 group-hover:border-primary transition-all duration-300">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">Social Platform</p>
                  <a
                    href="https://instagram.com/_candelisse_off"
                    target="_blank"
                    rel="noreferrer"
                    className="text-base sm:text-lg text-primary hover:underline hover:text-primary-fixed block transition-colors font-semibold"
                  >
                    @_candelisse_off
                  </a>
                </div>
              </div>
            </div>

            {/* Simulated Live Ledger Section */}
            <div className="space-y-4 pt-6 border-t border-outline/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold flex items-center">
                  <Sparkles className="w-4 h-4 mr-1.5" /> Client Dialogue Ledger ({feedbacks.length})
                </span>
                <span className="text-[10px] font-mono text-gray-500">Persisted locally</span>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                  {feedbacks.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#1b1c1c] border border-outline/10 p-4 rounded-sm space-y-2 relative group"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <p className="font-semibold text-primary">{item.name}</p>
                        <p className="text-gray-500 font-mono text-[9px]">{item.createdAt}</p>
                      </div>
                      <p className="text-xs text-gray-300 leading-normal font-light">
                        {item.message}
                      </p>
                      <div className="flex justify-between items-center pt-1">
                        <button
                          onClick={() => likeFeedback(item.id)}
                          className="text-[10px] text-gray-400 hover:text-red-400 flex items-center space-x-1 font-mono transition-colors focus:outline-none"
                        >
                          <Heart className="w-3 h-3 fill-current text-red-500/20 group-hover:text-red-500/40" />
                          <span>Like ({item.likes})</span>
                        </button>
                        <span className="text-[9px] font-mono text-gray-600 truncate max-w-[120px]">{item.email}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Column B: Floating Label Contact Form */}
          <div className="bg-[#1f2020] border border-outline/15 p-8 md:p-12 relative flex flex-col justify-between rounded-sm">
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-10">
              
              <div className="relative">
                <input
                  required
                  type="text"
                  id="form-name"
                  placeholder=" "
                  value={feedbackInput.name}
                  onChange={(e) => setFeedbackInput({ ...feedbackInput, name: e.target.value })}
                  className="peer w-full bg-transparent border-0 border-b border-outline/30 focus:ring-0 focus:border-primary pt-6 pb-2 text-sm text-white transition-all placeholder-transparent focus:outline-none"
                />
                <label
                  htmlFor="form-name"
                  className="absolute left-0 top-6 text-[#d0c5af] text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  required
                  type="email"
                  id="form-email"
                  placeholder=" "
                  value={feedbackInput.email}
                  onChange={(e) => setFeedbackInput({ ...feedbackInput, email: e.target.value })}
                  className="peer w-full bg-transparent border-0 border-b border-outline/30 focus:ring-0 focus:border-primary pt-6 pb-2 text-sm text-white transition-all placeholder-transparent focus:outline-none"
                />
                <label
                  htmlFor="form-email"
                  className="absolute left-0 top-6 text-[#d0c5af] text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  required
                  id="form-message"
                  placeholder=" "
                  rows={4}
                  value={feedbackInput.message}
                  onChange={(e) => setFeedbackInput({ ...feedbackInput, message: e.target.value })}
                  className="peer w-full bg-transparent border-0 border-b border-outline/30 focus:ring-0 focus:border-primary pt-6 pb-2 text-sm text-white transition-all placeholder-transparent focus:outline-none resize-none"
                />
                <label
                  htmlFor="form-message"
                  className="absolute left-0 top-6 text-[#d0c5af] text-sm transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                >
                  Message
                </label>
              </div>

              {feedbackSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-primary/10 border border-primary/20 rounded text-xs text-primary flex items-center space-x-2"
                >
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Submission successful. Your entry has been recorded in our ledger! Thank you again.</span>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full py-4.5 bg-primary text-[#241a00] font-mono text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-all rounded-sm shadow-md"
              >
                Send Submission
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative w-full py-16 border-t border-outline/10 bg-[#0d0e0f] z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl md:text-2xl font-serif text-primary tracking-widest">
            Candélisse
          </div>
          <p className="text-xs text-[#d0c5af] text-center md:text-left font-mono">
            © 2024 Candélisse. Crafted with pristine confectionery pride for the Connoisseur.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* QUICK VIEW DETAILS MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Dark overlay backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Card Content container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-3xl bg-[#1b1c1c] border border-outline/20 p-6 md:p-8 rounded-lg overflow-hidden shadow-2xl z-20 flex flex-col md:flex-row gap-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Visual representation */}
              <div className="w-full md:w-1/2 flex items-center justify-center bg-[#121414] border border-outline/10 aspect-square md:aspect-auto md:min-h-[300px] rounded-md overflow-hidden relative">
                <img
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover select-none"
                  src={selectedProduct.image}
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute top-3 left-3 bg-black/70 px-3 py-1 font-mono text-[9px] text-[#ffe088] border border-primary/20 tracking-wider uppercase rounded">
                  {selectedProduct.type === 'obsidian' ? 'Matte Lacquer' : selectedProduct.type === 'collection' ? 'Collection' : selectedProduct.type === 'flavor' ? 'Obsidian-Exclusive' : 'Individual Asset'}
                </span>
              </div>

              {/* Right Column: Descriptions & Actions */}
              <div className="w-full md:w-1/2 flex flex-col justify-between py-1 space-y-6">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-primary leading-tight">
                    {selectedProduct.name}
                  </h3>
                  
                  {selectedProduct.type !== 'flavor' ? (
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xl font-semibold text-white font-mono">
                        {selectedProduct.type === 'treasure' ? `₹${selectedProduct.price}` : `Rs. ${selectedProduct.price}`}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">/ {selectedProduct.type === 'treasure' ? 'piece' : 'box'}</span>
                    </div>
                  ) : (
                    <div className="mt-2 text-primary font-mono text-xs font-semibold tracking-wider uppercase">
                      Exclusive Obsidian Blend
                    </div>
                  )}

                  <p className="text-sm text-gray-300 font-sans leading-relaxed mt-4">
                    {selectedProduct.detailDescription || selectedProduct.description}
                  </p>

                  {/* Attributes badge tags */}
                  {selectedProduct.attributes && (
                    <div className="mt-5 space-y-2">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Premium Specifications</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.attributes.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono bg-primary/5 text-primary border border-primary/20 px-2.5 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-outline/10">
                  {selectedProduct.type === 'flavor' ? (
                    <button
                      onClick={() => {
                        setSelectedProduct(OBSIDIAN_PRODUCT);
                      }}
                      className="w-full bg-primary text-[#241a00] hover:bg-primary-fixed py-3 text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-all text-center flex items-center justify-center space-x-2"
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span>Explore The Obsidian Selection</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, 1);
                        setSelectedProduct(null);
                      }}
                      className="w-full bg-primary text-[#241a00] hover:bg-primary-fixed py-3 text-xs font-mono font-bold tracking-widest uppercase rounded-sm transition-all text-center flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Secure Packaging inside Bag</span>
                    </button>
                  )}

                  <p className="text-[10px] text-gray-500 font-mono text-center">
                    {selectedProduct.type === 'flavor' 
                      ? "This unique formulation is hand-packed strictly into our luxurious black-colored cardboard configuration." 
                      : "All prices are fully custom tax inclusive. Secure distribution guaranteed."}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* SHOPPING BAG DRAWER OVERLAY */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[150] flex justify-end">
            
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Sliding drawer layout */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="relative w-full max-w-md bg-[#1b1c1c] border-l border-outline/15 h-full flex flex-col justify-between shadow-2xl z-10"
            >
              
              {/* Header */}
              <div className="p-6 border-b border-outline/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-serif text-lg text-white">Your Shopping Bag</h3>
                  {checkoutCartItemCount > 0 && (
                    <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                      {checkoutCartItemCount} items
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Multi-step checkout content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Flow Indicators */}
                {cart.length > 0 && checkoutStep !== 'success' && (
                  <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase border-b border-outline/10 pb-4">
                    <span className={`${checkoutStep === 'cart' ? 'text-primary font-bold' : ''}`}>01 Bag</span>
                    <ArrowRight className="w-3 h-3 text-gray-700" />
                    <span className={`${checkoutStep === 'shipping' ? 'text-primary font-bold' : ''}`}>02 Delivery</span>
                    <ArrowRight className="w-3 h-3 text-gray-700" />
                    <span className={`${checkoutStep === 'payment' ? 'text-primary font-bold' : ''}`}>03 Invoice</span>
                  </div>
                )}

                {/* Sub-view render */}
                {checkoutStep === 'cart' && (
                  <div className="space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-20 space-y-4">
                        <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto stroke-1" />
                        <p className="font-serif text-base text-gray-400">Your bag is completely empty</p>
                        <p className="text-xs text-gray-600 max-w-xs mx-auto">
                          Add our fine Cocoa Cascades and luxury selections to begin a culinary discovery.
                        </p>
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs text-primary font-semibold font-mono uppercase tracking-widest hover:underline pt-4"
                        >
                          Discover Treasures →
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex items-center space-x-4 bg-[#121414] border border-outline/10 p-3 rounded-sm group relative"
                          >
                            <img
                              alt={item.product.name}
                              className="w-16 h-16 object-cover bg-neutral-900 border border-neutral-800 rounded-sm"
                              src={item.product.image}
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-serif text-sm text-[#e3e2e2] truncate">{item.product.name}</h4>
                              <p className="text-xs font-mono text-primary">
                                {item.product.type === 'treasure' ? `₹${item.product.price}` : `Rs. ${item.product.price}`} each
                              </p>

                              {/* Quantities */}
                              <div className="flex items-center space-x-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                  className="w-5 h-5 rounded-full border border-outline/25 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors focus:outline-none"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs w-6 text-center text-white">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                  className="w-5 h-5 rounded-full border border-outline/25 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors focus:outline-none"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-gray-500 hover:text-red-400 p-1.5 transition-colors duration-200 self-center"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        {/* Promo Codes */}
                        <div className="pt-4 border-t border-outline/10 space-y-2">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-gray-500">Apply Coupon Code</p>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="e.g. INDULGE"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                              className="bg-black/40 border border-outline/30 focus:border-primary text-xs px-3 py-2 text-white placeholder-gray-600 focus:outline-none rounded-sm uppercase flex-1"
                            />
                            <button
                              onClick={() => {
                                if (promoCode === "INDULGE") {
                                  setDiscountApplied(true);
                                  triggerToast("Promo code 'INDULGE' applied! 15% discount has been calculated.");
                                } else {
                                  triggerToast("Invalid promo code. Try 'INDULGE' for 15% off!");
                                }
                              }}
                              className="bg-primary/10 border border-primary/20 text-primary hover:bg-primary font-mono text-[10px] font-bold px-4 py-2 hover:text-black transition-colors rounded-sm"
                            >
                              Apply
                            </button>
                          </div>
                          {discountApplied && (
                            <p className="text-[11px] text-green-400 font-mono flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" /> Promo code 'INDULGE' applied (15% savings recorded).
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {checkoutStep === 'shipping' && (
                  <form onSubmit={(e) => { e.preventDefault(); setCheckoutStep('payment'); }} className="space-y-4">
                    <h4 className="font-serif text-sm text-[#ffe088] tracking-wider uppercase mb-2">Delivery Coordinates</h4>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-1">Covey Delivery Name</label>
                      <input
                        required
                        type="text"
                        placeholder="G. Davidson"
                        value={shippingForm.name}
                        onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                        className="w-full bg-black/40 border border-outline/30 focus:border-primary text-xs px-3 py-2 text-white focus:outline-none rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-1">Contact Telephone</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 9345338652"
                        value={shippingForm.phone}
                        onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                        className="w-full bg-black/40 border border-outline/30 focus:border-primary text-xs px-3 py-2 text-white focus:outline-none rounded-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-1">Physical Casket Address</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Exquisite Chambers, suite 42, Marine Lines"
                        value={shippingForm.address}
                        onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                        className="w-full bg-black/40 border border-outline/30 focus:border-primary text-xs px-3 py-2 text-white focus:outline-none rounded-sm resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-1">Postal Casket PIN Code</label>
                      <input
                        required
                        type="text"
                        maxLength={6}
                        placeholder="400001"
                        value={shippingForm.pin}
                        onChange={(e) => setShippingForm({ ...shippingForm, pin: e.target.value })}
                        className="w-full bg-black/40 border border-outline/30 focus:border-primary text-xs px-3 py-2 text-white focus:outline-none rounded-sm"
                      />
                    </div>
                    <button type="submit" className="hidden" id="submit-shipping" />
                  </form>
                )}

                {checkoutStep === 'payment' && (
                  <form onSubmit={runSimulatedCheckout} className="space-y-4">
                    <h4 className="font-serif text-sm text-[#ffe088] tracking-wider uppercase mb-2">Simulated Premium Audit Ledger</h4>
                    
                    <div className="bg-[#121414] p-3 border border-outline/10 text-xs text-gray-400 space-y-1.5 rounded-sm">
                      <p className="font-mono text-[9px] text-[#241a00] bg-primary font-bold px-1.5 py-0.5 rounded self-start inline-block uppercase">Shipment Target</p>
                      <p className="text-white font-serif">{shippingForm.name} — {shippingForm.phone}</p>
                      <p className="text-current truncate leading-none">{shippingForm.address}</p>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-1">Virtual Card Number</label>
                      <input
                        required
                        type="text"
                        maxLength={19}
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={paymentForm.cardNo}
                        onChange={(e) => setPaymentForm({ ...paymentForm, cardNo: e.target.value })}
                        className="w-full bg-black/40 border border-outline/30 focus:border-primary text-xs px-3 py-2 text-white focus:outline-none rounded-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-1">Expiry Date</label>
                        <input
                          required
                          type="text"
                          maxLength={5}
                          placeholder="MM/YY"
                          value={paymentForm.cardExpiry}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardExpiry: e.target.value })}
                          className="w-full bg-black/40 border border-outline/30 focus:border-primary text-xs px-3 py-2 text-white focus:outline-none rounded-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-1">Secret CVV</label>
                        <input
                          required
                          type="password"
                          maxLength={3}
                          placeholder="***"
                          value={paymentForm.cardCVV}
                          onChange={(e) => setPaymentForm({ ...paymentForm, cardCVV: e.target.value })}
                          className="w-full bg-black/40 border border-outline/30 focus:border-primary text-xs px-3 py-2 text-white focus:outline-none rounded-sm"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-primary/5 rounded border border-primary/20 text-[10px] text-gray-400">
                      We operate a simulated sandbox environment for your order security. No real currency is charged.
                    </div>
                    <button type="submit" className="hidden" id="submit-payment" />
                  </form>
                )}

                {/* SUCCESS SCREEN */}
                {checkoutStep === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-6"
                  >
                    <div className="w-16 h-16 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto text-primary animate-bounce">
                      <Check className="w-8 h-8 stroke-2" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-serif text-xl text-primary font-bold">Unwrapped and Authenticated</h4>
                      <p className="text-xs text-gray-400">
                        Your premium order coordinates have been submitted and locked into the Candélisse distribution ledger.
                      </p>
                    </div>

                    <div className="bg-[#121414] p-4 text-left border border-outline/10 text-xs font-mono rounded-sm space-y-1">
                      <p className="text-primary font-semibold">Ledger Certificate Code:</p>
                      <p className="text-white font-bold select-all tracking-wider font-mono">CND-{Math.floor(100000 + Math.random() * 900000)}</p>
                      <p className="text-gray-500 text-[10px] pt-2">Special thanks to G. Davidson for placing trust in your sweets craving exploration!</p>
                    </div>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutStep('cart');
                      }}
                      className="w-full py-3 border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all text-xs font-mono font-semibold uppercase tracking-widest rounded-sm"
                    >
                      Close Cabinet
                    </button>
                  </motion.div>
                )}

              </div>

              {/* Total Calculation & Next steps footer button */}
              {cart.length > 0 && checkoutStep !== 'success' && (
                <div className="p-6 bg-[#121414] border-t border-outline/15 space-y-4">
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between text-gray-400">
                      <span>Selection Subtotal</span>
                      <span>Rs. {subtotal}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-green-400">
                        <span>Promo Code (15%)</span>
                        <span>- Rs. {discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-400">
                      <span>Artisanal Delivery</span>
                      <span>{delivery === 0 ? 'Complementary' : `Rs. ${delivery}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-outline/10 font-semibold">
                      <span>Pristine Total</span>
                      <span className="text-primary">Rs. {total}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    {checkoutStep === 'cart' && (
                      <button
                        onClick={() => setCheckoutStep('shipping')}
                        className="w-full bg-primary text-[#241a00] hover:bg-primary-fixed py-3.5 text-xs font-mono font-bold tracking-[0.25em] uppercase rounded-sm transition-all text-center flex items-center justify-center space-x-1"
                      >
                        <span>Covey Shipping Address</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </button>
                    )}

                    {checkoutStep === 'shipping' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCheckoutStep('cart')}
                          className="px-4 py-3.5 border border-outline/30 hover:border-primary text-gray-400 hover:text-white transition-colors uppercase text-[10px] font-mono tracking-widest rounded-sm focus:outline-none"
                        >
                          Back
                        </button>
                        <button
                          onClick={() => document.getElementById('submit-shipping')?.click()}
                          className="w-full bg-primary text-[#241a00] hover:bg-primary-fixed py-3.5 text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-sm transition-all focus:outline-none flex items-center justify-center space-x-1"
                        >
                          <span>Confirm Target</span>
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    )}

                    {checkoutStep === 'payment' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCheckoutStep('shipping')}
                          className="px-4 py-3.5 border border-outline/30 hover:border-primary text-gray-400 hover:text-white transition-colors uppercase text-[10px] font-mono tracking-widest rounded-sm focus:outline-none"
                        >
                          Back
                        </button>
                        <button
                          disabled={isProcessingCheckout}
                          onClick={() => document.getElementById('submit-payment')?.click()}
                          className="w-full bg-primary text-[#241a00] hover:bg-primary-fixed py-3.5 text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-sm transition-all focus:outline-none flex items-center justify-center space-x-1 disabled:opacity-40"
                        >
                          {isProcessingCheckout ? (
                            <span className="animate-pulse">Locking Coordinates...</span>
                          ) : (
                            <>
                              <span>Unlock Indulgence (Rs. {total})</span>
                              <Check className="w-4 h-4 ml-1" />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

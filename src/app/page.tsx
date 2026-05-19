'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { MessageCircle, MapPin, Clock, ChevronDown, Search, Filter, ShoppingCart, Zap, Monitor, Smartphone, Gamepad2, ChevronRight } from 'lucide-react';

const CYAN = '#00F0FF';
const CYAN_BLUE = '#0044FF';

interface RainDrop {
  id: number;
  left: number;
  delay: number;
  duration: number;
  width: number;
  opacity: number;
  isWide: boolean;
}

function RainEffect() {
  const drops = useMemo<RainDrop[]>(() => {
    const d: RainDrop[] = [];
    for (let i = 0; i < 80; i++) {
      d.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 2 + Math.random() * 3,
        width: Math.random() > 0.85 ? 2 : 1,
        opacity: 0.1 + Math.random() * 0.3,
        isWide: Math.random() > 0.85,
      });
    }
    return d;
  }, []);

  return (
    <>
      <div className="rain-container">
        {drops.map((drop) => (
          <div
            key={drop.id}
            className={drop.isWide ? 'rain-drop-wide' : 'rain-drop'}
            style={{
              left: `${drop.left}%`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
              opacity: drop.opacity,
            }}
          />
        ))}
      </div>
      <div className="lightning-flash" />
    </>
  );
}

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
        glowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" style={{ opacity: 0 }} />;
}

const products = [
  { id: 1, name: 'PlayStation 5 Slim', category: 'Gaming Consoles', price: 550.00, condition: 'Pristine', emoji: '🎮', gradient: 'from-blue-950 via-slate-900 to-black' },
  { id: 2, name: 'Nintendo Switch OLED', category: 'Gaming Consoles', price: 420.00, condition: 'Boxed New/Mint', emoji: '🕹️', gradient: 'from-red-950 via-slate-900 to-black' },
  { id: 3, name: 'Xbox Series X', category: 'Gaming Consoles', price: 500.00, condition: 'Clean Pre-owned', emoji: '🎮', gradient: 'from-green-950 via-slate-900 to-black' },
  { id: 4, name: 'PS5 Slim Digital', category: 'Gaming Consoles', price: 450.00, condition: 'Second Hand', emoji: '🎮', gradient: 'from-indigo-950 via-slate-900 to-black' },
  { id: 5, name: 'Xbox Series S', category: 'Gaming Consoles', price: 300.00, condition: 'Clean Pre-owned', emoji: '🎮', gradient: 'from-emerald-950 via-slate-900 to-black' },
  { id: 6, name: 'PS5 Slim Brand New', category: 'Gaming Consoles', price: 650.00, condition: 'Brand New Boxed', emoji: '🎮', gradient: 'from-violet-950 via-slate-900 to-black' },
  { id: 7, name: 'iPhone 14 Pro Max', category: 'Phones', price: 700.00, condition: 'Pristine', emoji: '📱', gradient: 'from-gray-950 via-slate-900 to-black' },
  { id: 8, name: 'iPhone 15 Pro Max', category: 'Phones', price: 880.00, condition: 'Pristine', emoji: '📱', gradient: 'from-zinc-950 via-slate-900 to-black' },
  { id: 9, name: 'iPhone 15 Pro Max', category: 'Phones', price: 880.00, condition: 'Excellent Health', emoji: '📱', gradient: 'from-slate-950 via-slate-900 to-black' },
];

const categories = [
  { icon: Gamepad2, label: 'Consoles' },
  { icon: Smartphone, label: 'Phones' },
  { icon: Monitor, label: 'Laptops' },
  { icon: Zap, label: 'Accessories' },
];

const stats = [
  { number: '500+', label: 'Products in Stock' },
  { number: '10K+', label: 'Satisfied Customers' },
  { number: '24/7', label: 'WhatsApp Support' },
];

export default function PremiumTec() {
  const [isLoading, setIsLoading] = useState(true);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll();

  const heroImageBlur = useTransform(scrollYProgress, [0, 0.25], [0, 20]);
  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.1]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroTextScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setNavScrolled(latest > 80);
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = activeFilter === 'All'
    ? products
    : products.filter((p) => {
        if (activeFilter === 'Consoles') return p.category === 'Gaming Consoles';
        if (activeFilter === 'Phones') return p.category === 'Phones';
        return true;
      });

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-[#0B0C10] z-50 flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <RainEffect />
        <div className="relative flex flex-col items-center gap-8 z-10">
          <motion.div
            initial={{ scale: 1.6, opacity: 0, filter: 'blur(20px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <motion.div
              className="text-5xl md:text-7xl font-black tracking-tighter uppercase"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="cyan-gradient-text">PREMIUM</span>
              <span className="text-white/90 ml-3">TEC</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[2px] shimmer-line"
              style={{
                background: `linear-gradient(90deg, transparent, ${CYAN}, ${CYAN_BLUE}, transparent)`,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          <motion.div
            className="w-72 h-[2px] relative overflow-hidden rounded-full"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${CYAN}, ${CYAN_BLUE}, transparent)`,
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ delay: 0.7, duration: 2, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>

          <motion.p
            className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Initializing experience
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-[#0B0C10] text-white overflow-x-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <CursorGlow />
      <RainEffect />

      {/* NAVIGATION - Floating Glass Pill */}
      <motion.nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          navScrolled
            ? 'glass-nav-scrolled w-[calc(100%-2rem)] md:w-auto md:px-8 py-3'
            : 'w-[calc(100%-2rem)] md:w-auto md:px-12 py-4'
        }`}
        style={{
          borderRadius: '50px',
          background: navScrolled
            ? 'rgba(11, 12, 16, 0.8)'
            : 'rgba(11, 12, 16, 0.45)',
          backdropFilter: navScrolled ? 'blur(40px) saturate(200%)' : 'blur(25px) saturate(180%)',
          WebkitBackdropFilter: navScrolled ? 'blur(40px) saturate(200%)' : 'blur(25px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: navScrolled
            ? '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,212,255,0.04)'
            : '0 8px 32px rgba(0,0,0,0.3)',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-4 md:px-6">
          <motion.div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${CYAN}, ${CYAN_BLUE})`,
                boxShadow: `0 0 12px rgba(0, 212, 255, 0.3)`,
              }}
            >
              <Zap className="w-4 h-4 text-black" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase">
              <span className="cyan-gradient-text">PREMIUM</span>
              <span className="text-white/80 ml-1.5">TEC</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-1">
            {['Catalog', 'About', 'Contact'].map((item, idx) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="px-4 py-2 text-[11px] font-medium tracking-[0.2em] uppercase text-white/50 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5"
              >
                {item}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="ml-2 pushed-bubble px-5 py-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-white flex items-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${CYAN}, ${CYAN_BLUE})`,
                border: '1px solid rgba(0, 240, 255, 0.3)',
                boxShadow: `0 0 16px rgba(0, 212, 255, 0.2), inset 0 1px 1px rgba(255,255,255,0.2)`,
              }}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              Cart
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Layer 0: Base gradient */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Layer 1: Cinematic sunset overlay */}
        <motion.div
          className="absolute inset-0 sunset-overlay"
          style={{
            opacity: heroImageOpacity,
            scale: heroImageScale,
            filter: heroImageBlur.get() > 0 ? `blur(${heroImageBlur.get()}px)` : 'none',
          }}
        />

        {/* Golden hour ambient */}
        <motion.div
          className="absolute inset-0"
          style={{ opacity: heroImageOpacity }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 65% 35%, rgba(212, 134, 10, 0.06) 0%, rgba(0, 68, 255, 0.03) 40%, transparent 60%)',
            }}
          />
        </motion.div>

        {/* Vignette */}
        <div className="absolute inset-0 vignette-overlay" />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-6 md:px-12 max-w-5xl"
          style={{
            y: heroTextY,
            opacity: heroTextOpacity,
            scale: heroTextScale,
          }}
        >
          {/* Location pill */}
          <motion.div
            className="inline-flex items-center gap-2 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="liquid-glass-pill px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/60 font-medium">
                Curated in Harare, Zimbabwe
              </span>
              <MapPin className="w-3 h-3 text-white/40" />
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black uppercase tracking-tighter leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ letterSpacing: '-0.03em' }}
          >
            <span className="block text-white text-refraction">
              Premium Hardware.
            </span>
            <span className="block cyan-gradient-text cyan-glow mt-2">
              Zero Compromise.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-base md:text-lg font-light tracking-[0.2em] uppercase text-white/40 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Gaming Consoles &bull; Phones &bull; Elite Tech
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: `0 0 40px rgba(0, 212, 255, 0.35)` }}
              whileTap={{ scale: 0.97 }}
              className="pushed-bubble px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase text-white flex items-center gap-3"
              style={{
                background: `linear-gradient(135deg, ${CYAN}, ${CYAN_BLUE})`,
                border: '1px solid rgba(0, 240, 255, 0.3)',
                boxShadow: `0 0 20px rgba(0, 212, 255, 0.2), inset 0 1px 1px rgba(255,255,255,0.2)`,
              }}
            >
              <Zap className="w-4 h-4" />
              Browse Collection
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="liquid-glass-pill px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-all flex items-center gap-3"
            >
              Explore
              <ChevronDown className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border border-white/10 flex items-start justify-center pt-2"
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: `linear-gradient(to bottom, ${CYAN}, transparent)` }}
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* FILTER BAR */}
      <section className="relative z-10 py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
                <span className="cyan-gradient-text">Catalog</span>
              </h2>
              <div className="h-[2px] w-12 shimmer-line" style={{ background: `linear-gradient(90deg, ${CYAN}, transparent)` }} />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="liquid-glass-pill flex items-center gap-2 px-4 py-2.5">
                <Search className="w-3.5 h-3.5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search hardware..."
                  className="bg-transparent border-none outline-none text-sm text-white/80 placeholder-white/30 w-40"
                />
              </div>

              <div className="liquid-glass-pill flex items-center gap-1 p-1">
                {['All', 'Consoles', 'Phones'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                      activeFilter === f
                        ? 'text-black'
                        : 'text-white/50 hover:text-white/80'
                    }`}
                    style={
                      activeFilter === f
                        ? {
                            background: `linear-gradient(135deg, ${CYAN}, ${CYAN_BLUE})`,
                            boxShadow: `0 0 12px rgba(0, 212, 255, 0.3)`,
                          }
                        : {}
                    }
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="relative z-10 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true, margin: '-50px' }}
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  className="group cursor-pointer"
                >
                  <div className="liquid-glass-card overflow-hidden">
                    {/* Product image area */}
                    <div className={`relative aspect-[4/3] bg-gradient-to-br ${product.gradient} overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span
                          className="text-6xl md:text-7xl"
                          animate={hoveredProduct === product.id ? { scale: 1.15, rotate: 3 } : { scale: 1, rotate: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {product.emoji}
                        </motion.span>
                      </div>

                      {/* Ambient cyan glow on hover */}
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProduct === product.id ? 0.15 : 0 }}
                        transition={{ duration: 0.4 }}
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${CYAN}, transparent 70%)`,
                        }}
                      />

                      {/* Vignette on product */}
                      <div className="absolute inset-0 vignette-overlay" />

                      {/* Hover overlay */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.button
                          initial={{ scale: 0.8, y: 10 }}
                          animate={hoveredProduct === product.id ? { scale: 1, y: 0 } : { scale: 0.8, y: 10 }}
                          className="pushed-bubble px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white flex items-center gap-2"
                          style={{
                            background: `linear-gradient(135deg, ${CYAN}, ${CYAN_BLUE})`,
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            boxShadow: `0 0 16px rgba(0, 212, 255, 0.3)`,
                          }}
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Quick Add
                        </motion.button>
                      </motion.div>

                      {/* Category badge */}
                      <div className="absolute top-4 left-4">
                        <div className="liquid-glass-pill px-3 py-1">
                          <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70">{product.category}</span>
                        </div>
                      </div>

                      {/* Condition badge */}
                      <div className="absolute top-4 right-4">
                        <div
                          className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] uppercase"
                          style={{
                            background: `linear-gradient(135deg, ${CYAN}22, ${CYAN_BLUE}22)`,
                            border: '1px solid rgba(0, 212, 255, 0.15)',
                            color: CYAN,
                          }}
                        >
                          {product.condition}
                        </div>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="p-5">
                      <h3 className="text-sm font-black uppercase tracking-tight text-white/90 group-hover:text-white transition-colors mb-2 leading-tight">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span
                          className="text-lg font-bold cyan-gradient-text"
                        >
                          ${product.price.toFixed(2)}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-white/40 hover:text-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-12">
        <div className="absolute inset-0 hero-gradient opacity-50" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
                className="liquid-glass-card p-8 text-center"
              >
                <p className="text-4xl md:text-5xl font-black cyan-gradient-text mb-3 cyan-glow">
                  {stat.number}
                </p>
                <p className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/40">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative z-10 py-24 md:py-40 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-30" />

        {/* Ambient glow */}
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, rgba(0, 212, 255, 0.1), transparent 70%)` }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, rgba(0, 68, 255, 0.08), transparent 70%)` }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-8"
            style={{ letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <span className="text-white text-refraction">Ready to</span>
            <br />
            <span className="cyan-gradient-text cyan-glow">Level Up?</span>
          </motion.h2>

          <motion.p
            className="text-base md:text-lg font-light text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            Connect with our showroom via WhatsApp for product inquiries, custom orders, and exclusive deals.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 50px rgba(0, 212, 255, 0.4)',
            }}
            whileTap={{ scale: 0.96 }}
            className="pushed-bubble px-14 py-5 text-[11px] font-bold tracking-[0.25em] uppercase text-white flex items-center gap-3 mx-auto"
            style={{
              background: `linear-gradient(135deg, ${CYAN}, ${CYAN_BLUE})`,
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 0 30px rgba(0, 212, 255, 0.25)',
              borderRadius: '50px',
            }}
          >
            <MessageCircle className="w-4 h-4" />
            Message Showroom
          </motion.button>
        </div>
      </section>

      {/* FOOTER */}
      <motion.footer
        className="relative z-10"
        style={{
          background: 'linear-gradient(to top, #080910, #0B0C10)',
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${CYAN}, ${CYAN_BLUE})`,
                    boxShadow: `0 0 12px rgba(0, 212, 255, 0.3)`,
                  }}
                >
                  <Zap className="w-4 h-4 text-black" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase">
                  <span className="cyan-gradient-text">PREMIUM</span>
                  <span className="text-white/80 ml-1">TEC</span>
                </span>
              </div>
              <p className="text-sm text-white/40 font-light leading-relaxed">
                Premium gaming hardware and elite tech. Curated selection. Exceptional service.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 cyan-gradient-text">
                Hours
              </p>
              <div className="space-y-3">
                <div className="liquid-glass-card px-4 py-3 flex items-center gap-3">
                  <Clock className="w-4 h-4" style={{ color: CYAN }} />
                  <div>
                    <p className="text-sm text-white/70">Tuesday</p>
                    <p className="text-[10px] text-white/40">9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4 cyan-gradient-text">
                Location
              </p>
              <div className="liquid-glass-card px-4 py-3 flex items-center gap-3">
                <MapPin className="w-4 h-4" style={{ color: CYAN }} />
                <div>
                  <p className="text-sm text-white/70">Mbuya Nehanda Street</p>
                  <p className="text-[10px] text-white/40">Harare, Zimbabwe</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div
            className="border-t my-12"
            style={{ borderColor: 'rgba(255,255,255,0.04)' }}
          />

          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] text-white/30 uppercase tracking-[0.25em] font-light">
              &copy; 2024 Premium Tec. All rights reserved.
            </p>
            <div className="flex items-center gap-1 shimmer-line" style={{ background: 'transparent' }}>
              <div className="h-[1px] w-8" style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }} />
              <span className="text-[9px] text-white/20 uppercase tracking-[0.3em]">Designed for excellence</span>
              <div className="h-[1px] w-8" style={{ background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)` }} />
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, MapPin, Clock, ChevronDown, ChevronRight, Phone, Shield, Zap, Star, X, Menu, Search, ChevronLeft } from 'lucide-react';
import { products, categories, notifications, type Product } from '../data/products';

function NotificationPopup() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 4000);
    return () => clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const hide = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(hide);
  }, [visible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % notifications.length);
      setVisible(true);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="fixed bottom-24 right-4 z-40 bg-[#141414] border border-[#2a2a2a] p-4 max-w-xs shadow-2xl"
    >
      <button onClick={() => setVisible(false)} className="absolute top-2 right-2 text-white/40 hover:text-white">
        <X className="w-3 h-3" />
      </button>
      <div className="flex items-start gap-3">
        <div className="w-2 h-2 mt-1.5 bg-[#ff1a1a] rounded-full flex-shrink-0 pulse-glow" />
        <div>
          <p className="text-xs font-bold text-white">{notifications[current].text}</p>
          <p className="text-[10px] text-white/40 mt-1">{notifications[current].time}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TickerBar() {
  const items = [
    'LOGITECH STEERING + SHIFTER — $450', 'PS5 CONSOLES IN STOCK', 'SELL YOUR CONSOLE — CASH ON THE SPOT',
    'XBOX SERIES S — $300', 'REPAIR LAB OPEN', 'FREE DELIVERY HARARE',
    'NINTENDO SWITCH — $340', 'TRADE-INS WELCOME',
  ];
  return (
    <div className="bg-[#ff1a1a] text-white overflow-hidden py-2 relative z-50">
      <div className="ticker-track flex whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-8 text-[10px] font-black tracking-[0.2em] uppercase flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className="group cursor-pointer product-card-glow border border-[#1e1e1e] bg-[#0a0a0a] transition-all duration-300 overflow-hidden"
    >
      <div className="relative aspect-square overflow-hidden bg-[#111]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.badge && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-[#ff1a1a] text-white text-[9px] font-black tracking-wider uppercase pulse-glow">
            {product.badge}
          </div>
        )}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {product.images.slice(0, 4).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/60" />
            ))}
          </div>
        )}
        {product.inStock && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">In Stock</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="w-full py-2.5 bg-[#ff1a1a] text-white text-[10px] font-black tracking-[0.2em] uppercase text-center">
            Quick View
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[9px] font-bold text-[#ff1a1a] tracking-[0.2em] uppercase mb-1.5">
          {product.category}
        </p>
        <h3 className="text-sm font-black uppercase tracking-tight mb-1 group-hover:text-[#ff1a1a] transition-colors">
          {product.name}
        </h3>
        <p className="text-[10px] text-white/40 mb-3">{product.condition}</p>
        {product.specs && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.specs.slice(0, 2).map((spec) => (
              <span key={spec} className="px-1.5 py-0.5 bg-[#1e1e1e] text-[8px] text-white/50 font-medium tracking-wider">
                {spec}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-[#1e1e1e]">
          <span className="text-lg font-black">${product.price}</span>
          <span className="text-[9px] text-white/30 uppercase tracking-wider">USD</span>
        </div>
      </div>
    </motion.div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#0a0a0a] border border-[#2a2a2a] max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#111]">
            <div className="relative aspect-square overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={product.images[activeImg]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
              {product.images.length > 1 && (
                <>
                  {activeImg > 0 && (
                    <button
                      onClick={() => setActiveImg((prev) => prev - 1)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-black/80 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                  {activeImg < product.images.length - 1 && (
                    <button
                      onClick={() => setActiveImg((prev) => prev + 1)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/60 hover:bg-black/80 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-14 h-14 overflow-hidden border-2 transition-all duration-300 ${
                      i === activeImg ? 'border-[#ff1a1a]' : 'border-transparent opacity-50 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-bold text-[#ff1a1a] tracking-[0.2em] uppercase">{product.category}</p>
              {product.inStock && (
                <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> In Stock
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-1">{product.name}</h2>
            <p className="text-sm text-white/50 mb-4">{product.condition}</p>
            <p className="text-3xl font-black text-[#ff1a1a] mb-6">${product.price} <span className="text-sm font-normal text-white/30">USD</span></p>
            {product.specs && (
              <div className="mb-6">
                <p className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase mb-3">Specifications</p>
                <div className="grid grid-cols-2 gap-2">
                  {product.specs.map((spec) => (
                    <div key={spec} className="px-3 py-2 bg-[#141414] border border-[#1e1e1e] text-xs text-white/70">{spec}</div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-3 mt-auto">
              <a
                href={`https://wa.me/263XXXXXXXXX?text=Hi, I'm interested in the ${product.name} ($${product.price})`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 bg-[#ff1a1a] text-white text-[10px] font-black tracking-[0.2em] uppercase text-center hover:bg-[#cc0000] transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5" /> BUY NOW
              </a>
              <a
                href={`https://wa.me/263XXXXXXXXX?text=Hi, I'd like to trade in my ${product.category} for a ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 border border-white/20 text-white text-[10px] font-black tracking-[0.2em] uppercase text-center hover:border-[#ff1a1a] hover:text-[#ff1a1a] transition-colors"
              >
                TRADE IN
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GameStop() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((p) => p.categorySlug === activeCategory)
    : products;

  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="text-5xl md:text-7xl font-black tracking-tighter text-white" style={{ letterSpacing: '-0.03em' }}>
            GAMESTOP<span className="text-[#ff1a1a]">263</span>
          </div>
          <motion.div
            className="absolute -bottom-2 left-0 h-0.5 bg-[#ff1a1a]"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>
        <motion.div
          className="w-48 h-0.5 bg-[#1e1e1e] mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="h-full bg-[#ff1a1a]"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ delay: 0.5, duration: 1.4, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <TickerBar />

      <nav className="fixed top-8 left-0 right-0 z-40 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <a href="#" className="text-lg font-black tracking-tighter uppercase" style={{ letterSpacing: '-0.03em' }}>
            GAMESTOP<span className="text-[#ff1a1a]">263</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {['Consoles', 'Accessories', 'Trade In', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 hover:text-[#ff1a1a] transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/263XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#ff1a1a] text-white text-[9px] font-black tracking-[0.2em] uppercase hover:bg-[#cc0000] transition-colors"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden text-white">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-black/95 border-t border-white/5 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {['Consoles', 'Accessories', 'Trade In', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenu(false)} className="block text-xs font-bold tracking-[0.2em] uppercase text-white/70 hover:text-[#ff1a1a] py-2">
                    {item}
                  </a>
                ))}
                <a href="https://wa.me/263XXXXXXXXX" className="block w-full py-3 bg-[#ff1a1a] text-white text-[10px] font-bold tracking-[0.2em] uppercase text-center">
                  <MessageCircle className="w-3 h-3 inline mr-2" /> WhatsApp Us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16" id="hero">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-[#0a0a0a]" />
        <div className="absolute inset-0 hero-grid-overlay" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255,26,26,0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 70%, rgba(255,26,26,0.06) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(255,26,26,0.08) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-[10px] font-black tracking-[0.3em] text-[#ff1a1a] uppercase mb-6">
              Harare&apos;s #1 Gaming Store
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase leading-[0.9] mb-6" style={{ letterSpacing: '-0.03em' }}>
              CASH ON<br />
              <span className="red-gradient-text">THE SPOT</span>
            </h1>
            <p className="text-base md:text-lg text-white/50 font-light max-w-xl mx-auto mb-4">
              Buy &bull; Sell &bull; Repair Consoles & iPhones in Harare
            </p>
            <p className="text-sm text-white/30 max-w-md mx-auto mb-10">
              Instant payouts. Best prices. Trusted gaming experts since 2019.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#consoles" className="px-8 py-4 bg-[#ff1a1a] text-white font-black tracking-[0.2em] uppercase text-xs hover:bg-[#cc0000] transition-colors pulse-glow">
              SHOP GAMING
            </a>
            <a href="#trade-in" className="px-8 py-4 border-2 border-white/20 text-white font-black tracking-[0.2em] uppercase text-xs hover:border-[#ff1a1a] hover:text-[#ff1a1a] transition-colors">
              SELL YOUR CONSOLE
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-10"
          >
            {[
              { label: '500+', sub: 'Products' },
              { label: '10K+', sub: 'Customers' },
              { label: '5+', sub: 'Years' },
              { label: '24/7', sub: 'WhatsApp' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-[#ff1a1a]">{stat.label}</p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-bold">{stat.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </section>

      <section className="relative py-16 md:py-24" id="consoles">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] font-black tracking-[0.3em] text-[#ff1a1a] uppercase mb-3">Gaming Arsenal</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4" style={{ letterSpacing: '-0.02em' }}>Browse by Category</h2>
            <div className="w-16 h-0.5 bg-[#ff1a1a]" />
          </motion.div>

          <div className="flex flex-wrap gap-2 mb-10">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300 border ${
                activeCategory === null
                  ? 'bg-[#ff1a1a] text-white border-[#ff1a1a]'
                  : 'bg-transparent text-white/50 border-[#1e1e1e] hover:border-white/30 hover:text-white'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-4 py-2 text-[9px] font-black tracking-[0.2em] uppercase transition-all duration-300 border ${
                  activeCategory === cat.slug
                    ? 'bg-[#ff1a1a] text-white border-[#ff1a1a]'
                    : 'bg-transparent text-white/50 border-[#1e1e1e] hover:border-white/30 hover:text-white'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {!activeCategory && categories.map((cat) => {
            const catProducts = products.filter((p) => p.categorySlug === cat.slug);
            if (catProducts.length === 0) return null;
            return (
              <div key={cat.slug} className="mb-16">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{cat.icon}</span>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{cat.name}</h3>
                  </div>
                  <button
                    onClick={() => setActiveCategory(cat.slug)}
                    className="flex items-center gap-1 text-[10px] font-bold tracking-[0.2em] uppercase text-[#ff1a1a] hover:text-[#ff6666] transition-colors"
                  >
                    View All <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {catProducts.slice(0, 4).map((product, idx) => (
                    <ProductCard key={product.id} product={product} index={idx} onClick={() => setSelectedProduct(product)} />
                  ))}
                </div>
              </div>
            );
          })}

          {activeCategory && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filteredProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} index={idx} onClick={() => setSelectedProduct(product)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-[#0a0a0a] border-y border-[#1e1e1e]" id="trade-in">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff1a1a] rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] font-black tracking-[0.3em] text-[#ff1a1a] uppercase mb-3">Instant Cash</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6" style={{ letterSpacing: '-0.02em' }}>
              CASH ON<br /><span className="red-gradient-text">THE SPOT</span>
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Walk in with your old console or phone. Walk out with cash. No hassle, no waiting — instant payouts guaranteed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
            {[
              { step: '01', icon: <Phone className="w-6 h-6" />, title: 'Bring Your Device', desc: 'Walk into our Mbuya Nehanda St store with any console, iPhone, or gaming gear.' },
              { step: '02', icon: <Search className="w-6 h-6" />, title: 'Get Valuation', desc: 'Our experts assess your device on the spot. Fair prices, transparent process.' },
              { step: '03', icon: <Zap className="w-6 h-6" />, title: 'Get Paid Instant', desc: 'Cash in hand immediately. USD or EcoCash — your choice.' },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center p-8 border border-[#1e1e1e] bg-[#0a0a0a]"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#ff1a1a] text-white text-[9px] font-black tracking-[0.2em] uppercase">Step {item.step}</div>
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#2a2a2a] text-[#ff1a1a]">{item.icon}</div>
                <h3 className="text-sm font-black uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://wa.me/263XXXXXXXXX?text=Hi, I want to sell my device"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#ff1a1a] text-white font-black tracking-[0.2em] uppercase text-xs hover:bg-[#cc0000] transition-colors pulse-glow"
            >
              <MessageCircle className="w-4 h-4" /> GET YOUR QUOTE NOW
            </a>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 md:py-24" id="repair">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-[10px] font-black tracking-[0.3em] text-[#ff1a1a] uppercase mb-3">Repair Lab</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4" style={{ letterSpacing: '-0.02em' }}>We Fix It All</h2>
            <div className="w-16 h-0.5 bg-[#ff1a1a]" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { icon: '🔧', title: 'HDMI Repair', price: 'From $30' },
              { icon: '🎮', title: 'Controller Fix', price: 'From $25' },
              { icon: '🌡️', title: 'Overheating', price: 'From $35' },
              { icon: '💾', title: 'Software Fix', price: 'From $20' },
              { icon: '📱', title: 'iPhone Repair', price: 'From $40' },
              { icon: '🔌', title: 'Port Replace', price: 'From $25' },
              { icon: '💿', title: 'Disc Drive Fix', price: 'From $30' },
              { icon: '🔊', title: 'Audio Repair', price: 'From $20' },
              { icon: '⚡', title: 'Power Supply', price: 'From $35' },
              { icon: '🖥️', title: 'Screen Replace', price: 'From $50' },
            ].map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="p-4 md:p-6 border border-[#1e1e1e] bg-[#0a0a0a] hover:border-[#ff1a1a]/40 transition-all duration-300 group cursor-pointer text-center"
              >
                <div className="text-2xl md:text-3xl mb-3">{service.icon}</div>
                <h4 className="text-xs md:text-sm font-black uppercase tracking-tight mb-1 group-hover:text-[#ff1a1a] transition-colors">{service.title}</h4>
                <p className="text-[10px] text-[#ff1a1a] font-bold">{service.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 bg-[#0a0a0a] border-y border-[#1e1e1e]" id="trust">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-[10px] font-black tracking-[0.3em] text-[#ff1a1a] uppercase mb-3">Trusted by Harare</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter" style={{ letterSpacing: '-0.02em' }}>Why Gamers Trust Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <Shield className="w-6 h-6" />, title: '6-Month Warranty', desc: 'Every console and device sold comes with our 6-month warranty. We stand behind our products.' },
              { icon: <Zap className="w-6 h-6" />, title: 'Instant Cash Payouts', desc: 'No bank transfers, no waiting. Walk in, get valued, walk out with USD cash. Simple.' },
              { icon: <Star className="w-6 h-6" />, title: 'Real Store, Real People', desc: 'Visit us on Mbuya Nehanda Street. Talk to real gaming experts who know their stuff.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 border border-[#1e1e1e] text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#ff1a1a]/30 text-[#ff1a1a]">{item.icon}</div>
                <h3 className="text-sm font-black uppercase tracking-tight mb-2">{item.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Tendai M.', text: 'Bought my PS5 here — best price in Harare. These guys are legit!', rating: 5 },
              { name: 'Rufaro K.', text: 'Traded in my old Xbox and got cash on the spot. No drama, no nonsense. Highly recommend.', rating: 5 },
              { name: 'Nyasha D.', text: 'Fixed my HDMI port in under an hour. Professional and affordable. GameStop263 is the real deal.', rating: 5 },
              { name: 'Kudzai S.', text: 'Got my steering wheel setup here, brand new condition. Great service and fair pricing!', rating: 5 },
            ].map((review, idx) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-6 border border-[#1e1e1e] bg-[#0a0a0a]"
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#ff1a1a] text-[#ff1a1a]" />
                  ))}
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4 italic">&ldquo;{review.text}&rdquo;</p>
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ff1a1a]">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative py-16 md:py-24 border-t border-[#1e1e1e]" id="contact">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-2" style={{ letterSpacing: '-0.03em' }}>
                GAMESTOP<span className="text-[#ff1a1a]">263</span>
              </h3>
              <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm">
                Harare&apos;s premier gaming store. Buy, sell, and repair consoles, iPhones, and gaming accessories. Cash on the spot.
              </p>
              <a
                href="https://wa.me/263XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold tracking-[0.15em] uppercase text-xs hover:bg-[#1da851] transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-[#ff1a1a] uppercase mb-4">Location</p>
              <div className="space-y-2 text-sm text-white/50">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#ff1a1a]" /> Mbuya Nehanda Street</p>
                <p>Harare, Zimbabwe</p>
              </div>
              <p className="text-[10px] font-black tracking-[0.2em] text-[#ff1a1a] uppercase mt-6 mb-4">Hours</p>
              <div className="space-y-1 text-sm text-white/50">
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#ff1a1a]" /> Mon – Sat: 8AM – 6PM</p>
                <p>Sun: 9AM – 4PM</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-[#ff1a1a] uppercase mb-4">Quick Links</p>
              <div className="space-y-2">
                {[
                  { label: 'PlayStation', href: '#consoles' },
                  { label: 'Xbox', href: '#consoles' },
                  { label: 'Nintendo Switch', href: '#consoles' },
                  { label: 'Steering & Accessories', href: '#consoles' },
                  { label: 'Trade In', href: '#trade-in' },
                  { label: 'Repair Lab', href: '#repair' },
                ].map((link) => (
                  <a key={link.label} href={link.href} className="block text-sm text-white/50 hover:text-[#ff1a1a] transition-colors">{link.label}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#1e1e1e] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-white/30 tracking-[0.15em] uppercase">&copy; 2025 GameStop263. All rights reserved.</p>
            <p className="text-[10px] text-white/20">Harare&apos;s #1 Gaming Store</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/263XXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-4 md:right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform pulse-glow"
        style={{ boxShadow: '0 0 20px rgba(37, 211, 102, 0.4)' }}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>

      <NotificationPopup />

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
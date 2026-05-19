'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, MapPin, Clock, ChevronDown } from 'lucide-react';

export default function GameStop() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Parallax transforms
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [500, 1500], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0.3]);
  const opacity2 = useTransform(scrollY, [800, 1200], [0, 1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const products = [
    { id: 1, name: 'PlayStation 3', category: 'Gaming Consoles', price: 100.00, condition: 'Pre-owned', color: '#1a1a2e' },
    { id: 2, name: 'Nintendo switch oled', category: 'Gaming Consoles', price: 420.00, condition: 'Boxed New/Mint', color: '#2e1a3f' },
    { id: 3, name: 'Xbox series s', category: 'Gaming Consoles', price: 300.00, condition: 'Clean Pre-owned', color: '#1a2e3f' },
    { id: 4, name: 'Pre owned ps5 slim', category: 'Gaming Consoles', price: 550.00, condition: 'Second Hand', color: '#2e1a1a' },
    { id: 5, name: 'Series x', category: 'Gaming Consoles', price: 500.00, condition: 'Clean Pre-owned', color: '#1a2e1a' },
    { id: 6, name: 'Boxed ps5 slim', category: 'Gaming Consoles', price: 650.00, condition: 'Brand New Boxed', color: '#3f1a1a' },
    { id: 7, name: 'Iphone 14 pro max', category: 'Phones', price: 700.00, condition: 'Pristine', color: '#1a3f2e' },
    { id: 8, name: '15 pro max', category: 'Phones', price: 880.00, condition: 'Pristine', color: '#3f2e1a' },
    { id: 9, name: '15 pro max', category: 'Phones', price: 880.00, condition: 'Excellent Health', color: '#2e3f1a' },
  ];

  // PRELOADER
  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative flex flex-col items-center gap-12">
          {/* Animated Rockstar-style logo reveal */}
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <motion.div
              className="text-6xl font-black tracking-tighter text-white"
              style={{ letterSpacing: '-0.02em' }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              GAMESTOP
            </motion.div>
            <motion.div
              className="absolute -bottom-3 left-0 h-0.5 bg-red-600"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="w-64 h-1 bg-zinc-900 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-white"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ delay: 0.7, duration: 1.8, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* STICKY NAVIGATION */}
      <motion.nav
        className="fixed top-0 z-40 w-full backdrop-blur-md bg-black/50 border-b border-zinc-900/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <motion.h1
            className="text-xl font-black tracking-tighter uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            GAMESTOP
          </motion.h1>

          <div className="hidden md:flex items-center gap-12">
            {['CATALOG', 'ABOUT', 'CONTACT'].map((item, idx) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="text-xs font-light tracking-widest uppercase text-white/70 hover:text-white transition-colors group relative"
              >
                {item}
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-red-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* CINEMATIC HERO SECTION */}
      <motion.section
        className="relative h-screen w-full flex items-center justify-center overflow-hidden mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: y1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-black" />
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(220, 38, 38, 0.1) 0%, transparent 50%)',
              backgroundSize: '200% 200%',
            }}
          />
        </motion.div>

        {/* Centered hero content */}
        <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.0] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{ letterSpacing: '-0.02em' }}
          >
            EXPERIENCE<br />
            <span className="text-red-600">THE NEXT ERA</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-light tracking-widest uppercase text-white/60 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Premium gaming hardware. Curated collection. Zero compromise.
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
          >
            <motion.button
              whileHover={{ 
                backgroundColor: '#dc2626',
                x: 8
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 border-2 border-white text-white font-bold tracking-widest uppercase text-sm transition-all"
            >
              BROWSE COLLECTION
            </motion.button>

            <motion.button
              whileHover={{ x: 8 }}
              className="px-8 py-4 text-white font-bold tracking-widest uppercase text-sm flex items-center gap-3 group"
            >
              SCROLL TO EXPLORE
              <motion.span
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-8 border border-white/30 rounded-full flex items-center justify-center">
            <motion.div
              className="w-0.5 h-2 bg-red-600"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* FEATURED SHOWCASE SECTION */}
      <motion.section
        className="relative py-24 md:py-40 px-6 md:px-12 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase mb-4">
              PREMIUM COLLECTION
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Handpicked<br />Gaming Hardware
            </h2>
            <div className="w-12 h-1 bg-red-600" />
          </motion.div>

          {/* Featured products grid - Magazine style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Large featured product */}
            <motion.div
              className="md:col-span-2 md:row-span-2 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
            >
              <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-900 to-black overflow-hidden border border-zinc-900">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-8xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  🎮
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="mt-6">
                <p className="text-xs font-bold text-red-600 tracking-widest uppercase mb-3">
                  PlayStation 5 Slim
                </p>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                  Next Generation Gaming
                </h3>
                <p className="text-sm text-white/60 font-light leading-relaxed mb-4">
                  Experience unprecedented performance with the PS5 Slim. Premium hardware, pristine condition.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-600">$550.00</span>
                  <motion.button
                    whileHover={{ backgroundColor: '#dc2626' }}
                    className="px-6 py-2 border border-white text-white text-xs font-bold uppercase tracking-wider hover:border-red-600 transition-colors"
                  >
                    Add to cart
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Vertical featured product */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
            >
              <div className="relative aspect-[3/4] bg-gradient-to-br from-blue-950 to-black overflow-hidden border border-zinc-900">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-6xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  🎮
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold text-red-600 tracking-widest uppercase mb-2">
                  Nintendo Switch
                </p>
                <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                  OLED Edition
                </h3>
                <p className="text-xs text-white/60 mb-3">Boxed, pristine condition</p>
                <span className="text-xl font-bold text-red-600">$420.00</span>
              </div>
            </motion.div>

            {/* Smaller featured product */}
            <motion.div
              className="group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -12 }}
            >
              <div className="relative aspect-[3/4] bg-gradient-to-br from-green-950 to-black overflow-hidden border border-zinc-900">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-6xl"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  🎮
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-bold text-red-600 tracking-widest uppercase mb-2">
                  Xbox Series X
                </p>
                <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                  Pure Power
                </h3>
                <p className="text-xs text-white/60 mb-3">Clean, pre-owned</p>
                <span className="text-xl font-bold text-red-600">$500.00</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* FULL-WIDTH COLLECTION GRID */}
      <motion.section
        className="relative py-24 md:py-40 bg-[#0a0a0a] border-y border-zinc-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section header */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-bold tracking-[0.2em] text-red-600 uppercase mb-4">
              COMPLETE INVENTORY
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              All Available Products
            </h2>
          </motion.div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* Product card */}
                <div className="border border-zinc-900 overflow-hidden bg-gradient-to-br from-zinc-900/50 to-black group-hover:border-white transition-colors duration-300">
                  {/* Image container */}
                  <div className="relative aspect-square overflow-hidden bg-black flex items-center justify-center">
                    <motion.div
                      className="text-6xl"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ duration: 0.5 }}
                    >
                      🎮
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/10 transition-colors duration-300 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.button
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="px-6 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-wider"
                      >
                        Quick View
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Product info */}
                  <div className="p-6">
                    <p className="text-xs font-bold text-red-600 tracking-widest uppercase mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-black uppercase tracking-tight leading-tight mb-2 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      <span className="text-xs text-white/50 uppercase">{product.condition}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* TESTIMONIALS / STATS SECTION */}
      <motion.section
        className="relative py-24 md:py-40 px-6 md:px-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { number: '500+', label: 'Products in Stock' },
              { number: '10K+', label: 'Satisfied Customers' },
              { number: '24/7', label: 'WhatsApp Support' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl md:text-6xl font-black text-red-600 mb-2">
                  {stat.number}
                </p>
                <p className="text-sm font-light tracking-widest uppercase text-white/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section
        className="relative py-24 md:py-40 px-6 md:px-12 bg-black border-y border-zinc-900 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background effect */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Level Up?
          </motion.h2>

          <motion.p
            className="text-lg font-light text-white/70 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Connect with our showroom via WhatsApp for product inquiries, custom orders, and exclusive deals.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(220, 38, 38, 0.5)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-red-600 text-white font-bold tracking-widest uppercase text-sm flex items-center gap-3 mx-auto border border-red-600 hover:border-red-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            MESSAGE SHOWROOM
          </motion.button>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        className="relative bg-black border-t border-zinc-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
          {/* Footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                GameStop
              </h3>
              <p className="text-sm text-white/60 font-light">
                Premium gaming hardware. Curated selection. Exceptional service.
              </p>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">
                Hours
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Tuesday: 9:00 AM – 6:00 PM
                </p>
                <p className="text-xs text-white/40">Shopping & Retail</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-4">
                Location
              </p>
              <div className="space-y-2 text-sm text-white/60">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Mbuya Nehanda Street, Harare
                </p>
                <p className="text-xs text-white/40">Zimbabwe</p>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-900 my-12" />

          {/* Bottom footer */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-white/50 uppercase tracking-widest font-light">
              © 2024 GameStop. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              Designed for premium gaming enthusiasts.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/store/cart";
import { site, products, slugify } from "@/data/products";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-red-500 text-black shadow-[0_4px_24px_-6px_rgba(120,120,255,0.6)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M12 3v18" strokeLinecap="round" />
          <path d="M5 7l14 10" strokeLinecap="round" />
          <path d="M19 7L5 17" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-tight text-white">
            CIRCUIT<span className="text-rgb">LOBBY</span>
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/35">
            {site.tagline.split(".")[0]}
          </span>
        </span>
      )}
    </Link>
  );
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop/playstation", label: "Consoles" },
  { href: "/shop/steering", label: "Accessories" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const { count, setOpen } = useCart();
  const pathname = usePathname();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setSearchOpen(false);
    setQuery("");
    setResultsOpen(false);
  };

  // close search on outside click / Escape
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const matches = query.trim()
    ? products
        .filter((p) => (p.name + " " + p.category).toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-3 py-2.5 transition-all duration-300 ${
          scrolled || searchOpen ? "glass" : "border border-transparent"
        }`}
        ref={boxRef}
      >
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenus}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                pathname === l.href ? "text-white" : "text-white/55 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          {/* Search trigger / bar */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Search"
              aria-expanded={searchOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/8 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-12 w-[min(90vw,360px)] overflow-hidden rounded-2xl glass p-2">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2.5">
                  <Search className="h-4 w-4 text-white/40" />
                  <input
                    autoFocus
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setResultsOpen(true);
                    }}
                    onFocus={() => setResultsOpen(true)}
                    placeholder="Search the lobby…"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
                    aria-label="Search products"
                  />
                </div>
                {resultsOpen && (
                  <div className="mt-2 max-h-80 overflow-y-auto">
                    {query.trim() === "" ? (
                      <p className="px-3 py-3 text-xs text-white/40">
                        Type to find consoles, accessories &amp; more.
                      </p>
                    ) : matches.length === 0 ? (
                      <p className="px-3 py-3 text-xs text-white/40">No matches found.</p>
                    ) : (
                      matches.map((p) => (
                        <Link
                          key={p.id}
                          href={`/product/${slugify(p.id)}`}
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery("");
                          }}
                          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/6"
                        >
                          <img
                            src={p.images[0]}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-white">{p.name}</p>
                            <p className="text-xs text-white/35">{p.category}</p>
                          </div>
                          <span className="text-sm font-semibold text-white/80">${p.price}</span>
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/8 hover:text-white"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-1 text-[10px] font-bold text-black">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/8 hover:text-white md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl glass p-2 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenus}
                className={`rounded-xl px-4 py-3 text-base font-medium ${
                  pathname === l.href ? "text-white" : "text-white/60"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

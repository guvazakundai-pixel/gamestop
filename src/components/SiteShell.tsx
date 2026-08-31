"use client";

import Link from "next/link";
import { Nav } from "./Nav";
import CartDrawer from "./CartDrawer";
import { MobileBottomNav, WhatsAppFloat } from "./MobileNav";
import { CartProvider } from "@/store/cart";
import { site, waGeneral } from "@/data/products";

function FooterInner() {
  return (
    <footer className="mt-auto border-t border-white/8 bg-[#07070a]">
      <div className="cl-container py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-purple-500 to-red-500 text-black">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 3v18" strokeLinecap="round" />
                  <path d="M5 7l14 10" strokeLinecap="round" />
                  <path d="M19 7L5 17" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-lg font-bold tracking-tight">
                CIRCUIT<span className="text-rgb">LOBBY</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/45">
              {site.tagline} A premium gaming marketplace for consoles, accessories
              and the gear that builds your setup.
            </p>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Shop</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link className="text-white/60 hover:text-white" href="/shop">All Products</Link></li>
              <li><Link className="text-white/60 hover:text-white" href="/shop/playstation">PlayStation</Link></li>
              <li><Link className="text-white/60 hover:text-white" href="/shop/xbox">Xbox</Link></li>
              <li><Link className="text-white/60 hover:text-white" href="/shop/nintendo">Nintendo</Link></li>
              <li><Link className="text-white/60 hover:text-white" href="/shop/steering">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Contact</p>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Mbuya Nehanda Street</li>
              <li>Harare, Zimbabwe</li>
              <li>Mon – Sat: 8AM – 6PM</li>
              <li>Sun: 9AM – 4PM</li>
              <li>
                <a href={waGeneral("Hi CIRCUITLOBBY, I'd like to chat.")} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white">
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 md:flex-row">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/20">
            Built for the lobby · Harare, ZW
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="cl-bg-ambient flex min-h-screen flex-col pb-20 text-white md:pb-0">
        <Nav />
        <main className="flex-1">{children}</main>
        <FooterInner />
        <MobileBottomNav />
        <WhatsAppFloat />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

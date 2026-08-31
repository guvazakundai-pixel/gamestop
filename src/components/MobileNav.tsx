"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import { waGeneral } from "@/data/products";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed inset-x-3 bottom-3 z-40 md:hidden"
    >
      <div className="mx-auto flex max-w-sm items-center justify-around rounded-full glass px-3 py-2">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-label={it.label}
              className={`flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 text-[10px] font-medium transition-colors ${
                active ? "text-white" : "text-white/45"
              }`}
            >
              <Icon className="h-5 w-5" />
              {it.label}
            </Link>
          );
        })}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open cart"
          className="relative flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 text-[10px] font-medium text-white/45"
        >
          <ShoppingBag className="h-5 w-5" />
          Cart
          {count > 0 && (
            <span className="absolute right-2 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-1 text-[10px] font-bold text-black">
              {count}
            </span>
          )}
        </button>
        <a
          href={waGeneral("Hi CIRCUITLOBBY, I'd like to know more about your gear.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message on WhatsApp"
          className="flex flex-col items-center gap-0.5 rounded-full px-4 py-1.5 text-[10px] font-medium text-white/45"
        >
          <MessageCircle className="h-5 w-5" />
          Chat
        </a>
      </div>
    </nav>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={waGeneral("Hi CIRCUITLOBBY, I'd like to know more about your gear.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message CIRCUITLOBBY on WhatsApp"
      className="fixed bottom-24 right-4 z-40 hidden h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-105 md:grid"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

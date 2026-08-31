"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

/**
 * Curated "setup" sections — only built from real catalog products.
 * Each setup edits together a complementary set from the actual data.
 */
const SETUPS = [
  {
    key: "console-lobby",
    name: "CONSOLE LOBBY",
    tag: "Everything to get you playing",
    ids: ["ps5-console", "ps5-ps4-games", "nintendo-switch"],
  },
  {
    key: "competitive",
    name: "COMPETITIVE LOADOUT",
    tag: "High-performance picks for the lobby",
    ids: ["xbox-series-s", "ps5-ps4-games"],
  },
  {
    key: "racing-setup",
    name: "RACING RIG",
    tag: "Sim racing essentials",
    ids: ["logitech-steering", "ps5-ps4-games"],
  },
];

export function CuratedSetups() {
  return (
    <div className="space-y-16">
      {SETUPS.map((setup) => {
        const items = setup.ids
          .map((id) => products.find((p) => p.id === id))
          .filter(Boolean) as typeof products;
        if (items.length === 0) return null;
        return (
          <section key={setup.key} aria-label={setup.name}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="cl-eyebrow mb-2">Curated Setup</p>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{setup.name}</h2>
                <p className="mt-1 text-sm text-white/45">{setup.tag}</p>
              </div>
              <Link
                href="/shop"
                className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                Explore
              </Link>
            </div>
            <div className="prod-grid--3">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
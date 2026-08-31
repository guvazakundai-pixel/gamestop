"use client";

import Link from "next/link";
import { categories, products } from "@/data/products";

/**
 * Featured category cards — CSS/SVG atmospheric treatments with the first
 * real product image floating for each. Only categories with real products.
 */
export default function CategoryCards() {
  const withProducts = categories.filter((c) =>
    products.some((p) => p.categorySlug === c.slug)
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {withProducts.map((cat, i) => {
        const first = products.find((p) => p.categorySlug === cat.slug);
        const accents = [
          "from-cyan-400/25 to-cyan-400/0",
          "from-purple-400/25 to-purple-400/0",
          "from-red-400/25 to-red-400/0",
          "from-green-400/25 to-green-400/0",
          "from-magenta-400/25 to-magenta-400/0",
        ];
        return (
          <Link
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/5 to-transparent transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
          >
            {/* radial accent */}
            <div
              className={`absolute -right-8 -top-10 h-40 w-40 rounded-[50%] bg-gradient-to-br ${accents[i % accents.length]} blur-2xl transition-opacity duration-300 opacity-40 group-hover:opacity-80`}
              aria-hidden
            />
            {first && (
              <img
                src={first.images[0]}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="relative z-10 p-5">
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{cat.name}</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                {products.filter((p) => p.categorySlug === cat.slug).length} item(s)
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
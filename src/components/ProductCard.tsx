"use client";

import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Product } from "@/data/products";
import { slugify } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <Link
      href={`/product/${slugify(product.id)}`}
      className="glass-card rgb-edge group relative flex flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
      aria-label={product.name}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#111116]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-300 to-purple-400">
            {product.badge}
          </span>
        )}

        {product.inStock ? (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium text-emerald-300 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> In stock
          </span>
        ) : null}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          aria-label={`Wishlist ${product.name}`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-300 hover:text-white group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            add(product);
          }}
          aria-label={`Add ${product.name} to cart`}
          className="absolute inset-x-3 bottom-3 grid place-items-center gap-1.5 rounded-full bg-white/92 py-2.5 text-xs font-semibold text-black opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white group-hover:opacity-100"
        >
          <Plus className="h-4 w-4" /> Add to Cart
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {product.category}
        </p>
        <h3 className="line-clamp-1 text-sm font-semibold text-white transition-colors group-hover:text-white/90">
          {product.name}
        </h3>
        <p className="text-xs text-white/35">{product.condition}</p>
        <div className="mt-auto flex items-baseline justify-between pt-2">
          <span className="text-lg font-semibold">${product.price}</span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">USD</span>
        </div>
      </div>
    </Link>
  );
}

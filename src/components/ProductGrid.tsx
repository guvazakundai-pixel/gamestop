"use client";

import Link from "next/link";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function ProductGrid({
  items,
  title,
  eyebrow,
  seeAllHref,
  cols = 4,
}: {
  items: typeof products;
  title?: string;
  eyebrow?: string;
  seeAllHref?: string;
  cols?: 3 | 4;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      {(title || seeAllHref) && (
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {eyebrow && <p className="cl-eyebrow mb-2">{eyebrow}</p>}
            {title && <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>}
          </div>
          {seeAllHref && (
            <Link
              href={seeAllHref}
              className="shrink-0 rounded-full border border-white/12 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              View all
            </Link>
          )}
        </div>
      )}
      <div className={cols === 3 ? "prod-grid prod-grid--3" : "prod-grid"}>
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
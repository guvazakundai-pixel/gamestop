"use client";

import ProductCard from "./ProductCard";
import { products, type Product } from "@/data/products";

const COMPLEMENT: Record<string, string[]> = {
  playstation: ["games", "steering"],
  xbox: ["games", "steering"],
  nintendo: ["games"],
  games: ["playstation", "xbox", "nintendo"],
  steering: ["playstation", "xbox", "games"],
};

export default function RelatedProducts({ current }: { current: Product }) {
  // "More like this" — same category
  const likeThis = products.filter(
    (p) => p.categorySlug === current.categorySlug && p.id !== current.id
  );

  // "Complete your setup" — complementary categories
  const complementIds = COMPLEMENT[current.categorySlug] ?? [];
  const completeSet = products.filter(
    (p) => complementIds.includes(p.categorySlug) && p.id !== current.id
  );

  // fill with any others if short
  const others = products
    .filter((p) => p.id !== current.id && !likeThis.includes(p) && !completeSet.includes(p))
    .slice(0, Math.max(0, 4 - completeSet.length - likeThis.length));

  const section = (title: string, eyebrow: string, items: typeof products) =>
    items.length > 0 ? (
      <section aria-label={title} className="pt-14">
        <div className="mb-6">
          <p className="cl-eyebrow mb-2">{eyebrow}</p>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        </div>
        <div className="prod-grid">
          {items.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    ) : null;

  return (
    <>
      {section("Complete your setup", "Pair it with", completeSet)}
      {section("More like this", "Similar gear", likeThis)}
      {section("You may also like", "Recommended", others)}
    </>
  );
}
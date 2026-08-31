import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { products, categories } from "@/data/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category not found" };
  return {
    title: cat.name,
    description: `Shop ${cat.name} at CIRCUITLOBBY — consoles, games and accessories.`,
  };
}

// category-specific intro (neutral, factual)
const CAT_INTROS: Record<string, string> = {
  playstation: "PlayStation consoles and games, ready for the lobby.",
  xbox: "Xbox consoles and titles for your setup.",
  nintendo: "Nintendo Switch consoles and accessories.",
  games: "Pre-owned game discs, tested and working.",
  steering: "Sim racing and gaming accessories.",
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const items = products.filter((p) => p.categorySlug === slug);
  if (items.length === 0) notFound();

  const relatedCats = categories.filter(
    (c) => c.slug !== slug && products.some((p) => p.categorySlug === c.slug)
  );

  return (
    <div className="cl-container pb-16 pt-32 sm:pt-36">
      <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
        <Link href="/shop" className="hover:text-white/70">Shop</Link>
        <span>/</span>
        <span className="text-white/60">{cat.name}</span>
      </div>

      <div className="mb-10 border-b border-white/8 pb-10">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{cat.icon}</span>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{cat.name}</h1>
        </div>
        <p className="mt-2 max-w-xl text-white/50">
          {CAT_INTROS[slug] ?? `Shop ${cat.name} at CIRCUITLOBBY.`}
        </p>
      </div>

      <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
        {items.length} {items.length === 1 ? "product" : "products"}
      </div>

      <ProductGrid items={items} cols={4} />

      {relatedCats.length > 0 && (
        <div className="mt-20">
          <p className="cl-eyebrow mb-5">Related categories</p>
          <div className="flex flex-wrap gap-2">
            {relatedCats.map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}`} className="pill">
                {c.icon} {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
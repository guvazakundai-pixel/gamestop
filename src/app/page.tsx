import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import ProductGrid from "@/components/ProductGrid";
import { CuratedSetups } from "@/components/CuratedSetups";
import { PromoFeature, BrandStatement } from "@/components/Promo";
import { products } from "@/data/products";

export default function Home() {
  const featured = products.filter((p) => p.badge).slice(0, 4);
  const trending = products.slice(0, 4);
  const newArrivals = products.slice(2, 6);

  return (
    <>
      <Hero />

      {/* Featured categories */}
      <section className="cl-container pb-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="cl-eyebrow mb-2">Explore</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Browse categories</h2>
          </div>
        </div>
        <CategoryCards />
      </section>

      {/* Trending */}
      <section className="cl-container pb-16 sm:pb-20">
        <ProductGrid
          items={trending}
          title="Trending now"
          eyebrow="Popular picks"
          seeAllHref="/shop"
        />
      </section>

      {/* Featured gear */}
      <section className="border-y border-white/6 bg-white/[0.015]">
        <div className="cl-container py-16 sm:py-20">
          <ProductGrid
            items={featured}
            title="Featured gaming gear"
            eyebrow="Curated"
            cols={4}
          />
        </div>
      </section>

      {/* Curated setups */}
      <section className="cl-container py-16 sm:py-20">
        <div className="mb-8">
          <p className="cl-eyebrow mb-2">Complete your setup</p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Editor-built loadouts
          </h2>
        </div>
        <CuratedSetups />
      </section>

      {/* New arrivals */}
      <section className="cl-container pb-16 sm:pb-20">
        <ProductGrid
          items={newArrivals}
          title="New arrivals"
          eyebrow="Fresh in"
          seeAllHref="/shop"
        />
      </section>

      <PromoFeature />
      <BrandStatement />
    </>
  );
}
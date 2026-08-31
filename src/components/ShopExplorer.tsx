"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import { products, categories } from "@/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
  { key: "name", label: "Name" },
];

const FILTERS: { key: string; label: string; match: (p: (typeof products)[number]) => boolean }[] = [
  { key: "inStock", label: "In stock", match: (p) => p.inStock },
  { key: "new", label: "Brand new", match: (p) => p.condition === "Brand New" },
  { key: "preowned", label: "Pre-owned", match: (p) => p.condition === "Pre-owned" },
];

export default function ShopExplorer() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const all = useMemo(
    () =>
      products.filter((p) => {
        const okCat = cat === "all" || p.categorySlug === cat;
        const okQuery =
          query.trim() === "" ||
          (p.name + " " + p.category).toLowerCase().includes(query.toLowerCase());
        const okFilter = [...activeFilters].every((f) =>
          FILTERS.find((x) => x.key === f)!.match(p)
        );
        return okCat && okQuery && okFilter;
      }),
    [query, cat, activeFilters]
  );

  const sorted = useMemo(() => {
    const arr = [...all];
    switch (sort) {
      case "price-asc":
        return arr.sort((a, b) => a.price - b.price);
      case "price-desc":
        return arr.sort((a, b) => b.price - a.price);
      case "name":
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return arr;
    }
  }, [all, sort]);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div>
      {/* Search + controls */}
      <div className="glass mb-6 rounded-2xl p-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2.5">
            <Search className="h-4 w-4 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the lobby…"
              aria-label="Search products"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-white/40" />
            <label className="sr-only" htmlFor="sort">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-white/10 bg-black/40 px-4 py-2.5 text-sm text-white focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key} className="bg-[#0d0d11]">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setCat("all")}
            className={`pill ${cat === "all" ? "on" : ""}`}
            aria-pressed={cat === "all"}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`pill ${cat === c.slug ? "on" : ""}`}
              aria-pressed={cat === c.slug}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>

        {/* Availability filters */}
        <div className="mt-3 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => toggleFilter(f.key)}
              className={`pill ${activeFilters.has(f.key) ? "on" : ""}`}
              aria-pressed={activeFilters.has(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
        {sorted.length} {sorted.length === 1 ? "product" : "products"}
      </p>

      {sorted.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/12 py-24 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-2xl">🕹️</div>
          <p className="text-sm font-medium text-white/70">No products match</p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-white/40">
            Try a different search or clear your filters to see the full lobby.
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCat("all");
              setActiveFilters(new Set());
            }}
            className="mt-5 rounded-full border border-white/15 px-5 py-2 text-sm text-white/70 hover:text-white"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="prod-grid">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
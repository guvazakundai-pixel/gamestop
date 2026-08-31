"use client";

import { useState } from "react";
import { MessageCircle, Plus } from "lucide-react";
import ProductGallery from "@/components/ProductGallery";
import RelatedProducts from "@/components/RelatedProducts";
import { useCart } from "@/store/cart";
import { waProduct, waTrade } from "@/data/products";
import type { Product } from "@/data/products";

export default function ProductPageClient({ product }: { product: Product }) {
  const { add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const price = product.price * qty;

  const handleBuy = () => {
    const link = waProduct(product);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="cl-container pb-16 pt-32 sm:pt-36">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="min-w-0">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Details */}
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
              {product.category}
            </p>
            {product.inStock && (
              <span className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 text-[11px] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> In stock
              </span>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-white/45">{product.condition}</p>

          <div className="mt-6 flex items-baseline gap-3 border-y border-white/8 py-5">
            <span className="text-4xl font-semibold tracking-tight">${price}</span>
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/40">USD</span>
          </div>

          {product.specs && product.specs.length > 0 && (
            <div className="mt-6">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
                At a glance
              </p>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.specs.map((s) => (
                  <li key={s} className="rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5 text-sm text-white/65">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-7">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Quantity</p>
            <div className="inline-flex items-center gap-1 rounded-full border border-white/12 px-1.5 py-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10"
              >
                −
              </button>
              <span className="w-10 text-center text-base font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
                className="grid h-10 w-10 place-items-center rounded-full text-white/70 hover:bg-white/10"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) add(product);
                setOpen(true);
              }}
              className="btn-glass w-full"
            >
              <Plus className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={handleBuy} className="btn-primary w-full">
              <MessageCircle className="h-4 w-4" /> Buy Now on WhatsApp
            </button>
            <a
              href={waTrade(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              Trade in your old {product.category}
            </a>
          </div>

          <p className="mt-6 text-xs text-white/35">
            Orders confirmed via WhatsApp. Delivery available across Harare.
          </p>
        </div>
      </div>

      <RelatedProducts current={product} />
    </div>
  );
}
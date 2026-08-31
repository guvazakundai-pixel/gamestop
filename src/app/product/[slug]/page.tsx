import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductPageClient from "@/components/ProductPageClient";
import { products, slugify, type Product } from "@/data/products";

const bySlug = (slug: string): Product | undefined =>
  products.find((p) => slugify(p.id) === slug);

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: slugify(p.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.name} (${product.condition}) — $${product.price} USD. ${product.category} at CIRCUITLOBBY.`,
    openGraph: {
      title: `${product.name} · CIRCUITLOBBY`,
      description: `${product.name} — $${product.price} USD at CIRCUITLOBBY.`,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = bySlug(slug);
  if (!product) notFound();
  return <ProductPageClient product={product} />;
}
import type { Metadata } from "next";
import ShopExplorer from "@/components/ShopExplorer";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse consoles, games and gaming accessories at CIRCUITLOBBY. Search, filter and sort the full catalog.",
};

export default function ShopPage() {
  return (
    <div className="cl-container pb-16 pt-32 sm:pt-36">
      <div className="mb-8">
        <p className="cl-eyebrow mb-2">The Lobby</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Shop</h1>
        <p className="mt-2 max-w-xl text-white/50">
          The full CIRCUITLOBBY catalog. Consoles, games and accessories — searchable,
          filterable and ready for the lobby.
        </p>
      </div>
      <ShopExplorer />
    </div>
  );
}
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * CIRCUITLOBBY homepage hero — atmospheric CSS/SVG treatment.
 * No AI-generated imagery; an original "digital lobby" composition built
 * from gradients, glass panels and an abstract circuit mark.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 sm:pt-36">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(56,189,248,0.16),transparent)] blur-2xl" />
        <div className="absolute right-[-80px] top-24 h-72 w-72 rounded-[50%] bg-[radial-gradient(closest-side,rgba(167,139,250,0.14),transparent)] blur-2xl" />
        <div className="absolute bottom-0 left-[-60px] h-72 w-72 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,59,92,0.12),transparent)] blur-2xl" />
      </div>

      {/* grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
        }}
        aria-hidden
      />

      <div className="cl-container relative z-10 pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="cl-eyebrow mb-6 justify-center">The Digital Lobby for Gamers</p>

          <h1 className="text-5xl font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Your gaming world.
            <br />
            <span className="text-rgb">Your gear. Your lobby.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg font-light text-white/55">
            CIRCUITLOBBY is a premium gaming marketplace — consoles, controllers,
            keyboards, and the equipment that builds your setup.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/shop" className="btn-primary">
              Explore the Store <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/shop/playstation" className="btn-glass">
              Browse Consoles
            </Link>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["Consoles", "Controllers", "Keyboards", "Monitors", "Setup Gear"].map((t) => (
              <Link
                key={t}
                href="/shop"
                className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white/70"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* circuit mark */}
        <div
          className="pointer-events-none relative mx-auto mt-14 flex max-w-4xl items-center justify-center"
          aria-hidden
        >
          <div className="glass w-full rounded-3xl px-6 py-10 sm:px-12">
            <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
              {[
                { k: "Consoles", v: "Pre-owned & new" },
                { k: "Repair lab", v: "On-site service" },
                { k: "Trade-ins", v: "Instant cash" },
                { k: "Delivery", v: "Across Harare" },
              ].map((s) => (
                <div key={s.k} className="text-center">
                  <p className="text-sm font-semibold text-white">{s.k}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
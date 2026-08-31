"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Promotional feature — clean messaging, no fake discounts.
 * Tone-driven, restrained RGB lighting.
 */
export function PromoFeature() {
  return (
    <section className="cl-container py-16 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl border border-white/10">
        {/* atmosphere */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px 300px at 20% 0%, rgba(56,189,248,0.12), transparent 60%), radial-gradient(500px 300px at 90% 100%, rgba(167,139,250,0.12), transparent 60%), linear-gradient(160deg, #0b0b0f, #050506)",
          }}
          aria-hidden
        />
        <div className="relative z-10 flex flex-col items-start gap-6 p-8 sm:p-14">
          <p className="cl-eyebrow">Repair Lab Open</p>
          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Your next loadout starts with gear that works.
          </h2>
          <p className="max-w-md text-white/50">
            On-site repairs, quick valuations and genuine trade-ins. Bring your
            old console in and leave with something that fits the lobby.
          </p>
          <Link
            href="/shop"
            className="btn-glass mt-2"
          >
            Browse the shop <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function BrandStatement() {
  return (
    <section className="cl-container py-16 text-center">
      <p className="cl-eyebrow mb-5 justify-center">Built for the Lobby</p>
      <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
        <span className="text-rgb">CIRCUITLOBBY</span> is where Zimbabwe meets the
        hardware that builds a setup.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-white/45">
        Consoles, accessories and repairs. A premium standard from the chair to the
        controller.
      </p>
    </section>
  );
}
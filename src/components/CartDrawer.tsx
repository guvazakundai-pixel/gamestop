"use client";

import { useCart } from "@/store/cart";
import { waGeneral } from "@/data/products";

export default function CartDrawer() {
  const { items, count, subtotal, remove, setQty, open, setOpen } = useCart();

  const checkoutMsg = () => {
    const lines = items.map(
      (i, n) => `${n + 1}. ${i.product.name} — $${i.product.price} x ${i.qty}`
    );
    return `Hi CIRCUITLOBBY, I'd like to order:\n${lines.join(
      "\n"
    )}\n\nSubtotal: $${subtotal.toFixed(2)} (USD)`;
  };

  return (
    <>
      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[#0c0c10] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
          <h2 className="text-lg font-semibold">
            Your cart{" "}
            {count > 0 && (
              <span className="ml-1 text-sm font-normal text-white/40">({count})</span>
            )}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full text-white/60 hover:bg-white/8 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center py-16">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 text-2xl">🎮</div>
              <p className="text-sm font-medium text-white/70">Your cart is empty</p>
              <p className="max-w-[220px] text-xs text-white/40">
                Head to the shop and add some gear to your lobby.
              </p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="h-16 w-16 rounded-xl border border-white/8 object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <p className="text-sm font-medium text-white">{item.product.name}</p>
                    <p className="text-xs text-white/35">{item.product.category}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-white/10 px-2 py-1">
                        <button
                          onClick={() => setQty(item.product.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                          className="grid h-5 w-5 place-items-center rounded-full text-white/60 hover:bg-white/10"
                        >
                          −
                        </button>
                        <span className="w-5 text-center text-sm">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.product.id, item.qty + 1)}
                          aria-label="Increase quantity"
                          className="grid h-5 w-5 place-items-center rounded-full text-white/60 hover:bg-white/10"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold">
                        ${(item.product.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(item.product.id)}
                    aria-label={`Remove ${item.product.name}`}
                    className="self-start text-white/30 hover:text-white/70"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-white/8 px-5 py-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-white/50">Subtotal</span>
              <span className="text-xl font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="mb-4 text-xs text-white/35">
              Orders are confirmed via WhatsApp. Delivery available across Harare.
            </p>
            <a
              href={waGeneral(checkoutMsg())}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              Checkout on WhatsApp
            </a>
          </div>
        )}
      </aside>
    </>
  );
}

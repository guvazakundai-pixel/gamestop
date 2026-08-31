import Link from "next/link";

export default function NotFound() {
  return (
    <div className="cl-container flex min-h-[70vh] flex-col items-center justify-center pt-32 text-center">
      <p className="cl-eyebrow mb-4 justify-center">404</p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">This station is off the grid.</h1>
      <p className="mx-auto mt-4 max-w-md text-white/50">
        That page isn&apos;t part of the lobby. The gear you&apos;re looking for
        might be elsewhere in the shop.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/shop" className="btn-glass">Browse the Shop</Link>
      </div>
    </div>
  );
}
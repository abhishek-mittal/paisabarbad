import Link from "next/link";
import { CartIcon } from "./CartIcon";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-display text-xl font-bold">
          <span className="text-primary">Paisa</span>
          <span className="text-accent">Barbad</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/reviews/"
            className="font-mono text-sm text-text-secondary transition hover:text-primary"
          >
            All Products
          </Link>
          <CartIcon />
        </nav>
      </div>
    </header>
  );
}

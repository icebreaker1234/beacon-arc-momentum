import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-dark text-surface-dark-foreground">
      <div className="site-container grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:py-20">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-7 text-surface-dark-muted">Useful software, thoughtful automation, and practical AI for growing businesses.</p>
          <p className="mt-8 text-xs uppercase tracking-widest text-surface-dark-muted">Contact details available on request</p>
        </div>
        <div>
          <p className="footer-label">Navigate</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Link to="/services" className="footer-link">Services</Link><Link to="/work" className="footer-link">Work</Link><Link to="/about" className="footer-link">About</Link><Link to="/contact" className="footer-link">Contact</Link>
          </div>
        </div>
        <div>
          <p className="footer-label">Information</p>
          <div className="mt-4 grid gap-3 text-sm">
            <Link to="/privacy" className="footer-link">Privacy policy</Link><Link to="/terms" className="footer-link">Terms</Link>
            <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-primary">Start a conversation <ArrowUpRight className="size-4" /></Link>
          </div>
        </div>
      </div>
      <div className="site-container flex flex-col gap-2 border-t border-surface-dark-border py-6 text-xs text-surface-dark-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Beacon Arc. All rights reserved.</span><span>Clear systems, built with care.</span>
      </div>
    </footer>
  );
}

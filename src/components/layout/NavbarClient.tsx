"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
  openInNewTab?: boolean;
}

interface NavbarClientProps {
  logo: string;
  links: NavLink[];
  cta: { label: string; href: string };
}

// Social SVG icons (same as used in footer)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.85 4.85 0 01-1.01-.09z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function NavbarClient({ logo, links, cta }: NavbarClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white shadow-sm transition-all duration-300">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-display font-semibold text-[#1A1A2E] tracking-tight"
            >
              {logo}
            </Link>
          </div>

          {/* Center: Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                className="text-sm font-body font-medium text-[#1A1A2E] hover:text-[#3B5BFF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Social icons + CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            {/* Social icons (desktop) */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A2E] hover:text-[#3B5BFF] transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A2E] hover:text-[#3B5BFF] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A2E] hover:text-[#3B5BFF] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1A1A2E] hover:text-[#3B5BFF] transition-colors"
                aria-label="YouTube"
              >
                <YouTubeIcon />
              </a>
            </div>

            {/* CTA button */}
            <Link
              href={cta.href}
              className="bg-[#3B5BFF] text-white px-6 py-2 rounded-full text-sm font-body font-medium hover:bg-[#2a4adf] transition-colors whitespace-nowrap"
            >
              {cta.label}
            </Link>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-1 text-[#1A1A2E] hover:text-[#3B5BFF] transition-colors"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white flex flex-col pt-20 px-8 gap-6 md:hidden transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-display text-2xl font-medium text-[#1A1A2E] hover:text-[#3B5BFF] transition-colors"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={cta.href}
          className="mt-4 inline-flex self-start bg-[#3B5BFF] text-white px-6 py-3 rounded-full text-sm font-body font-medium hover:bg-[#2a4adf] transition-colors"
          onClick={() => setOpen(false)}
        >
          {cta.label}
        </Link>
        <div className="flex items-center gap-4 pt-4">
          <a href="#" className="text-[#1A1A2E] hover:text-[#3B5BFF]"><TikTokIcon /></a>
          <a href="#" className="text-[#1A1A2E] hover:text-[#3B5BFF]"><LinkedInIcon /></a>
          <a href="#" className="text-[#1A1A2E] hover:text-[#3B5BFF]"><InstagramIcon /></a>
          <a href="#" className="text-[#1A1A2E] hover:text-[#3B5BFF]"><YouTubeIcon /></a>
        </div>
      </div>
    </>
  );
}
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DERIV_AFFILIATE_URL } from "@/lib/seo";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/academy" },
  { label: "Labs", href: "/labs" },
  { label: "Community", href: "/community" },
  { label: "Partners", href: "/partners" },
  { label: "About", href: "/about" },
] as const;

export function IconMark({ size = 28 }: { size?: number }) {
  const iconSrc = size <= 32 ? "/icon-32.png" : "/icon-192.png";
  return (
    <img
      src={iconSrc}
      alt="SoftPip"
      width={size}
      height={size}
      className="rounded-[22%] object-cover shrink-0"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const overlayEl = overlayRef.current;
    const focusables = overlayEl
      ? Array.from(overlayEl.querySelectorAll<HTMLElement>(focusableSelector))
      : [];

    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        toggleBtnRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && overlayEl) {
        const currentFocusables = Array.from(
          overlayEl.querySelectorAll<HTMLElement>(focusableSelector)
        );
        if (currentFocusables.length === 0) return;

        const firstEl = currentFocusables[0];
        const lastEl = currentFocusables[currentFocusables.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 hairline-b"
        style={{
          backgroundColor: "rgba(8, 11, 15, 0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="container-shell flex items-center justify-between h-16 gap-3">
          {/* Brand Left */}
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] text-[var(--text)] no-underline shrink-0"
            aria-label="SoftPip Home"
          >
            {/* Icon alone below 480px */}
            <img
              src="/icon-192.png"
              alt="SoftPip"
              width={26}
              height={26}
              className="h-[26px] w-[26px] rounded-[22%] object-cover min-[480px]:hidden"
            />
            {/* Full lockup above 480px */}
            <img
              src="/brand/nav-lockup.png"
              alt="SoftPip"
              height={26}
              className="h-[26px] w-auto object-contain hidden min-[480px]:block"
            />
          </Link>

          {/* Desktop Center/Right Inline Links (≥880px only) */}
          <nav
            aria-label="Primary"
            className="nav-desktop-links items-center gap-7"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative inline-flex items-center min-h-[44px] type-small transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--mint-text)] font-medium"
                      : "text-[var(--text-70)] hover:text-[var(--text)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-2 inset-x-0 h-[2px] bg-[var(--mint)] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Far Right: Mint Pill + (<880px) Hamburger */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={DERIV_AFFILIATE_URL}
              rel="sponsored noopener"
              target="_blank"
              className="btn-mint max-[399px]:px-2.5 max-[399px]:py-1 max-[399px]:text-xs max-[399px]:min-h-[38px]"
            >
              <span className="hidden min-[400px]:inline">Open $10 account</span>
              <span className="inline min-[400px]:hidden">$10 account</span>
            </a>

            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-overlay"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="nav-mobile-only items-center justify-center min-w-[44px] min-h-[44px] rounded-[14px] border border-[var(--line)] text-[var(--text)] bg-[var(--navy)] shrink-0"
            >
              {menuOpen ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4L14 14M14 4L4 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 5.5H15.5M2.5 9H15.5M2.5 12.5H15.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen --void overlay (<880px) */}
      {menuOpen && (
        <div
          id="mobile-nav-overlay"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="nav-mobile-overlay fixed inset-0 z-50 flex flex-col justify-between bg-[var(--void)] overflow-y-auto"
        >
          <div className="container-shell flex items-center justify-between h-16 hairline-b shrink-0">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center min-h-[44px] text-[var(--text)] no-underline"
              aria-label="SoftPip Home"
            >
              <img
                src="/brand/nav-lockup.png"
                alt="SoftPip"
                height={26}
                className="h-[26px] w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                toggleBtnRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-[14px] border border-[var(--line)] text-[var(--text)] bg-[var(--navy)]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 4L14 14M14 4L4 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav
            aria-label="Mobile full-screen"
            className="container-shell py-8 flex-1 flex flex-col justify-center gap-3"
          >
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`relative type-h2 py-1.5 inline-flex items-center min-h-[44px] transition-colors w-fit ${
                    isActive
                      ? "text-[var(--mint-text)] font-medium"
                      : "text-[var(--text)] hover:text-[var(--mint-text)]"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      className="absolute bottom-0 inset-x-0 h-[2px] bg-[var(--mint)] rounded-full"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="container-shell py-6 hairline-t shrink-0">
            <a
              href={DERIV_AFFILIATE_URL}
              rel="sponsored noopener"
              target="_blank"
              className="btn-mint w-full"
            >
              Open $10 account
            </a>
          </div>
        </div>
      )}

      {/* Sticky mobile bottom bar, 72px (+12px extra) + safe area bottom, mint pill (<880px) */}
      <div
        className="nav-mobile-only fixed bottom-0 inset-x-0 z-40 min-h-[72px] hairline-t items-center px-4"
        style={{
          backgroundColor: "rgba(8, 11, 15, 0.92)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          height: "calc(72px + env(safe-area-inset-bottom, 0px))",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <a
          href={DERIV_AFFILIATE_URL}
          rel="sponsored noopener"
          target="_blank"
          className="btn-mint w-full"
        >
          Open $10 account
        </a>
      </div>
    </>
  );
}

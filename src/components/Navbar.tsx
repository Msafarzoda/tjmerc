"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { Locale, localeLabels } from "@/lib/i18n";
import MBLogo from "./MBLogo";

export default function Navbar() {
  const { t, locale, setLocale } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    {
      label: t.nav.cars,
      href: "/cars",
      children: [
        { label: t.nav.allModels, href: "/cars" },
        { label: t.nav.newCars, href: "/cars/new" },
        { label: t.nav.usedCars, href: "/cars/used" },
      ],
    },
    { label: t.nav.service, href: "/service" },
    { label: t.nav.parts, href: "/parts" },
    { label: t.nav.finance, href: "/finance" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/98 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-[68px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <MBLogo size={40} />
          <div>
            <div className="text-white font-light text-[11px] tracking-[0.25em] uppercase leading-none">
              Mercedes-Benz
            </div>
            <div className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase mt-0.5 leading-none">
              Tajikistan
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => item.children && setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-3 py-2 text-[13px] text-gray-300 hover:text-white tracking-wide transition-colors"
              >
                {item.label}
                {item.children && <ChevronDown size={12} className="opacity-50" />}
              </Link>

              {item.children && dropdown === item.label && (
                <div className="absolute top-full left-0 pt-1 w-44">
                  <div className="bg-[#111] border border-[#222] shadow-2xl py-1">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-4 py-2.5 text-[12px] text-gray-400 hover:text-white hover:bg-white/5 tracking-wide transition-colors"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+992000000000"
            className="hidden md:flex items-center gap-2 text-[#c9a84c] text-[12px] hover:text-white transition-colors tracking-wide"
          >
            <Phone size={13} />
            +992 00 000-00-00
          </a>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="flex items-center gap-1 border border-[#2a2a2a] text-gray-400 hover:text-white hover:border-[#c9a84c] px-2.5 py-1.5 text-[11px] tracking-widest uppercase transition-colors"
            >
              {localeLabels[locale]}
              <ChevronDown size={10} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-1 bg-[#111] border border-[#222] shadow-2xl py-1 w-20">
                {(["ru", "tg", "en"] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-[11px] tracking-widest uppercase transition-colors ${
                      locale === l
                        ? "text-[#c9a84c]"
                        : "text-gray-500 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {localeLabels[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className="hidden md:block bg-[#c9a84c] text-black text-[11px] font-semibold px-5 py-2.5 tracking-[0.15em] uppercase hover:bg-white transition-colors"
          >
            {t.nav.testDrive}
          </Link>

          <button
            className="lg:hidden text-white p-1"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#0a0a0a] border-t border-[#1e1e1e]">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-4 text-[13px] text-gray-300 hover:text-white hover:bg-white/5 border-b border-[#181818] tracking-wide transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {/* Mobile language switcher */}
          <div className="px-6 py-4 flex items-center gap-3 border-b border-[#181818]">
            {(["ru", "tg", "en"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`text-[11px] tracking-widest uppercase px-2 py-1 border transition-colors ${
                  locale === l
                    ? "border-[#c9a84c] text-[#c9a84c]"
                    : "border-[#2a2a2a] text-gray-600 hover:text-white"
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
          <div className="px-6 py-4 flex items-center gap-2 text-[#c9a84c] text-sm">
            <Phone size={14} /> +992 00 000-00-00
          </div>
        </div>
      )}
    </header>
  );
}

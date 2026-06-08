"use client";
import Link from "next/link";
import { Shield, Wrench, Award, ArrowRight } from "lucide-react";
import { readCars } from "@/lib/db";
import CarCard from "@/components/CarCard";
import { useLang } from "@/lib/LanguageContext";
import { useEffect, useState } from "react";
import type { CarRecord } from "@/lib/db";

export default function Home() {
  const { t } = useLang();
  const [featured, setFeatured] = useState<CarRecord[]>([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((cars: CarRecord[]) => setFeatured(cars.filter((c) => c.featured).slice(0, 4)));
  }, []);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080808]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_#0f0f0f_0%,_#080808_50%,_#0a0a08_100%)]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px]" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080808] to-transparent" />
        </div>

        {/* Large decorative star */}
        <div className="absolute right-[5%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none hidden lg:block">
          <svg width="560" height="560" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="18" stroke="white" strokeWidth="0.3" />
            <circle cx="19" cy="19" r="14" stroke="white" strokeWidth="0.2" />
            <path d="M19 1 L20.9 17.3 L35.6 27.5 L19 21.5 L2.4 27.5 L17.1 17.3 Z" fill="white" fillOpacity="0.8" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-5 w-full py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-8 fade-up">
              <div className="w-8 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-[11px] tracking-[0.3em] uppercase">{t.hero.badge}</span>
            </div>

            <h1 className="font-display font-light leading-[1.05] mb-8 fade-up-2">
              <span className="block text-white text-[72px] md:text-[88px]">{t.hero.headline1}</span>
              <span className="block text-gradient text-[72px] md:text-[88px]">{t.hero.headline2}</span>
            </h1>

            <p className="text-gray-400 text-[15px] leading-relaxed mb-10 max-w-lg font-light fade-up-3">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 fade-up-3">
              <Link href="/cars/new" className="group flex items-center gap-3 bg-[#c9a84c] text-black px-7 py-3.5 text-[12px] font-semibold tracking-[0.15em] uppercase hover:bg-white transition-colors">
                {t.hero.cta}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="border border-[#c9a84c]/40 text-[#c9a84c] px-7 py-3.5 text-[12px] font-medium tracking-[0.15em] uppercase hover:border-[#c9a84c] hover:bg-[#c9a84c]/5 transition-all">
                {t.hero.testDrive}
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-5 py-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#1a1a1a]">
            {[
              ["20+", t.stats.models],
              ["15", t.stats.years],
              ["5 000+", t.stats.clients],
              ["24 / 7", t.stats.support],
            ].map(([n, l]) => (
              <div key={l} className="px-6 first:pl-0 last:pr-0 text-center md:text-left">
                <div className="font-display text-[#c9a84c] text-3xl font-light">{n}</div>
                <div className="text-gray-600 text-[11px] tracking-wide mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED CARS ─── */}
      <section className="max-w-7xl mx-auto px-5 py-28">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase">{t.sections.modelRange}</span>
            </div>
            <h2 className="font-display text-white text-5xl font-light">{t.sections.popularModels}</h2>
          </div>
          <Link href="/cars/new" className="hidden sm:flex items-center gap-2 text-[12px] text-[#c9a84c] tracking-widest uppercase hover:gap-3 transition-all">
            {t.sections.allModels} <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* ─── SERVICE BANNER ─── */}
      <section className="relative py-28 overflow-hidden bg-[#0e0e0e] border-y border-[#1a1a1a]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_50%,_rgba(201,168,76,0.05)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase">{t.sections.serviceCenter}</span>
            </div>
            <h2 className="font-display text-white text-5xl font-light leading-tight mb-6">
              {t.sections.authorizedService}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 text-[14px]">{t.sections.serviceDesc}</p>
            <Link href="/service" className="group inline-flex items-center gap-3 text-[#c9a84c] text-[12px] tracking-[0.15em] uppercase hover:gap-5 transition-all">
              {t.sections.bookService} <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Shield size={22} />, title: t.services.warranty, desc: t.services.warrantyDesc },
              { icon: <Wrench size={22} />, title: t.services.parts, desc: t.services.partsDesc },
              { icon: <Award size={22} />, title: t.services.techs, desc: t.services.techsDesc },
              { icon: <Shield size={22} />, title: t.services.inspection, desc: t.services.inspectionDesc },
            ].map((s) => (
              <div key={s.title} className="border border-[#1e1e1e] p-5 hover:border-[#2a2a2a] transition-colors">
                <div className="text-[#c9a84c] mb-3">{s.icon}</div>
                <div className="text-white text-sm font-medium mb-1">{s.title}</div>
                <div className="text-gray-600 text-[12px] leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES STRIP ─── */}
      <section className="max-w-7xl mx-auto px-5 py-28">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-6 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-[10px] tracking-[0.3em] uppercase">{t.sections.ourServices}</span>
            <div className="w-6 h-px bg-[#c9a84c]" />
          </div>
          <h2 className="font-display text-white text-5xl font-light">{t.sections.fullServices}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: t.cards.newCars, desc: t.cards.newCarsDesc, href: "/cars/new", label: t.cards.newCarsBtn },
            { title: t.cards.usedCars, desc: t.cards.usedCarsDesc, href: "/cars/used", label: t.cards.usedCarsBtn },
            { title: t.cards.finance, desc: t.cards.financeDesc, href: "/finance", label: t.cards.financeBtn },
          ].map((s) => (
            <Link key={s.title} href={s.href} className="group relative border border-[#1e1e1e] p-8 card-hover block overflow-hidden">
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#c9a84c] group-hover:w-full transition-all duration-500" />
              <h3 className="font-display text-white text-2xl font-light mb-3">{s.title}</h3>
              <p className="text-gray-600 text-[13px] leading-relaxed mb-6">{s.desc}</p>
              <span className="inline-flex items-center gap-2 text-[#c9a84c] text-[11px] tracking-[0.15em] uppercase group-hover:gap-3 transition-all">
                {s.label} <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative bg-[#c9a84c] py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(0,0,0,0.15)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-display text-black text-4xl md:text-5xl font-light leading-tight">
              {t.cta.heading}
            </h2>
            <p className="text-black/60 mt-2 text-[14px]">{t.cta.sub}</p>
          </div>
          <Link href="/contact" className="shrink-0 bg-black text-white px-10 py-4 text-[12px] font-semibold tracking-[0.2em] uppercase hover:bg-[#111] transition-colors">
            {t.cta.btn}
          </Link>
        </div>
      </section>
    </>
  );
}

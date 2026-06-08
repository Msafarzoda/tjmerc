"use client";
import Link from "next/link";
import Image from "next/image";
import { Zap, Gauge, Settings2 } from "lucide-react";
import { formatPrice } from "@/lib/cars";
import type { CarRecord } from "@/lib/db";
import { useLang } from "@/lib/LanguageContext";

export default function CarCard({ car }: { car: CarRecord }) {
  const { t } = useLang();

  return (
    <Link href={`/cars/${car.id}`} className="group block">
      <div className="bg-[#111] border border-[#1e1e1e] card-hover overflow-hidden relative">

        {/* Image area */}
        <div className="relative h-56 bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0c0c0c] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />

          {car.badge && (
            <span className="absolute top-4 left-4 z-10 bg-[#c9a84c] text-black text-[9px] font-bold px-2.5 py-1 tracking-[0.15em] uppercase">
              {car.badge}
            </span>
          )}
          {car.type === "used" && (
            <span className="absolute top-4 right-4 z-10 border border-[#333] text-gray-400 text-[9px] px-2.5 py-1 tracking-[0.12em] uppercase">
              {t.carCard.used}
            </span>
          )}

          {car.images?.[0] ? (
            <Image
              src={car.images[0]}
              alt={car.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
          ) : (
            <svg width="100" height="100" viewBox="0 0 38 38" fill="none" className="opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-500">
              <circle cx="19" cy="19" r="18" stroke="white" strokeWidth="0.8" />
              <circle cx="19" cy="19" r="14" stroke="white" strokeWidth="0.3" />
              <path d="M19 1 L20.9 17.3 L35.6 27.5 L19 21.5 L2.4 27.5 L17.1 17.3 Z" fill="white" />
            </svg>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#111] to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase font-medium">{car.class}</span>
          </div>

          <h3 className="font-display text-white text-2xl font-light leading-tight mb-1">{car.name}</h3>
          <p className="text-gray-600 text-[11px] tracking-wide mb-5">
            {car.year}{car.mileage ? ` · ${car.mileage.toLocaleString()} км` : ""} · {car.color}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-px bg-[#1e1e1e] mb-5">
            {[
              { icon: <Zap size={11} />, val: car.power },
              { icon: <Gauge size={11} />, val: car.engine.split(" ")[0] },
              { icon: <Settings2 size={11} />, val: car.transmission.split("-")[0] },
            ].map((s, i) => (
              <div key={i} className="bg-[#111] flex flex-col items-center gap-1 py-3">
                <span className="text-[#c9a84c]">{s.icon}</span>
                <span className="text-gray-400 text-[10px] tracking-wide">{s.val}</span>
              </div>
            ))}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <div className="text-gray-600 text-[10px] tracking-widest uppercase mb-0.5">{t.carCard.from}</div>
              <div className="font-display text-white text-2xl font-light">{formatPrice(car.price)}</div>
            </div>
            <span className="text-[11px] text-[#c9a84c] tracking-[0.15em] uppercase group-hover:underline underline-offset-4 transition-all">
              {t.carCard.details} →
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </Link>
  );
}

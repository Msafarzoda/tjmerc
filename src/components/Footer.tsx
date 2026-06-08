"use client";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import MBLogo from "./MBLogo";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="bg-[#080808] border-t border-[#181818]">
      <div className="max-w-7xl mx-auto px-5 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <MBLogo size={36} />
              <div>
                <div className="text-white text-[11px] tracking-[0.25em] uppercase font-light">Mercedes-Benz</div>
                <div className="text-[#c9a84c] text-[9px] tracking-[0.2em] uppercase mt-0.5">{t.footer.official}</div>
              </div>
            </div>
            <p className="text-gray-600 text-[13px] leading-relaxed mb-6">{t.footer.about}</p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-[#c9a84c] text-[11px] tracking-wider transition-colors uppercase">Instagram</a>
              <a href="#" className="text-gray-600 hover:text-[#c9a84c] text-[11px] tracking-wider transition-colors uppercase">Facebook</a>
            </div>
          </div>

          {/* Vehicles */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-px bg-[#c9a84c]" />
              <span className="text-white text-[10px] font-semibold tracking-[0.2em] uppercase">{t.footer.vehicles}</span>
            </div>
            <ul className="space-y-2.5">
              {["A-Класс", "C-Класс", "E-Класс", "S-Класс", "GLC SUV", "GLE SUV", "GLS SUV", "EQ"].map((m) => (
                <li key={m}>
                  <Link href="/cars/new" className="text-gray-600 hover:text-white text-[13px] transition-colors">{m}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-px bg-[#c9a84c]" />
              <span className="text-white text-[10px] font-semibold tracking-[0.2em] uppercase">{t.footer.services}</span>
            </div>
            <ul className="space-y-2.5">
              {[
                [t.footer.serviceTO, "/service"],
                [t.nav.parts, "/parts"],
                [t.footer.usedCars, "/cars/used"],
                [t.nav.finance, "/finance"],
                [t.footer.testDrive, "/contact#testdrive"],
                [t.nav.about, "/about"],
                [t.nav.contact, "/contact#form"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-gray-600 hover:text-white text-[13px] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-4 h-px bg-[#c9a84c]" />
              <span className="text-white text-[10px] font-semibold tracking-[0.2em] uppercase">{t.footer.contacts}</span>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-600 text-[13px]">
                <MapPin size={15} className="text-[#c9a84c] shrink-0 mt-0.5" />
                <span>г. Душанбе, ул. Айни 14, Республика Таджикистан</span>
              </li>
              <li>
                <a href="tel:+992000000000" className="flex gap-3 text-gray-600 hover:text-white text-[13px] transition-colors">
                  <Phone size={15} className="text-[#c9a84c] shrink-0" />
                  +992 00 000-00-00
                </a>
              </li>
              <li>
                <a href="mailto:info@mercedes-tj.com" className="flex gap-3 text-gray-600 hover:text-white text-[13px] transition-colors">
                  <Mail size={15} className="text-[#c9a84c] shrink-0" />
                  info@mercedes-tj.com
                </a>
              </li>
            </ul>
            <div className="mt-6 border-t border-[#181818] pt-5 text-gray-700 text-[12px] space-y-1">
              {t.footer.hours.map((h) => <div key={h}>{h}</div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#131313]">
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col sm:flex-row justify-between gap-3 text-gray-700 text-[11px] tracking-wide">
          <div>{t.footer.rights}</div>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

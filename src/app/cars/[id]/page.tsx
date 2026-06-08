import { readCars, getCar } from "@/lib/db";
import { formatPrice } from "@/lib/cars";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Zap, Gauge, Settings, Palette, Calendar, Phone } from "lucide-react";
import CarGallery from "@/components/CarGallery";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return readCars().map((c) => ({ id: c.id }));
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-10">
        <Link href="/" className="hover:text-white transition-colors">Главная</Link>
        <span>/</span>
        <Link href="/cars/new" className="hover:text-white transition-colors">Автомобили</Link>
        <span>/</span>
        <span className="text-gray-400">{car.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <CarGallery images={car.images} name={car.name} badge={car.badge} />

        {/* Details */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-px bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase">{car.class}</span>
          </div>
          <h1 className="font-display text-4xl font-light text-white mb-2">Mercedes-Benz {car.name}</h1>
          <div className="text-gray-500 text-sm mb-8">
            {car.year}{car.mileage ? ` · ${car.mileage.toLocaleString()} км` : ""} · {car.color}
          </div>

          <div className="font-display text-4xl font-light text-white mb-8">{formatPrice(car.price)}</div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {[
              { icon: <Zap size={15} />, label: "Мощность", val: car.power },
              { icon: <Gauge size={15} />, label: "Двигатель", val: car.engine },
              { icon: <Settings size={15} />, label: "Коробка", val: car.transmission },
              { icon: <Palette size={15} />, label: "Цвет", val: car.color },
              { icon: <Calendar size={15} />, label: "Год", val: String(car.year) },
              ...(car.mileage ? [{ icon: <Gauge size={15} />, label: "Пробег", val: `${car.mileage.toLocaleString()} км` }] : []),
            ].map((s) => (
              <div key={s.label} className="border border-[#1e1e1e] p-4">
                <div className="flex items-center gap-2 text-[#c9a84c] mb-1">{s.icon}</div>
                <div className="text-gray-600 text-xs mb-1">{s.label}</div>
                <div className="text-white text-sm">{s.val}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="flex-1 bg-[#c9a84c] text-black py-4 text-sm font-semibold tracking-widest uppercase text-center hover:bg-white transition-colors"
            >
              Заказать / Тест-драйв
            </Link>
            <a
              href="tel:+992000000000"
              className="flex-1 border border-[#1e1e1e] text-white py-4 text-sm tracking-widest uppercase text-center hover:border-[#c9a84c] transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={14} /> Позвонить
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

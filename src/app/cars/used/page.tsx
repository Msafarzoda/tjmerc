export const dynamic = "force-dynamic";
import { readCars } from "@/lib/db";
import CarCard from "@/components/CarCard";

export const metadata = {
  title: "Автомобили с пробегом | Mercedes-Benz Таджикистан",
};

export default function UsedCarsPage() {
  const usedCars = readCars().filter((c) => c.type === "used");

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">С пробегом</div>
        <h1 className="text-5xl font-extralight text-white mb-4">Сертифицированные автомобили</h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          Каждый автомобиль с пробегом проходит 120-точечную проверку от сертифицированных специалистов Mercedes-Benz. Полная история обслуживания.
        </p>
      </div>

      {/* Certified badge */}
      <div className="border border-[#c0a060]/30 bg-[#c0a060]/5 p-6 mb-10 flex flex-wrap gap-6 items-center">
        {["120-точечная проверка", "Гарантия 1 год", "История обслуживания", "Оригинальные запчасти"].map((b) => (
          <div key={b} className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-[#c0a060]">✓</span> {b}
          </div>
        ))}
      </div>

      {usedCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {usedCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 text-gray-600">
          <div className="text-4xl mb-4">◎</div>
          <div className="text-lg font-light">Автомобили с пробегом скоро появятся</div>
          <div className="text-sm mt-2">Свяжитесь с нами для получения актуальной информации</div>
        </div>
      )}
    </div>
  );
}

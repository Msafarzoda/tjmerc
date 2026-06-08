export const dynamic = "force-dynamic";
import { readCars } from "@/lib/db";
import CarCard from "@/components/CarCard";

export const metadata = {
  title: "Новые автомобили | Mercedes-Benz Таджикистан",
};

export default function NewCarsPage() {
  const newCars = readCars().filter((c) => c.type === "new");

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">Модельный ряд</div>
        <h1 className="text-5xl font-extralight text-white mb-4">Новые автомобили</h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          Весь модельный ряд Mercedes-Benz доступен для заказа в Таджикистане. Официальная гарантия, полное техническое обслуживание.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {["Все", "Седаны", "SUV", "Купе", "EQ Электро", "AMG"].map((f) => (
          <button key={f} className={`px-4 py-2 text-xs tracking-widest uppercase border transition-colors ${f === "Все" ? "border-[#c0a060] text-[#c0a060]" : "border-[#2a2a2a] text-gray-500 hover:border-gray-500"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = { title: "Автомобили | Mercedes-Benz Таджикистан" };

const classes = [
  { name: "A-Класс", desc: "Компактный премиум-хэтчбек", from: "от $35 000" },
  { name: "C-Класс", desc: "Элегантный бизнес-седан", from: "от $55 000" },
  { name: "E-Класс", desc: "Представительский класс", from: "от $85 000" },
  { name: "S-Класс", desc: "Флагманский седан", from: "от $150 000" },
  { name: "GLC", desc: "Компактный премиум SUV", from: "от $70 000" },
  { name: "GLE", desc: "Средний люкс SUV", from: "от $105 000" },
  { name: "GLS", desc: "Полноразмерный SUV", from: "от $145 000" },
  { name: "EQ Электро", desc: "Будущее уже здесь", from: "от $90 000" },
  { name: "AMG", desc: "Производительность без компромиссов", from: "от $120 000" },
];

export default function CarsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">Весь ассортимент</div>
        <h1 className="text-5xl font-extralight text-white mb-4">Все модели</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {classes.map((cls) => (
          <Link key={cls.name} href="/cars/new" className="group border border-[#2a2a2a] p-8 card-hover hover:border-[#c0a060] transition-colors block">
            <div className="text-[#c0a060] text-xs tracking-widest uppercase mb-2">Mercedes-Benz</div>
            <h2 className="text-2xl font-extralight text-white mb-2">{cls.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{cls.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-white text-sm">{cls.from}</span>
              <ChevronRight size={16} className="text-[#c0a060] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/cars/new" className="bg-[#c0a060] text-black px-8 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors">
          Новые автомобили
        </Link>
        <Link href="/cars/used" className="border border-[#2a2a2a] text-white px-8 py-4 text-sm tracking-widest uppercase hover:border-[#c0a060] transition-colors">
          С пробегом
        </Link>
      </div>
    </div>
  );
}

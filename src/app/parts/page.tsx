import Link from "next/link";
import { Package, Truck, Shield, Search } from "lucide-react";

export const metadata = { title: "Запчасти и аксессуары | Mercedes-Benz Таджикистан" };

const categories = [
  { name: "Двигатель и трансмиссия", items: ["Фильтры", "Масла", "Ремни и цепи", "Прокладки"] },
  { name: "Тормозная система", items: ["Тормозные диски", "Колодки", "Суппорты", "Тормозная жидкость"] },
  { name: "Подвеска и рулевое", items: ["Амортизаторы", "Пружины", "Рулевые наконечники", "Шаровые опоры"] },
  { name: "Электрика", items: ["Аккумуляторы", "Генераторы", "Стартеры", "Датчики"] },
  { name: "Кузов и оптика", items: ["Бамперы", "Фары", "Зеркала", "Стёкла"] },
  { name: "Аксессуары", items: ["Коврики", "Чехлы", "Мультимедиа", "Зарядные устройства"] },
];

export default function PartsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">Магазин</div>
        <h1 className="text-5xl font-extralight text-white mb-4">Запчасти и аксессуары</h1>
        <p className="text-gray-400 max-w-2xl">
          Оригинальные запчасти Mercedes-Benz с гарантией качества. Подбор по VIN-номеру вашего автомобиля.
        </p>
      </div>

      {/* Search */}
      <div className="bg-[#141414] border border-[#2a2a2a] p-6 mb-10">
        <div className="text-white text-sm font-medium mb-4">Поиск по VIN или названию</div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Введите VIN-номер или название запчасти..."
            className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c0a060] outline-none transition-colors"
          />
          <button className="bg-[#c0a060] text-black px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-white transition-colors flex items-center gap-2">
            <Search size={16} /> Найти
          </button>
        </div>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {[
          { icon: <Shield size={20} />, title: "Оригинальные запчасти", desc: "Прямые поставки от Mercedes-Benz" },
          { icon: <Truck size={20} />, title: "Доставка по Таджикистану", desc: "Быстрая доставка в любой город" },
          { icon: <Package size={20} />, title: "Гарантия 12 месяцев", desc: "На все оригинальные запчасти" },
        ].map((b) => (
          <div key={b.title} className="border border-[#2a2a2a] p-5 flex gap-4">
            <div className="text-[#c0a060]">{b.icon}</div>
            <div>
              <div className="text-white text-sm font-medium mb-1">{b.title}</div>
              <div className="text-gray-500 text-xs">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <h2 className="text-2xl font-extralight text-white mb-6">Категории</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {categories.map((cat) => (
          <div key={cat.name} className="border border-[#2a2a2a] p-6 card-hover cursor-pointer hover:border-[#c0a060] transition-colors">
            <h3 className="text-white text-lg font-light mb-4">{cat.name}</h3>
            <ul className="space-y-1">
              {cat.items.map((item) => (
                <li key={item} className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="text-[#c0a060] text-xs">›</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#141414] border border-[#2a2a2a] p-8 text-center">
        <h2 className="text-2xl font-extralight text-white mb-3">Не нашли нужную запчасть?</h2>
        <p className="text-gray-400 text-sm mb-6">Оставьте заявку — мы закажем любую оригинальную запчасть Mercedes-Benz</p>
        <Link
          href="/contact"
          className="bg-[#c0a060] text-black px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors inline-block"
        >
          Оставить заявку
        </Link>
      </div>
    </div>
  );
}

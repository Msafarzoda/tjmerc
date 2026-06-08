import Link from "next/link";
import { Wrench, Clock, Shield, CheckCircle } from "lucide-react";

export const metadata = { title: "Сервис и ТО | Mercedes-Benz Таджикистан" };

const services = [
  { title: "Плановое ТО", desc: "Регламентное техническое обслуживание по стандартам Mercedes-Benz. Замена масла, фильтров, проверка систем.", price: "от $120" },
  { title: "Диагностика", desc: "Полная компьютерная диагностика всех систем автомобиля с использованием оборудования Star Diagnosis.", price: "от $50" },
  { title: "Кузовной ремонт", desc: "Восстановление кузова, покраска в оригинальные цвета Mercedes-Benz с применением сертифицированных материалов.", price: "по запросу" },
  { title: "Замена шин", desc: "Сезонная замена и хранение шин, балансировка колёс, проверка давления TPMS.", price: "от $30" },
  { title: "Гарантийный ремонт", desc: "Все гарантийные работы выполняются бесплатно в рамках гарантии производителя.", price: "Бесплатно" },
  { title: "Детейлинг", desc: "Профессиональная химчистка салона, полировка кузова, нанесение защитных покрытий.", price: "от $80" },
];

export default function ServicePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">Сервисный центр</div>
        <h1 className="text-5xl font-extralight text-white mb-4">Авторизованный сервис</h1>
        <p className="text-gray-400 max-w-2xl leading-relaxed">
          Наш сервисный центр оснащён оборудованием последнего поколения. Все работы выполняют сертифицированные специалисты Mercedes-Benz.
        </p>
      </div>

      {/* Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: <Shield size={24} />, title: "Авторизованный дилер", desc: "Официальный статус и допуск к гарантийным работам" },
          { icon: <Clock size={24} />, title: "Запись онлайн", desc: "Удобная запись без ожидания на линии" },
          { icon: <Wrench size={24} />, title: "Оригинальные запчасти", desc: "Только сертифицированные детали Mercedes-Benz" },
        ].map((b) => (
          <div key={b.title} className="border border-[#2a2a2a] p-6 flex gap-4">
            <div className="text-[#c0a060] shrink-0">{b.icon}</div>
            <div>
              <div className="text-white font-medium mb-1">{b.title}</div>
              <div className="text-gray-500 text-sm">{b.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Services grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-extralight text-white mb-8">Виды работ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="border border-[#2a2a2a] p-6 card-hover">
              <h3 className="text-white text-lg font-light mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="text-[#c0a060] text-sm font-medium">{s.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-[#141414] border border-[#2a2a2a] p-8 mb-16">
        <h2 className="text-2xl font-extralight text-white mb-6">Что входит в плановое ТО</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "Замена моторного масла и фильтра",
            "Проверка и доливка технических жидкостей",
            "Проверка тормозной системы",
            "Диагностика подвески и рулевого управления",
            "Проверка давления в шинах",
            "Сканирование ошибок бортового компьютера",
            "Проверка аккумулятора и электрики",
            "Проверка фар, ламп, стеклоочистителей",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 text-gray-400 text-sm">
              <CheckCircle size={14} className="text-[#c0a060] shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-extralight text-white mb-4">Записаться на сервис</h2>
        <p className="text-gray-500 mb-8">Выберите удобное время онлайн или позвоните нам</p>
        <Link
          href="/contact"
          className="bg-[#c0a060] text-black px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors inline-block"
        >
          Записаться онлайн
        </Link>
      </div>
    </div>
  );
}

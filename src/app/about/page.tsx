import Link from "next/link";
import { Award, Users, MapPin, TrendingUp } from "lucide-react";

export const metadata = { title: "О нас | Mercedes-Benz Таджикистан" };

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#0f0f0f] border-b border-[#2a2a2a] py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">О компании</div>
          <h1 className="text-5xl font-extralight text-white mb-6 max-w-2xl">
            Официальный дилер Mercedes-Benz в Таджикистане
          </h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed text-lg font-light">
            Более 15 лет мы представляем бренд Mercedes-Benz в Республике Таджикистан. Мы — ваш надёжный партнёр в мире роскошных автомобилей.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <TrendingUp size={24} />, num: "15+", label: "Лет на рынке" },
            { icon: <Users size={24} />, num: "5000+", label: "Довольных клиентов" },
            { icon: <Award size={24} />, num: "20+", label: "Наград дилера" },
            { icon: <MapPin size={24} />, num: "1", label: "Showroom в Душанбе" },
          ].map((s) => (
            <div key={s.label} className="border border-[#2a2a2a] p-6 text-center">
              <div className="text-[#c0a060] flex justify-center mb-3">{s.icon}</div>
              <div className="text-3xl font-extralight text-white mb-1">{s.num}</div>
              <div className="text-gray-500 text-xs tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-3">Наша история</div>
            <h2 className="text-3xl font-extralight text-white mb-6">Преданность качеству с первого дня</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Наш дилерский центр был основан с одной целью — дать жителям Таджикистана доступ к лучшим автомобилям в мире с полным спектром сервисных услуг.
              </p>
              <p>
                За годы работы мы создали команду профессионалов, прошедших обучение в учебных центрах Mercedes-Benz по всему миру. Каждый сотрудник разделяет нашу страсть к совершенству.
              </p>
              <p>
                Мы гордимся тем, что являемся частью глобальной сети Mercedes-Benz и обеспечиваем клиентам тот же уровень обслуживания, что и в лучших дилерских центрах Европы.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { year: "2009", event: "Основание компании" },
              { year: "2012", event: "Получение официального статуса дилера" },
              { year: "2016", event: "Открытие сервисного центра" },
              { year: "2020", event: "Запуск онлайн-сервисов" },
              { year: "2022", event: "Начало продаж EQ электромобилей" },
              { year: "2024", event: "Расширение модельного ряда AMG" },
            ].map((e) => (
              <div key={e.year} className="border border-[#2a2a2a] p-5">
                <div className="text-[#c0a060] text-xl font-light mb-1">{e.year}</div>
                <div className="text-gray-400 text-sm">{e.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-[#141414] border-y border-[#2a2a2a] py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">Наши люди</div>
            <h2 className="text-3xl font-extralight text-white">Команда профессионалов</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Алишер Рахимов", role: "Генеральный директор", exp: "18 лет в автобизнесе" },
              { name: "Дилноза Каримова", role: "Руководитель отдела продаж", exp: "Сертифицирована MB Akademie" },
              { name: "Фируз Назаров", role: "Главный технический специалист", exp: "Сертификат Mercedes-Benz Master Tech" },
            ].map((p) => (
              <div key={p.name} className="text-center">
                <div className="w-24 h-24 bg-[#2a2a2a] rounded-full mx-auto mb-4 flex items-center justify-center text-[#c0a060] text-2xl font-light">
                  {p.name[0]}
                </div>
                <div className="text-white font-medium mb-1">{p.name}</div>
                <div className="text-[#c0a060] text-xs tracking-wider uppercase mb-2">{p.role}</div>
                <div className="text-gray-500 text-sm">{p.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-extralight text-white mb-4">Готовы познакомиться?</h2>
        <p className="text-gray-400 mb-8">Посетите наш шоурум или запишитесь на консультацию онлайн</p>
        <Link
          href="/contact"
          className="bg-[#c0a060] text-black px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors inline-block"
        >
          Связаться с нами
        </Link>
      </section>
    </div>
  );
}

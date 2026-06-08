"use client";
import { useState } from "react";

export default function FinancePage() {
  const [price, setPrice] = useState(65000);
  const [down, setDown] = useState(20000);
  const [months, setMonths] = useState(36);
  const rate = 0.12;

  const principal = price - down;
  const monthlyRate = rate / 12;
  const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">Финансирование</div>
        <h1 className="text-5xl font-extralight text-white mb-4">Кредит и лизинг</h1>
        <p className="text-gray-400 max-w-2xl">
          Гибкие условия финансирования для любого бюджета. Партнёрство с ведущими банками Таджикистана.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Calculator */}
        <div>
          <h2 className="text-2xl font-extralight text-white mb-8">Калькулятор платежей</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-500 text-xs tracking-wider uppercase">Стоимость авто</label>
                <span className="text-[#c0a060] text-sm">${price.toLocaleString()}</span>
              </div>
              <input type="range" min={20000} max={250000} step={1000} value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-[#c0a060]" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-500 text-xs tracking-wider uppercase">Первоначальный взнос</label>
                <span className="text-[#c0a060] text-sm">${down.toLocaleString()} ({Math.round(down/price*100)}%)</span>
              </div>
              <input type="range" min={0} max={price * 0.8} step={1000} value={down}
                onChange={(e) => setDown(Number(e.target.value))}
                className="w-full accent-[#c0a060]" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-gray-500 text-xs tracking-wider uppercase">Срок</label>
                <span className="text-[#c0a060] text-sm">{months} месяцев</span>
              </div>
              <input type="range" min={12} max={84} step={12} value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full accent-[#c0a060]" />
            </div>

            {/* Result */}
            <div className="bg-[#141414] border border-[#c0a060]/30 p-6">
              <div className="text-gray-400 text-sm mb-2">Ежемесячный платёж (от)</div>
              <div className="text-[#c0a060] text-4xl font-extralight mb-4">
                ${isFinite(payment) ? Math.round(payment).toLocaleString() : "—"}/мес
              </div>
              <div className="grid grid-cols-3 gap-4 text-center border-t border-[#2a2a2a] pt-4">
                <div>
                  <div className="text-gray-500 text-xs mb-1">Сумма кредита</div>
                  <div className="text-white text-sm">${(price - down).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Ставка</div>
                  <div className="text-white text-sm">от 12%</div>
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-1">Срок</div>
                  <div className="text-white text-sm">{months} мес.</div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-xs">* Расчёт является предварительным. Точные условия — у менеджера.</p>

            <a href="/contact" className="block w-full bg-[#c0a060] text-black py-4 text-sm font-semibold tracking-widest uppercase text-center hover:bg-white transition-colors">
              Подать заявку на кредит
            </a>
          </div>
        </div>

        {/* Info */}
        <div>
          <h2 className="text-2xl font-extralight text-white mb-8">Условия финансирования</h2>
          <div className="space-y-6">
            {[
              { title: "Автокредит", items: ["Ставка от 12% годовых", "Срок до 84 месяцев", "Первый взнос от 20%", "Решение за 1 день"] },
              { title: "Лизинг для бизнеса", items: ["Ставка от 10% годовых", "Срок до 60 месяцев", "НДС к возврату", "Баланс на балансе лизингодателя"] },
              { title: "Trade-in", items: ["Оценка вашего авто за 30 минут", "Рыночная цена без торга", "Зачёт в счёт нового авто", "Быстрое оформление"] },
            ].map((s) => (
              <div key={s.title} className="border border-[#2a2a2a] p-6">
                <h3 className="text-white text-lg font-light mb-4">{s.title}</h3>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-gray-400 text-sm">
                      <span className="text-[#c0a060]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

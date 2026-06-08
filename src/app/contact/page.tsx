"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", model: "", service: "test-drive", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-16">
        <div className="text-[#c0a060] text-xs tracking-[0.3em] uppercase mb-2">Свяжитесь с нами</div>
        <h1 className="text-5xl font-extralight text-white">Контакты</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form */}
        <div>
          <h2 className="text-2xl font-extralight text-white mb-8">Оставить заявку</h2>

          {sent ? (
            <div className="border border-[#c0a060] p-8 text-center">
              <div className="text-[#c0a060] text-4xl mb-4">✓</div>
              <div className="text-white text-xl font-light mb-2">Заявка отправлена!</div>
              <div className="text-gray-400 text-sm">Мы свяжемся с вами в течение 30 минут в рабочее время.</div>
              <button onClick={() => setSent(false)} className="mt-6 text-[#c0a060] text-sm hover:underline">
                Отправить ещё одну заявку
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Имя *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#141414] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c0a060] outline-none transition-colors"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Телефон *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#141414] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c0a060] outline-none transition-colors"
                    placeholder="+992 __  ___-__-__"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#141414] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c0a060] outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Интересующая модель</label>
                <select
                  value={form.model}
                  onChange={(e) => setForm({ ...form, model: e.target.value })}
                  className="w-full bg-[#141414] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c0a060] outline-none transition-colors"
                >
                  <option value="">Выбрать модель</option>
                  {["A-Класс", "C-Класс", "E-Класс", "S-Класс", "GLC", "GLE", "GLS", "EQS", "AMG GT"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Тип обращения</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "test-drive", label: "Тест-драйв" },
                    { val: "buy", label: "Купить авто" },
                    { val: "service", label: "Сервис/ТО" },
                    { val: "other", label: "Другое" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => setForm({ ...form, service: opt.val })}
                      className={`py-2 text-xs tracking-widest uppercase border transition-colors ${
                        form.service === opt.val
                          ? "border-[#c0a060] text-[#c0a060]"
                          : "border-[#2a2a2a] text-gray-500 hover:border-gray-500"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Сообщение</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[#141414] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c0a060] outline-none transition-colors resize-none"
                  placeholder="Ваш вопрос или пожелание..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#c0a060] text-black py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors"
              >
                Отправить заявку
              </button>
            </form>
          )}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-2xl font-extralight text-white mb-8">Наши контакты</h2>

          <div className="space-y-6 mb-10">
            <div className="flex gap-4">
              <MapPin size={20} className="text-[#c0a060] shrink-0 mt-0.5" />
              <div>
                <div className="text-white mb-1">Адрес</div>
                <div className="text-gray-400 text-sm">г. Душанбе, ул. Айни 14<br />Республика Таджикистан, 734000</div>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone size={20} className="text-[#c0a060] shrink-0" />
              <div>
                <div className="text-white mb-1">Телефон</div>
                <a href="tel:+992000000000" className="text-gray-400 text-sm hover:text-white transition-colors">+992 00 000-00-00</a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail size={20} className="text-[#c0a060] shrink-0" />
              <div>
                <div className="text-white mb-1">Email</div>
                <a href="mailto:info@mercedes-tj.com" className="text-gray-400 text-sm hover:text-white transition-colors">info@mercedes-tj.com</a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock size={20} className="text-[#c0a060] shrink-0" />
              <div>
                <div className="text-white mb-1">Режим работы</div>
                <div className="text-gray-400 text-sm">
                  <div>Пн – Пт: 09:00 – 18:00</div>
                  <div>Суббота: 10:00 – 16:00</div>
                  <div>Воскресенье: выходной</div>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="bg-[#141414] border border-[#2a2a2a] h-64 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <MapPin size={32} className="mx-auto mb-2" />
              <div className="text-sm">Карта · г. Душанбе, ул. Айни 14</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

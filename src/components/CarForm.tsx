"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { CarRecord } from "@/lib/db";
import { Upload, X, ImageIcon, GripVertical } from "lucide-react";
import Image from "next/image";

type Props = {
  initial?: Partial<CarRecord>;
  mode: "create" | "edit";
};

const CLASSES = ["A-Класс", "C-Класс", "E-Класс", "S-Класс", "GLC", "GLE", "GLS", "EQ", "AMG GT", "CLE", "CLA", "G-Класс"];
const TRANSMISSIONS = ["9G-TRONIC", "7G-DCT", "8G-DCT", "4MATIC+", "Одноступенчатый", "Механика"];

export default function CarForm({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: initial.name || "",
    class: initial.class || CLASSES[0],
    type: initial.type || "new",
    price: initial.price?.toString() || "",
    year: initial.year?.toString() || new Date().getFullYear().toString(),
    mileage: initial.mileage?.toString() || "",
    engine: initial.engine || "",
    power: initial.power || "",
    transmission: initial.transmission || TRANSMISSIONS[0],
    color: initial.color || "",
    badge: initial.badge || "",
    featured: initial.featured || false,
    images: initial.images || [],
  });

  function set(field: string, value: string | boolean | string[]) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    setError("");

    const urls: string[] = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) {
        urls.push(data.url);
      } else {
        setError(data.error || "Ошибка загрузки");
        break;
      }
    }

    set("images", [...form.images, ...urls]);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeImage(idx: number) {
    set("images", form.images.filter((_, i) => i !== idx));
  }

  function moveImage(from: number, to: number) {
    const imgs = [...form.images];
    const [item] = imgs.splice(from, 1);
    imgs.splice(to, 0, item);
    set("images", imgs);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = mode === "edit" ? `/api/cars/${initial.id}` : "/api/cars";
    const method = mode === "edit" ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Ошибка сохранения");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="text-red-400 text-sm border border-red-900 bg-red-950/30 px-4 py-3">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Photo gallery upload ── */}
        <div className="md:col-span-2">
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">
            Фотографии автомобиля
            <span className="text-gray-700 ml-2 normal-case tracking-normal">({form.images.length} фото · первое — обложка)</span>
          </label>

          {/* Existing photos grid */}
          {form.images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
              {form.images.map((url, idx) => (
                <div key={url + idx} className="relative group aspect-video bg-[#0a0a0a] border border-[#2a2a2a] overflow-hidden">
                  <Image src={url} alt={`Photo ${idx + 1}`} fill className="object-cover" unoptimized />

                  {/* Cover badge */}
                  {idx === 0 && (
                    <span className="absolute bottom-1 left-1 bg-[#c9a84c] text-black text-[8px] font-bold px-1.5 py-0.5 tracking-wider uppercase">
                      Обложка
                    </span>
                  )}

                  {/* Controls overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {/* Move left */}
                    {idx > 0 && (
                      <button type="button" onClick={() => moveImage(idx, idx - 1)}
                        className="bg-white/20 hover:bg-white/40 text-white p-1.5 transition-colors text-xs">
                        ←
                      </button>
                    )}
                    {/* Delete */}
                    <button type="button" onClick={() => removeImage(idx)}
                      className="bg-red-900/80 hover:bg-red-700 text-white p-1.5 transition-colors">
                      <X size={12} />
                    </button>
                    {/* Move right */}
                    {idx < form.images.length - 1 && (
                      <button type="button" onClick={() => moveImage(idx, idx + 1)}
                        className="bg-white/20 hover:bg-white/40 text-white p-1.5 transition-colors text-xs">
                        →
                      </button>
                    )}
                  </div>

                  {/* Photo number */}
                  <span className="absolute top-1 right-1 bg-black/50 text-gray-300 text-[9px] px-1.5 py-0.5">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Upload dropzone */}
          <div
            className={`border-2 border-dashed transition-colors p-6 text-center cursor-pointer ${uploading ? "border-[#c9a84c]/50" : "border-[#2a2a2a] hover:border-[#c9a84c]"}`}
            onClick={() => fileRef.current?.click()}
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />
            {uploading ? (
              <div className="text-[#c9a84c] text-sm">Загрузка...</div>
            ) : (
              <>
                <Upload size={22} className="text-gray-600 mx-auto mb-2" />
                <div className="text-gray-400 text-sm mb-1">
                  {form.images.length === 0 ? "Добавьте фотографии" : "Добавить ещё фото"}
                </div>
                <div className="text-gray-600 text-xs">JPEG, PNG, WebP · до 8 МБ · можно выбрать несколько сразу</div>
              </>
            )}
          </div>
        </div>

        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Название модели *</label>
          <input required value={form.name} onChange={(e) => set("name", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors"
            placeholder="напр. GLE 450 4MATIC" />
        </div>

        {/* Class */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Класс *</label>
          <select required value={form.class} onChange={(e) => set("class", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors">
            {CLASSES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Тип</label>
          <div className="flex gap-3">
            {[["new", "Новый"], ["used", "С пробегом"]].map(([val, label]) => (
              <button key={val} type="button" onClick={() => set("type", val)}
                className={`flex-1 py-3 text-sm border transition-colors ${form.type === val ? "border-[#c9a84c] text-[#c9a84c]" : "border-[#2a2a2a] text-gray-500 hover:border-gray-500"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Цена (USD) *</label>
          <input required type="number" value={form.price} onChange={(e) => set("price", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors"
            placeholder="85000" />
        </div>

        {/* Year */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Год *</label>
          <input required type="number" value={form.year} onChange={(e) => set("year", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors"
            min="2000" max="2030" />
        </div>

        {/* Mileage */}
        {form.type === "used" && (
          <div>
            <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Пробег (км)</label>
            <input type="number" value={form.mileage} onChange={(e) => set("mileage", e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors"
              placeholder="42000" />
          </div>
        )}

        {/* Engine */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Двигатель *</label>
          <input required value={form.engine} onChange={(e) => set("engine", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors"
            placeholder="3.0L Turbo I6" />
        </div>

        {/* Power */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Мощность *</label>
          <input required value={form.power} onChange={(e) => set("power", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors"
            placeholder="375 л.с." />
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Коробка передач</label>
          <select value={form.transmission} onChange={(e) => set("transmission", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors">
            {TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        {/* Color */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Цвет *</label>
          <input required value={form.color} onChange={(e) => set("color", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors"
            placeholder="Полярный белый" />
        </div>

        {/* Badge */}
        <div>
          <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Значок (необязательно)</label>
          <input value={form.badge} onChange={(e) => set("badge", e.target.value)}
            className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c9a84c] outline-none transition-colors"
            placeholder="напр. Хит продаж, Новинка" />
        </div>

        {/* Featured */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={() => set("featured", !form.featured)}
              className={`w-12 h-6 relative transition-colors ${form.featured ? "bg-[#c9a84c]" : "bg-[#2a2a2a]"}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white transition-all ${form.featured ? "left-7" : "left-1"}`} />
            </div>
            <span className="text-white text-sm">Показать на главной странице</span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4 border-t border-[#2a2a2a]">
        <button type="submit" disabled={saving || uploading}
          className="bg-[#c9a84c] text-black px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50">
          {saving ? "Сохранение..." : mode === "edit" ? "Сохранить изменения" : "Добавить автомобиль"}
        </button>
        <button type="button" onClick={() => router.push("/admin/dashboard")}
          className="border border-[#2a2a2a] text-gray-400 px-8 py-3 text-sm tracking-widest uppercase hover:border-gray-500 transition-colors">
          Отмена
        </button>
      </div>
    </form>
  );
}

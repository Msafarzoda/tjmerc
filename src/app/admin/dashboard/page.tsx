import { isAuthenticated } from "@/lib/auth";
import { readCars } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminLogout from "@/components/AdminLogout";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!(await isAuthenticated())) redirect("/admin");

  const cars = readCars();
  const newCount = cars.filter((c) => c.type === "new").length;
  const usedCount = cars.filter((c) => c.type === "used").length;
  const featured = cars.filter((c) => c.featured).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top bar */}
      <header className="bg-[#0f0f0f] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke="#c0a060" strokeWidth="1.5" fill="none" />
            <line x1="18" y1="5" x2="18" y2="18" stroke="#c0a060" strokeWidth="1.5" />
            <line x1="18" y1="18" x2="28.5" y2="27" stroke="#c0a060" strokeWidth="1.5" />
            <line x1="18" y1="18" x2="7.5" y2="27" stroke="#c0a060" strokeWidth="1.5" />
          </svg>
          <div>
            <div className="text-white text-sm font-light tracking-wider">Панель управления</div>
            <div className="text-gray-600 text-xs">Mercedes-Benz Таджикистан</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-gray-500 hover:text-white text-xs tracking-wider transition-colors">
            Открыть сайт ↗
          </Link>
          <AdminLogout />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Всего автомобилей", value: cars.length, color: "text-white" },
            { label: "Новые", value: newCount, color: "text-[#c0a060]" },
            { label: "С пробегом", value: usedCount, color: "text-blue-400" },
            { label: "На главной", value: featured, color: "text-green-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#141414] border border-[#2a2a2a] p-5">
              <div className={`text-3xl font-extralight mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-gray-500 text-xs tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-xl font-light">Автомобили</h2>
          <Link
            href="/admin/cars/new"
            className="bg-[#c0a060] text-black px-5 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-white transition-colors"
          >
            + Добавить автомобиль
          </Link>
        </div>

        {/* Cars table */}
        <div className="bg-[#141414] border border-[#2a2a2a] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2a2a2a]">
                {["Модель", "Класс", "Тип", "Год", "Цена", "Статус", ""].map((h) => (
                  <th key={h} className="text-left text-gray-500 text-xs tracking-wider uppercase px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-gray-600 py-12 text-sm">
                    Нет автомобилей. Добавьте первый!
                  </td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr key={car.id} className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors">
                    <td className="px-4 py-3">
                      <div className="text-white text-sm">{car.name}</div>
                      {car.badge && <div className="text-[#c0a060] text-xs">{car.badge}</div>}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{car.class}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 ${car.type === "new" ? "bg-green-900/30 text-green-400" : "bg-blue-900/30 text-blue-400"}`}>
                        {car.type === "new" ? "Новый" : "С пробегом"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{car.year}</td>
                    <td className="px-4 py-3 text-white text-sm">${car.price.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {car.featured && (
                        <span className="text-xs bg-[#c0a060]/20 text-[#c0a060] px-2 py-1">На главной</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <Link href={`/admin/cars/edit?id=${car.id}`} className="text-gray-400 hover:text-white text-xs transition-colors">
                          Изменить
                        </Link>
                        <DeleteButton id={car.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DeleteButton({ id }: { id: string }) {
  return (
    <form action={`/api/cars/${id}`} method="dialog">
      <Link href={`/admin/cars/edit?id=${id}&delete=1`} className="text-red-500 hover:text-red-400 text-xs transition-colors">
        Удалить
      </Link>
    </form>
  );
}

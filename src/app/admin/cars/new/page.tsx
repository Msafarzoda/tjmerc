import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import CarForm from "@/components/CarForm";

export default async function NewCarPage() {
  if (!(await isAuthenticated())) redirect("/admin");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#0f0f0f] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-white text-sm font-light">Добавить автомобиль</div>
          <div className="text-gray-600 text-xs">Mercedes-Benz Таджикистан · Панель управления</div>
        </div>
        <Link href="/admin/dashboard" className="text-gray-500 hover:text-white text-xs tracking-wider transition-colors">
          ← Назад
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <CarForm mode="create" />
      </div>
    </div>
  );
}

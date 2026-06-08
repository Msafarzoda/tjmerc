import { isAuthenticated } from "@/lib/auth";
import { getCar, deleteCar } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import CarForm from "@/components/CarForm";

export const dynamic = "force-dynamic";

export default async function EditCarPage({ searchParams }: { searchParams: Promise<{ id?: string; delete?: string }> }) {
  if (!(await isAuthenticated())) redirect("/admin");

  const { id, delete: del } = await searchParams;
  if (!id) redirect("/admin/dashboard");

  // Handle delete
  if (del === "1") {
    deleteCar(id);
    redirect("/admin/dashboard");
  }

  const car = getCar(id);
  if (!car) redirect("/admin/dashboard");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="bg-[#0f0f0f] border-b border-[#2a2a2a] px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-white text-sm font-light">Редактировать: {car.name}</div>
          <div className="text-gray-600 text-xs">Mercedes-Benz Таджикистан · Панель управления</div>
        </div>
        <Link href="/admin/dashboard" className="text-gray-500 hover:text-white text-xs tracking-wider transition-colors">
          ← Назад
        </Link>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        <CarForm mode="edit" initial={car} />
      </div>
    </div>
  );
}

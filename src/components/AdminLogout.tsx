"use client";
import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin");
  }

  return (
    <button
      onClick={logout}
      className="text-gray-500 hover:text-red-400 text-xs tracking-wider transition-colors"
    >
      Выйти
    </button>
  );
}

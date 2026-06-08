"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Ошибка входа");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <svg className="mx-auto mb-4" width="52" height="52" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke="#c0a060" strokeWidth="1.5" fill="none" />
            <line x1="18" y1="5" x2="18" y2="18" stroke="#c0a060" strokeWidth="1.5" />
            <line x1="18" y1="18" x2="28.5" y2="27" stroke="#c0a060" strokeWidth="1.5" />
            <line x1="18" y1="18" x2="7.5" y2="27" stroke="#c0a060" strokeWidth="1.5" />
          </svg>
          <div className="text-white text-sm font-light tracking-widest uppercase">Mercedes-Benz</div>
          <div className="text-[#c0a060] text-xs tracking-wider">Панель управления</div>
        </div>

        <form onSubmit={handleLogin} className="bg-[#141414] border border-[#2a2a2a] p-8">
          <h1 className="text-white text-xl font-light mb-6">Вход для сотрудников</h1>

          <div className="mb-4">
            <label className="block text-gray-500 text-xs tracking-wider uppercase mb-2">Пароль</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#2a2a2a] text-white px-4 py-3 text-sm focus:border-[#c0a060] outline-none transition-colors"
              placeholder="Введите пароль"
              autoFocus
            />
          </div>

          {error && (
            <div className="mb-4 text-red-400 text-sm border border-red-900 bg-red-950/30 px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c0a060] text-black py-3 text-sm font-semibold tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600 text-xs">
          Только для авторизованных сотрудников
        </div>
      </div>
    </div>
  );
}

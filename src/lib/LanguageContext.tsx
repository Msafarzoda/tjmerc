"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Locale, translations } from "./i18n";

// Use a loose type so all locale strings are compatible
type AnyTranslations = (typeof translations)[Locale];

type LangCtx = {
  locale: Locale;
  t: AnyTranslations;
  setLocale: (l: Locale) => void;
};

const Ctx = createContext<LangCtx>({
  locale: "ru",
  t: translations.ru,
  setLocale: () => {},
});

function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "ru";
  const lang = navigator.language?.slice(0, 2).toLowerCase();
  if (lang === "tg") return "tg";
  if (lang === "en") return "en";
  return "ru";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("mb_locale") as Locale | null;
    setLocaleState(saved ?? detectLocale());
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    localStorage.setItem("mb_locale", l);
  }

  return (
    <Ctx.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  return useContext(Ctx);
}

export type Car = {
  id: string;
  name: string;
  class: string;
  type: "new" | "used";
  price: number;
  year: number;
  mileage?: number;
  engine: string;
  power: string;
  transmission: string;
  color: string;
  image: string;
  badge?: string;
  featured?: boolean;
};

export const cars: Car[] = [
  {
    id: "s-class-2024",
    name: "S 500 4MATIC",
    class: "S-Класс",
    type: "new",
    price: 185000,
    year: 2024,
    engine: "3.0L Turbo I6",
    power: "435 л.с.",
    transmission: "9G-TRONIC",
    color: "Обсидиан чёрный",
    image: "/cars/s-class.jpg",
    badge: "Хит продаж",
    featured: true,
  },
  {
    id: "e-class-2024",
    name: "E 300 4MATIC",
    class: "E-Класс",
    type: "new",
    price: 95000,
    year: 2024,
    engine: "2.0L Turbo I4",
    power: "258 л.с.",
    transmission: "9G-TRONIC",
    color: "Полярный серебристый",
    image: "/cars/e-class.jpg",
    featured: true,
  },
  {
    id: "c-class-2024",
    name: "C 300 4MATIC",
    class: "C-Класс",
    type: "new",
    price: 65000,
    year: 2024,
    engine: "2.0L Turbo I4",
    power: "258 л.с.",
    transmission: "9G-TRONIC",
    color: "Графитовый серый",
    image: "/cars/c-class.jpg",
    featured: true,
  },
  {
    id: "gle-2024",
    name: "GLE 450 4MATIC",
    class: "GLE",
    type: "new",
    price: 120000,
    year: 2024,
    engine: "3.0L Turbo I6",
    power: "375 л.с.",
    transmission: "9G-TRONIC",
    color: "Горный серый",
    image: "/cars/gle.jpg",
    badge: "Популярный",
    featured: true,
  },
  {
    id: "glc-2024",
    name: "GLC 300 4MATIC",
    class: "GLC",
    type: "new",
    price: 78000,
    year: 2024,
    engine: "2.0L Turbo I4",
    power: "258 л.с.",
    transmission: "9G-TRONIC",
    color: "Бриллиантово белый",
    image: "/cars/glc.jpg",
  },
  {
    id: "gls-2024",
    name: "GLS 580 4MATIC",
    class: "GLS",
    type: "new",
    price: 165000,
    year: 2024,
    engine: "4.0L Biturbo V8",
    power: "489 л.с.",
    transmission: "9G-TRONIC",
    color: "Рубиново чёрный",
    image: "/cars/gls.jpg",
    badge: "Флагман",
  },
  {
    id: "eqs-2024",
    name: "EQS 450+",
    class: "EQ",
    type: "new",
    price: 140000,
    year: 2024,
    engine: "Электро",
    power: "333 л.с.",
    transmission: "Одноступенчатый",
    color: "Высокотехнологичный серебристый",
    image: "/cars/eqs.jpg",
    badge: "Электро",
  },
  {
    id: "a-class-used",
    name: "A 200",
    class: "A-Класс",
    type: "used",
    price: 28000,
    year: 2021,
    mileage: 42000,
    engine: "1.3L Turbo I4",
    power: "163 л.с.",
    transmission: "7G-DCT",
    color: "Полярный белый",
    image: "/cars/a-class.jpg",
  },
  {
    id: "c-class-used",
    name: "C 200 AMG Line",
    class: "C-Класс",
    type: "used",
    price: 42000,
    year: 2022,
    mileage: 28000,
    engine: "1.5L EQ Boost",
    power: "204 л.с.",
    transmission: "9G-TRONIC",
    color: "Графитовый серый",
    image: "/cars/c-class-used.jpg",
    badge: "Сертифицирован",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

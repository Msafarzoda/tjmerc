import fs from "fs";
import path from "path";

export type CarRecord = {
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
  badge: string;
  featured: boolean;
  images: string[]; // multiple photos; first one is the cover
};

const DATA_FILE = path.join(process.cwd(), "data", "cars.json");

function migrate(raw: Record<string, unknown>): CarRecord {
  // backwards-compat: if old record has `image` string, convert it
  if (!raw.images) {
    raw.images = raw.image ? [raw.image as string] : [];
  }
  delete raw.image;
  return raw as unknown as CarRecord;
}

export function readCars(): CarRecord[] {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Record<string, unknown>[];
    return parsed.map(migrate);
  } catch {
    return [];
  }
}

export function writeCars(cars: CarRecord[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(cars, null, 2));
}

export function getCar(id: string): CarRecord | undefined {
  return readCars().find((c) => c.id === id);
}

export function saveCar(car: CarRecord): void {
  const cars = readCars();
  const idx = cars.findIndex((c) => c.id === car.id);
  if (idx >= 0) {
    cars[idx] = car;
  } else {
    cars.push(car);
  }
  writeCars(cars);
}

export function deleteCar(id: string): void {
  const cars = readCars().filter((c) => c.id !== id);
  writeCars(cars);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    + "-" + Date.now().toString(36);
}

import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readCars, saveCar, slugify, CarRecord } from "@/lib/db";

export async function GET() {
  return NextResponse.json(readCars());
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const car: CarRecord = {
    id: slugify(body.name),
    name: body.name,
    class: body.class,
    type: body.type || "new",
    price: Number(body.price),
    year: Number(body.year),
    mileage: body.mileage ? Number(body.mileage) : undefined,
    engine: body.engine,
    power: body.power,
    transmission: body.transmission,
    color: body.color,
    badge: body.badge || "",
    featured: Boolean(body.featured),
    images: Array.isArray(body.images) ? body.images : [],
  };

  saveCar(car);
  return NextResponse.json(car, { status: 201 });
}

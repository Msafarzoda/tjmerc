import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getCar, saveCar, deleteCar } from "@/lib/db";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = getCar(id);
  if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(car);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const existing = getCar(id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const updated = {
    ...existing,
    name: body.name,
    class: body.class,
    type: body.type,
    price: Number(body.price),
    year: Number(body.year),
    mileage: body.mileage ? Number(body.mileage) : undefined,
    engine: body.engine,
    power: body.power,
    transmission: body.transmission,
    color: body.color,
    badge: body.badge || "",
    featured: Boolean(body.featured),
    images: Array.isArray(body.images) ? body.images : existing.images,
  };

  saveCar(updated);
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  deleteCar(id);
  return NextResponse.json({ ok: true });
}

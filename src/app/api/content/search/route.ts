import { NextResponse } from "next/server";
import { searchAll } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const region = searchParams.get("region") || undefined;
  const category = searchParams.get("category") || undefined;
  const type = (searchParams.get("type") as "article" | "country" | "embassy" | "organization") || undefined;

  const results = await searchAll(q, { region, category, type });
  return NextResponse.json(results);
}

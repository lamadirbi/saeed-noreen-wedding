import { NextResponse } from "next/server";
import { addWish, listWishes } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const hits = new Map<string, number[]>();

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, max);
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= 5) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

export async function GET() {
  return NextResponse.json({ wishes: await listWishes() });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "انتظر قليلًا ثم أعد المحاولة." }, { status: 429 });
  }

  const body = (await request.json().catch(() => null)) as
    | { name?: unknown; message?: unknown; company?: unknown }
    | null;

  if (!body) return NextResponse.json({ error: "تعذّر قراءة التهنئة." }, { status: 400 });
  if (clean(body.company, 80)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 40);
  const message = clean(body.message, 280);
  if (name.length < 2) return NextResponse.json({ error: "اكتب اسمك." }, { status: 400 });
  if (message.length < 2) return NextResponse.json({ error: "اكتب تهنئة." }, { status: 400 });

  try {
    const wish = await addWish({ name, message });
    return NextResponse.json({ wish });
  } catch (error) {
    const text = error instanceof Error ? error.message : "تعذّر الحفظ.";
    return NextResponse.json({ error: text }, { status: 500 });
  }
}

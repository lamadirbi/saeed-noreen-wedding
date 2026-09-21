import { promises as fs } from "fs";
import path from "path";
import type { Wish } from "@/lib/types";

export type { Wish };

const file = path.join(process.cwd(), "data", "wishes.json");

async function readAll(): Promise<Wish[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    const data = JSON.parse(raw) as unknown;
    if (!Array.isArray(data)) return [];
    return data.filter(
      (item): item is Wish =>
        !!item &&
        typeof item === "object" &&
        typeof (item as Wish).id === "string" &&
        typeof (item as Wish).name === "string" &&
        typeof (item as Wish).message === "string",
    );
  } catch {
    return [];
  }
}

async function writeAll(wishes: Wish[]) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(wishes, null, 2), "utf8");
}

export async function listWishes() {
  const wishes = await readAll();
  return wishes.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function addWish(input: { name: string; message: string }) {
  const wishes = await readAll();
  if (wishes.length >= 500) throw new Error("دفتر التهاني امتلأ.");
  const wish: Wish = {
    id: crypto.randomUUID(),
    name: input.name,
    message: input.message,
    createdAt: new Date().toISOString(),
  };
  wishes.push(wish);
  await writeAll(wishes);
  return wish;
}

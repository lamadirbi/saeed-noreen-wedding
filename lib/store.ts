import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import type { PublicWish, Wish } from "@/lib/types";

export type { PublicWish, Wish };

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

function publicWish(wish: Wish): PublicWish {
  const { token: _t, ...rest } = wish;
  return rest;
}

export async function listWishes() {
  const wishes = await readAll();
  return wishes
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .map(publicWish);
}

export async function addWish(input: { name: string; message: string }) {
  const wishes = await readAll();
  if (wishes.length >= 500) throw new Error("دفتر التهاني امتلأ.");
  const token = randomBytes(16).toString("hex");
  const wish: Wish = {
    id: crypto.randomUUID(),
    name: input.name,
    message: input.message,
    createdAt: new Date().toISOString(),
    token,
  };
  wishes.push(wish);
  await writeAll(wishes);
  return { wish: publicWish(wish), token };
}

export async function updateWish(id: string, token: string, message: string) {
  const wishes = await readAll();
  const index = wishes.findIndex((w) => w.id === id);
  if (index < 0) return null;
  if (!wishes[index].token || wishes[index].token !== token) return "forbidden" as const;
  wishes[index] = { ...wishes[index], message };
  await writeAll(wishes);
  return publicWish(wishes[index]);
}

export async function removeWish(id: string, token: string) {
  const wishes = await readAll();
  const index = wishes.findIndex((w) => w.id === id);
  if (index < 0) return null;
  if (!wishes[index].token || wishes[index].token !== token) return "forbidden" as const;
  wishes.splice(index, 1);
  await writeAll(wishes);
  return true;
}

export function toArabicDigits(value: number) {
  return value.toLocaleString("ar-EG");
}

export function formatWishDate(iso: string) {
  return new Date(iso).toLocaleString("ar-PS", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  });
}

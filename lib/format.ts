export function toArabicDigits(value: number, minDigits = 1) {
  return value.toLocaleString("ar-EG", {
    minimumIntegerDigits: minDigits,
    useGrouping: false,
  });
}

export function formatWishDate(iso: string) {
  return new Date(iso).toLocaleString("ar-PS", {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "2-digit",
  });
}

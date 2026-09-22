/**
 * بيانات فرح سعيد ونورين — عدّل من هنا فقط.
 */
export const wedding = {
  title: "أفراح آل حبوب",
  inviteLine: "يدعوانكم لحضور زفاف نجليهما",
  closing: "دامت أفراحكم عامرة بالسرور",
  showBismillah: true,
  verse: "وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  photos: {
    groom: "/photos/groom.png",
    couple: "/photos/couple.png",
    background: "/photos/bg.png",
  },
  english: {
    groom: "Saeed",
    bride: "Noreen",
  },
  groom: {
    first: "سعيد",
    full: "سعيد رفيق حبوب",
    father: "السيد رفيق سعيد حبوب",
    fatherTitle: "أبو رامي",
  },
  bride: {
    first: "نورين",
    full: "نورين إيهاب البقري",
    father: "السيد إيهاب عبد المعطي البقري",
    fatherTitle: "أبو العبد",
  },
  wedding: {
    weekday: "الأربعاء",
    dateLabel: "٣٠ سبتمبر ٢٠٢٦",
    timeLabel: "السادسة مساءً",
    dateISO: "2026-09-30T18:00:00+03:00",
    endISO: "2026-09-30T23:00:00+03:00",
    hall: "صالة ڤيينا",
    room: "قاعة الرومانسية",
    city: "غزة",
  },
  youth: {
    name: "حفلة الشباب",
    when: "بعد العشاء",
    place: "تقاطع الصحابة مع اليرموك",
    detail: "مقابل بركس أخ العريس هاني حبوب",
    artist: "يحيي الحفل الفنان خالد فرج",
  },
} as const;

export const coupleNames = `${wedding.groom.first} و${wedding.bride.first}`;

/**
 * بيانات فرح سعيد ونورين — عدّل من هنا فقط.
 */
export const wedding = {
  title: "أفراح آل حبوب",
  familiesLine: "يتشرّف والد العريس ووالد العروس وعائلتاهما الكريمتان بدعوتكم لحضور حفل زفاف نجليهما",
  closing: "دامت أفراحكم عامرة بالسرور",
  showBismillah: true,
  verse: "وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
  photos: {
    groom: "/photos/groom.png",
    couple: "/photos/couple.png",
    background: "/photos/bg.png",
  },
  groom: {
    first: "سعيد",
    full: "سعيد رفيق حبوب",
    father: "الحاج رفيق سعيد حبوب",
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
    timeLabel: "الساعة السادسة مساءً",
    dateISO: "2026-09-30T18:00:00+03:00",
    endISO: "2026-09-30T23:00:00+03:00",
    hall: "صالة ڤيينا",
    room: "قاعة الرومانسية",
    city: "غزة",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=صالة+ڤيينا+غزة",
  },
  youth: {
    name: "حفلة الشباب",
    when: "بعد العشاء",
    place: "تقاطع الصحابة مع اليرموك",
    detail: "مقابل بركس أخ العريس هاني حبوب أبو شادي",
    artist: "يحيي الحفل الفنان خالد فرج",
  },
  notes: [
    "إدارة الصالة تمنع اصطحاب الأطفال",
    "يُرجى عدم استخدام الجوال للتصوير أثناء الحفل",
  ],
} as const;

export const coupleNames = `${wedding.groom.first} و${wedding.bride.first}`;

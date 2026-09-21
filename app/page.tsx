import { Invitation } from "@/components/Invitation";
import { coupleNames, wedding } from "@/lib/wedding";

type Props = {
  searchParams: Promise<{ to?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const { to } = await searchParams;
  const guest = to?.trim().slice(0, 48) ?? "";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `حفل زفاف ${coupleNames}`,
    startDate: wedding.wedding.dateISO,
    endDate: wedding.wedding.endISO,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: `${wedding.wedding.hall} — ${wedding.wedding.room}`,
      address: wedding.wedding.city,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Invitation guest={guest} />
    </>
  );
}

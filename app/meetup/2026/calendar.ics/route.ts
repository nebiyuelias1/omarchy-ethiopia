import { NextResponse } from "next/server";
import { meetup2026 } from "@/data/event";

const calendarBody = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Omarchy Ethiopia//Meetup 2026//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
UID:omarchy-et-meetup-2026@omarchy.org.et
DTSTAMP:20260120T090000Z
DTSTART:20260207T070000Z
DTEND:20260207T133000Z
SUMMARY:${meetup2026.name}
LOCATION:${meetup2026.venue}
DESCRIPTION:${meetup2026.summary}
END:VEVENT
END:VCALENDAR`;

export function GET() {
  return new NextResponse(calendarBody, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="omarchy-ethiopia-meetup-2026.ics"',
    },
  });
}

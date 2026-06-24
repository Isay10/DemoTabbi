// Time helpers. No date libraries, no imports.

export function getElapsedMinutes(openedAt: string): number {
  return Math.floor((Date.now() - new Date(openedAt).getTime()) / 60000);
}

export function formatElapsed(openedAt: string): string {
  return `${getElapsedMinutes(openedAt)} min`;
}

export const BUSINESS_HOURS = { open: 9, close: 24 }; // 9am to midnight

export function isWithinBusinessHours(date: Date): boolean {
  const hour = date.getHours();
  return hour >= BUSINESS_HOURS.open && hour < BUSINESS_HOURS.close;
}

export function getBusinessSlots(): number[] {
  const slots: number[] = [];
  for (let hour = BUSINESS_HOURS.open; hour < BUSINESS_HOURS.close; hour++) {
    slots.push(hour);
  }
  return slots; // [9, 10, ... 23] — 15 hourly slots
}

export function formatSlotLabel(hour: number): string {
  return `${String(hour).padStart(2, "0")}:00`;
}

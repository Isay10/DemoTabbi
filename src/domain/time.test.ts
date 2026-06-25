import {
  getElapsedMinutes,
  isWithinBusinessHours,
  getBusinessSlots,
  formatSlotLabel,
} from "./time";

describe("getElapsedMinutes", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // local-component constructor = TZ-safe
    jest.setSystemTime(new Date(2026, 5, 24, 14, 0, 0));
  });
  afterEach(() => jest.useRealTimers());

  it("computes whole minutes since openedAt", () => {
    const openedAt = new Date(Date.now() - 90 * 60000).toISOString();
    expect(getElapsedMinutes(openedAt)).toBe(90);
  });
});

describe("isWithinBusinessHours", () => {
  it("is false before 09:00", () => {
    expect(isWithinBusinessHours(new Date(2026, 5, 24, 8, 59))).toBe(false);
  });
  it("is true at 09:00", () => {
    expect(isWithinBusinessHours(new Date(2026, 5, 24, 9, 0))).toBe(true);
  });
  it("is true at 23:59", () => {
    expect(isWithinBusinessHours(new Date(2026, 5, 24, 23, 59))).toBe(true);
  });
  it("is false at 00:00 (midnight close)", () => {
    expect(isWithinBusinessHours(new Date(2026, 5, 24, 0, 0))).toBe(false);
  });
});

describe("getBusinessSlots", () => {
  it("returns 15 hourly slots from 9 to 23", () => {
    const slots = getBusinessSlots();
    expect(slots).toHaveLength(15);
    expect(slots[0]).toBe(9);
    expect(slots[slots.length - 1]).toBe(23);
  });
});

describe("formatSlotLabel", () => {
  it("zero-pads the hour", () => {
    expect(formatSlotLabel(9)).toBe("09:00");
    expect(formatSlotLabel(23)).toBe("23:00");
  });
});

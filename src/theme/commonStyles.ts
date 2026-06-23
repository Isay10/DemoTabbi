// Reusable style fragments.

import { radius } from "./tokens";

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
};

export const card = {
  backgroundColor: "#fff",
  borderRadius: radius.md,
  ...shadow,
};

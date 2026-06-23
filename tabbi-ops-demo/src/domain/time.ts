// Time helpers. No date libraries, no imports.

export function getElapsedMinutes(openedAt: string): number {
  return Math.floor((Date.now() - new Date(openedAt).getTime()) / 60000);
}

export function formatElapsed(openedAt: string): string {
  return `${getElapsedMinutes(openedAt)} min`;
}

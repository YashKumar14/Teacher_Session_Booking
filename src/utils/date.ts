/** Accepts an ISO 8601 string or epoch milliseconds as a string. */
export const parseDateValue = (value: unknown): Date | null => {
  if (typeof value !== 'string' || value.trim() === '') {
    return null;
  }

  const trimmed = value.trim();
  const date = /^\d+$/.test(trimmed)
    ? new Date(Number(trimmed))
    : new Date(trimmed);

  return Number.isNaN(date.getTime()) ? null : date;
};

/** Half-open [start, end) range covering the UTC calendar day of the given date. */
export const getUtcDayRange = (date: Date): { start: Date; end: Date } => {
  const start = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  return { start, end };
};

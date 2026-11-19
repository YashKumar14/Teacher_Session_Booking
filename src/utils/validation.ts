const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const isEmail = (value: unknown): value is string =>
  isNonEmptyString(value) && EMAIL_PATTERN.test(value.trim());

export const isNonNegativeNumber = (value: unknown): boolean =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;

const ISO_DATE_TIME_PATTERN =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

/** Requires an ISO 8601 string with an explicit timezone so date filtering stays unambiguous. */
export const isIsoDateTime = (value: unknown): value is string =>
  typeof value === 'string' &&
  ISO_DATE_TIME_PATTERN.test(value) &&
  !Number.isNaN(Date.parse(value));

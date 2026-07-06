import { type STATUS_CODES } from '@domains/status-codes';

/**
 * All semantic HTTP status code keys defined in `STATUS_CODES`.
 */
export type StatusCodeKey = keyof typeof STATUS_CODES;

/**
 * Returns the HTTP status code as a number or its string literal form.
 */
export type StatusCode<T extends string | number> = T extends number
  ? (typeof STATUS_CODES)[StatusCodeKey]
  : `${(typeof STATUS_CODES)[StatusCodeKey]}`;

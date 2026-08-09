import { type STATUS_CODE } from '@domains/status-code';

/**
 * All semantic HTTP status code keys defined in `STATUS_CODE`.
 */
export type StatusCodeKey = keyof typeof STATUS_CODE;

/**
 * Returns the HTTP status code as a number or its string literal form.
 */
export type StatusCode<T extends string | number> = T extends number
  ? (typeof STATUS_CODE)[StatusCodeKey]
  : `${(typeof STATUS_CODE)[StatusCodeKey]}`;

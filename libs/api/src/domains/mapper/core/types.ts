import { type IApiError } from '@domains/api';
import { type StatusCode } from '@domains/status-code';
import { type IKernelError } from '@libs/kernel';

/**
 * Maps each domain error code to its API exposure or `null` to keep it internal.
 */
export type ApiErrorMappings<DomainError extends IKernelError = IKernelError> = Readonly<
  Record<DomainError['code'], IApiErrorMapping | null>
>;

/**
 * Describes how a domain error is exposed by the API.
 */
export interface IApiErrorMapping extends Partial<Pick<IApiError, 'detail' | 'title'>> {
  /**
   * The HTTP status code the domain error is answered with.
   */
  status: StatusCode<string>;
}

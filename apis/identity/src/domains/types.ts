import { type AuthenticationError } from '@domains/authentication';
import { type ISecureUser, type UserError } from '@domains/users';

export type DomainError = AuthenticationError | UserError;

/**
 * Represents the execution context for a domain operation.
 */
export interface IContext {
  /**
   * Represents the user performing the operation within the current context.
   */
  user: ISecureUser;
}

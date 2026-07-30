import { type AbstractAuthenticationApp } from '@domains/authentication';
import { type AbstractUsersApp } from '@domains/users';

export interface IRegistrationAppConfiguration {
  /**
   * Provides authentication use cases.
   */
  authenticationApp: AbstractAuthenticationApp;
  /**
   * Provides user use cases.
   */
  usersApp: AbstractUsersApp;
}

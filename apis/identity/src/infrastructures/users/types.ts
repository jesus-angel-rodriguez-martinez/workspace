import { type AbstractUsersApp, type IUsersRepository } from '@domains/users';
import { type AbstractCryptographyService } from '@libs/security';

export type ComposeUsers = (configuration: IComposeUsersConfiguration) => IComposedUsers;

export interface IComposeUsersConfiguration {
  /**
   * Provides cryptographic utilities.
   */
  cryptographyService: AbstractCryptographyService;
}

export interface IComposedUsers {
  /**
   * Provides user use cases.
   */
  usersApp: AbstractUsersApp;
  /**
   * Provides access to user data.
   */
  usersRepository: IUsersRepository;
}

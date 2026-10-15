import { type AbstractUserApp, type IUserRepository } from '@domains/user';
import { type IDatabase } from '@infrastructures/database';
import { type AbstractUserApiMapper } from '@infrastructures/user';
import { type AbstractCryptographyService } from '@libs/security';

export type ComposeUser = (options: IComposeUserOptions) => IComposedUser;

export interface IComposeUserOptions {
  /**
   * Provides cryptographic utilities.
   */
  readonly cryptographyService: AbstractCryptographyService;
  /**
   * Provides access to the database.
   */
  readonly database: IDatabase;
}

export interface IComposedUser {
  /**
   * Responsible for mapping user API errors.
   */
  userApiMapper: AbstractUserApiMapper;
  /**
   * Provides user use cases.
   */
  userApp: AbstractUserApp;
  /**
   * Provides access to user data.
   */
  userRepository: IUserRepository;
}

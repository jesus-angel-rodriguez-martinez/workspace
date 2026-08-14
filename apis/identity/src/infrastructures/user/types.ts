import { type AbstractUserApp, type IUserRepository } from '@domains/user';
import { type AbstractUserApiMapper } from '@infrastructures/user';
import { type AbstractCryptographyService } from '@libs/security';

export type ComposeUser = (configuration: IComposeUserConfiguration) => IComposedUser;

export interface IComposeUserConfiguration {
  /**
   * Provides cryptographic utilities.
   */
  cryptographyService: AbstractCryptographyService;
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

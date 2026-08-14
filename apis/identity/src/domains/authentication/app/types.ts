import { type AbstractUserApp, type IUserRepository } from '@domains/user';
import { type AbstractCryptographyService, type AbstractTokenService } from '@libs/security';

export interface IAuthenticationAppConfiguration {
  /**
   * Provides cryptographic utilities.
   */
  cryptographyService: AbstractCryptographyService;
  /**
   * Provides token utilities.
   */
  tokenService: AbstractTokenService;
  /**
   * Provides user use cases.
   */
  userApp: AbstractUserApp;
  /**
   * Provides access to user data.
   */
  userRepository: IUserRepository;
}

import { type AbstractUserApp, type IUserRepository } from '@domains/user';
import { type AbstractCryptographyService, type AbstractTokenService } from '@libs/security';

export interface IAuthenticationAppOptions {
  /**
   * Provides cryptographic utilities.
   */
  readonly cryptographyService: AbstractCryptographyService;
  /**
   * Provides token utilities.
   */
  readonly tokenService: AbstractTokenService;
  /**
   * Provides user use cases.
   */
  readonly userApp: AbstractUserApp;
  /**
   * Provides access to user data.
   */
  readonly userRepository: IUserRepository;
}

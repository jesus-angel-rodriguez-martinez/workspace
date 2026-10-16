import { type AbstractUserApp, type IUserRepository } from '@domains/user';
import { type AbstractCryptographyService, type AbstractTokenService } from '@libs/security';

export interface IAuthenticationAppOptions {
  /**
   * Issues and verifies access tokens.
   */
  readonly accessTokenService: AbstractTokenService;
  /**
   * Provides cryptographic utilities.
   */
  readonly cryptographyService: AbstractCryptographyService;
  /**
   * Issues and verifies refresh tokens.
   */
  readonly refreshTokenService: AbstractTokenService;
  /**
   * Provides user use cases.
   */
  readonly userApp: AbstractUserApp;
  /**
   * Provides access to user data.
   */
  readonly userRepository: IUserRepository;
}

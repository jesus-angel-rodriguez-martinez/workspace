import { type AbstractUserCredentialsValidator } from '@domains/authentication';
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
   * Validates the credentials provided.
   */
  readonly userCredentialsValidator: AbstractUserCredentialsValidator;
  /**
   * Provides access to user data.
   */
  readonly userRepository: IUserRepository;
}

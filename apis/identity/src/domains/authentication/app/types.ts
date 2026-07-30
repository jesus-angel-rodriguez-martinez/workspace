import { type IUsersRepository } from '@domains/users';
import { type AbstractCryptographyService, type AbstractTokenService } from '@libs/security';

export interface IAuthenticationAppConfiguration {
  /**
   * Provides cryptographic utilities for securely verifying passwords.
   */
  cryptographyService: AbstractCryptographyService;
  /**
   * Provides utilities for generating and validating authentication tokens.
   */
  tokenService: AbstractTokenService;
  /**
   * Provides access to user data.
   */
  usersRepository: IUsersRepository;
}

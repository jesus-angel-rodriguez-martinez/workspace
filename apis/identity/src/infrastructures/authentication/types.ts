import { type AbstractAuthenticationApp } from '@domains/authentication';
import { type AbstractUserApp, type IUserRepository } from '@domains/user';
import {
  type AbstractAuthenticationApiMapper,
  type AbstractAuthenticationResponseMapper
} from '@infrastructures/authentication';
import { type AbstractCryptographyService, type AbstractTokenService } from '@libs/security';

export type ComposeAuthentication = (options: IComposeAuthenticationOptions) => IComposedAuthentication;

export interface IComposeAuthenticationOptions {
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

export interface IComposedAuthentication {
  /**
   * Responsible for mapping authentication API errors.
   */
  authenticationApiMapper: AbstractAuthenticationApiMapper;
  /**
   * Provides authentication use cases.
   */
  authenticationApp: AbstractAuthenticationApp;
  /**
   * Responsible for mapping authentication responses.
   */
  authenticationResponseMapper: AbstractAuthenticationResponseMapper;
}

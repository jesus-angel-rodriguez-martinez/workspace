import { type AbstractAuthenticationApp } from '@domains/authentication';
import { type IRegistrationAppConfiguration } from '@domains/registration';
import { type AbstractUsersApp, type ICreateUser } from '@domains/users';
import { type AuthenticationToken } from '@libs/security';

/**
 * Abstract base class for the Registration App.
 */
export abstract class AbstractRegistrationApp {
  /**
   * Provides authentication use cases.
   */
  protected readonly authenticationApp: AbstractAuthenticationApp;
  /**
   * Provides user use cases.
   */
  protected readonly usersApp: AbstractUsersApp;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Registration App configuration options.
   */
  protected constructor({ authenticationApp, usersApp }: IRegistrationAppConfiguration) {
    this.authenticationApp = authenticationApp;
    this.usersApp = usersApp;
  }

  /**
   * Registers a new user in the system and issues an authentication token.
   *
   * @param payload - The data required to create the user.
   *
   * @returns A promise that resolves with the authentication token.
   */
  public abstract register(payload: ICreateUser): Promise<AuthenticationToken>;
}

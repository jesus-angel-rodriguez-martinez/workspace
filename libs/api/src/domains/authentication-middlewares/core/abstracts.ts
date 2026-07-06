import { type IAuthenticationMiddlewaresServiceConfiguration } from '@domains/authentication-middlewares';
import { type IUsersRepository } from '@libs/security';
import { type AbstractLoggerService } from '@libs/logger';

/**
 * Abstract base class for the Authentication Middlewares Service.
 */
export abstract class AbstractAuthenticationMiddlewaresService {
  /**
   * Logging service used for structured output and diagnostics.
   */
  protected readonly loggerService: AbstractLoggerService;
  /**
   * The secret key used to sign tokens.
   */
  protected readonly secret: string;
  /**
   * Provides access to user data.
   */
  protected readonly usersRepository: IUsersRepository;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Authentication Middlewares configuration options.
   */
  protected constructor({
    loggerService,
    secret,
    usersRepository
  }: IAuthenticationMiddlewaresServiceConfiguration) {
    this.loggerService = loggerService;
    this.secret = secret;
    this.usersRepository = usersRepository;
  }

  /**
   * Defines and registers authentication-specific middleware for the API calls.
   */
  public abstract init(): void;
}

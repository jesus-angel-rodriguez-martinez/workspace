import {
  type AbstractCreateUserValidator,
  type AbstractUserModelMapper,
  type ICreateUser,
  type ISecureUser,
  type IUserAppConfiguration,
  type IUserRepository
} from '@domains/user';
import { type AbstractCryptographyService } from '@libs/security';

/**
 * Abstract base class for the User App.
 */
export abstract class AbstractUserApp {
  /**
   * Validates user creation business rules.
   */
  protected readonly createUserValidator: AbstractCreateUserValidator;
  /**
   * Provides cryptographic utilities for securely hashing.
   */
  protected readonly cryptographyService: AbstractCryptographyService;
  /**
   * Maps user persistence models to domain entities.
   */
  protected readonly userModelMapper: AbstractUserModelMapper;
  /**
   * Provides access to user data.
   */
  protected readonly userRepository: IUserRepository;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - User App configuration options.
   */
  protected constructor({
    createUserValidator,
    cryptographyService,
    userModelMapper,
    userRepository
  }: IUserAppConfiguration) {
    this.createUserValidator = createUserValidator;
    this.cryptographyService = cryptographyService;
    this.userModelMapper = userModelMapper;
    this.userRepository = userRepository;
  }

  /**
   * Creates a new user in the system.
   *
   * @param payload - The data required to create the user.
   *
   * @returns A promise that resolves with the created user, without sensitive fields.
   */
  public abstract create(payload: ICreateUser): Promise<ISecureUser>;
}

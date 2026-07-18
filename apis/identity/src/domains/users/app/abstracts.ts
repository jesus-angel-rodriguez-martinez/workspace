import {
  type AbstractCreateUsersValidator,
  type AbstractUsersModelMapper,
  type ICreateUser,
  type ISecureUser,
  type IUsersAppConfiguration,
  type IUsersRepository
} from '@domains/users';
import { type AbstractCryptographyService } from '@libs/security';

/**
 * Abstract base class for the Users App.
 */
export abstract class AbstractUsersApp {
  /**
   * Validates user creation business rules.
   */
  protected readonly createUsersValidator: AbstractCreateUsersValidator;
  /**
   * Provides cryptographic utilities for securely hashing.
   */
  protected readonly cryptographyService: AbstractCryptographyService;
  /**
   * Maps user persistence models to domain entities.
   */
  protected readonly usersModelMapper: AbstractUsersModelMapper;
  /**
   * Provides access to user data.
   */
  protected readonly usersRepository: IUsersRepository;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - Users App configuration options.
   */
  protected constructor({
    createUsersValidator,
    cryptographyService,
    usersModelMapper,
    usersRepository
  }: IUsersAppConfiguration) {
    this.createUsersValidator = createUsersValidator;
    this.cryptographyService = cryptographyService;
    this.usersModelMapper = usersModelMapper;
    this.usersRepository = usersRepository;
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

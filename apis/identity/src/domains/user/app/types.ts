import {
  type AbstractCreateUserValidator,
  type AbstractUserModelMapper,
  type IUserRepository
} from '@domains/user';
import { type IUnitOfWork } from '@libs/kernel';
import { type AbstractCryptographyService } from '@libs/security';

/**
 * Defines the dependencies required to create the user application.
 */
export interface IUserAppOptions {
  /**
   * Validates user creation business rules.
   */
  readonly createUserValidator: AbstractCreateUserValidator;
  /**
   * Provides cryptographic utilities for securely hashing.
   */
  readonly cryptographyService: AbstractCryptographyService;
  /**
   * Runs repository operations inside a single transaction.
   */
  readonly unitOfWork: IUnitOfWork<IUserUnitOfWorkRepositories>;
  /**
   * Maps user persistence models to domain entities.
   */
  readonly userModelMapper: AbstractUserModelMapper;
  /**
   * Provides access to user data.
   */
  readonly userRepository: IUserRepository;
}

/**
 * The repositories bound to the transaction of a user unit of work.
 */
export interface IUserUnitOfWorkRepositories {
  /**
   * Provides access to user data.
   */
  readonly userRepository: IUserRepository;
}

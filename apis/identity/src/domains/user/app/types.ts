import {
  type AbstractCreateUserValidator,
  type AbstractUserModelMapper,
  type IUserRepository
} from '@domains/user';
import { type AbstractCryptographyService } from '@libs/security';

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
   * Maps user persistence models to domain entities.
   */
  readonly userModelMapper: AbstractUserModelMapper;
  /**
   * Provides access to user data.
   */
  readonly userRepository: IUserRepository;
}

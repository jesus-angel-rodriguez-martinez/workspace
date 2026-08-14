import {
  type AbstractCreateUserValidator,
  type AbstractUserModelMapper,
  type IUserRepository
} from '@domains/user';
import { type AbstractCryptographyService } from '@libs/security';

export interface IUserAppConfiguration {
  /**
   * Validates user creation business rules.
   */
  createUserValidator: AbstractCreateUserValidator;
  /**
   * Provides cryptographic utilities for securely hashing.
   */
  cryptographyService: AbstractCryptographyService;
  /**
   * Maps user persistence models to domain entities.
   */
  userModelMapper: AbstractUserModelMapper;
  /**
   * Provides access to user data.
   */
  userRepository: IUserRepository;
}

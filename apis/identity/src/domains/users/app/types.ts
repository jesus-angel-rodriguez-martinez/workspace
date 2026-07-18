import {
  type AbstractCreateUsersValidator,
  type AbstractUsersModelMapper,
  type IUsersRepository
} from '@domains/users';
import { type AbstractCryptographyService } from '@libs/security';

export interface IUsersAppConfiguration {
  /**
   * Validates user creation business rules.
   */
  createUsersValidator: AbstractCreateUsersValidator;
  /**
   * Provides cryptographic utilities for securely hashing.
   */
  cryptographyService: AbstractCryptographyService;
  /**
   * Maps user persistence models to domain entities.
   */
  usersModelMapper: AbstractUsersModelMapper;
  /**
   * Provides access to user data.
   */
  usersRepository: IUsersRepository;
}

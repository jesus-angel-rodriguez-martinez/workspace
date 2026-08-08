import { type AbstractAuthenticationApiMapper } from '@infrastructures/authentication';
import { type IApiMapperConfiguration } from '@infrastructures/api';
import { type AbstractUsersApiMapper } from '@infrastructures/users';
import { type ApiError } from '@libs/api';
import { type CoreError } from '@libs/core';

/**
 * Abstract base class for the API mapper.
 */
export abstract class AbstractApiMapper {
  /**
   * Responsible for mapping authentication API errors.
   */
  protected readonly authenticationApiMapper: AbstractAuthenticationApiMapper;
  /**
   * Responsible for mapping user API errors.
   */
  protected readonly usersApiMapper: AbstractUsersApiMapper;

  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   *
   * @param configuration - API mapper configuration options.
   */
  protected constructor({ authenticationApiMapper, usersApiMapper }: IApiMapperConfiguration) {
    this.authenticationApiMapper = authenticationApiMapper;
    this.usersApiMapper = usersApiMapper;
  }

  /**
   * Converts a domain error into its API error representation by delegating to
   * the domain-specific mappers.
   *
   * @param error - The domain error to convert.
   *
   * @returns The corresponding API error, or `undefined` if no mapper handles it.
   */
  public abstract toApiError(error: CoreError): ApiError | undefined;
}

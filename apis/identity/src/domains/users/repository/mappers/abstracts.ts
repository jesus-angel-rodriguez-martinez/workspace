import { type ISecureUser, type IUserModel } from '@domains/users';

/**
 * Abstract base class for mapping user persistence models to domain entities.
 */
export abstract class AbstractUsersModelMapper {
  /**
   * The constructor is protected to ensure this abstract class cannot be
   * instantiated directly, but only through subclasses.
   */
  protected constructor() {}

  /**
   * Maps a user persistence model to a secure user entity, dropping sensitive fields.
   *
   * @param userModel - The user persistence model.
   *
   * @returns The user entity without sensitive fields.
   */
  public abstract toSecureUser(userModel: IUserModel): ISecureUser;
}

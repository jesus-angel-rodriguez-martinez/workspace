/**
 * Represents the data required to create a new user.
 */
export interface ICreateUserModel extends Omit<IUserModel, 'id'> {}

export interface IUserModel {
  /**
   * The unique identifier of the user.
   */
  id: string;
  /**
   * The full name of the user.
   */
  name: string;
  /**
   * The password of the user used for authentication.
   */
  password: Buffer;
  /**
   * The salt of the user used for authentication.
   */
  salt: Buffer;
  /**
   * The username of the user.
   */
  username: string;
}

/**
 * Filters for querying user models.
 */
export interface IUserModelFilters extends Partial<Pick<IUserModel, 'id' | 'username'>> {
  /**
   * Restricts the search to users that have not been soft-deleted. Defaults to `true`.
   */
  readonly isActive?: boolean;
}

export interface IUserRepository {
  /**
   * Finds a user by the given filter criteria.
   * Only active users are searched unless `isActive` is `false`.
   *
   * @param filters - An object with the properties to filter users by.
   *
   * @returns A promise that resolves to the user if found, or null otherwise.
   */
  findOne(filters: IUserModelFilters): Promise<IUserModel | null>;
  /**
   * Inserts a new user into the data store.
   *
   * @param payload - The data required to create a new user.
   *
   * @returns A promise that resolves with the created user.
   */
  insertOne(payload: ICreateUserModel): Promise<IUserModel>;
}

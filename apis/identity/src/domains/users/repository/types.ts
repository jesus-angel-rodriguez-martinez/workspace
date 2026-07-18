export interface IUserModel {
  /**
   * A brief description of the user.
   */
  about: string;
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
 * Represents the data required to create a new user.
 */
export interface ICreateUserModel extends Omit<IUserModel, 'id'> {}

/**
 * Filters for querying user models.
 */
export interface IUserModelFilters extends Partial<Pick<IUserModel, 'id' | 'username'>> {}

export interface IUsersRepository {
  /**
   * Finds a user by given filter criteria.
   * If no filters are provided, returns the first user.
   *
   * @param filters - An object with zero or more properties to filter users by.
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
  insert(payload: ICreateUserModel): Promise<IUserModel>;
}

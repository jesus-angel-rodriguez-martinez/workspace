/**
 * Filters for querying user models, requiring at least one criterion.
 */
export type UserModelFilters = Pick<IUserModel, 'id'> | Pick<IUserModel, 'username'>;

/**
 * Represents the data required to create a new user.
 */
export interface ICreateUserModel extends Omit<IUserModel, 'id'> {}

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

export interface IUserRepository {
  /**
   * Finds an active user by the given filter criteria.
   *
   * @param filters - An object with at least one property to filter users by.
   *
   * @returns A promise that resolves to the user if found, or null otherwise.
   */
  findOne(filters: UserModelFilters): Promise<IUserModel | null>;
  /**
   * Inserts a new user into the data store.
   *
   * @param payload - The data required to create a new user.
   *
   * @returns A promise that resolves with the created user.
   */
  insertOne(payload: ICreateUserModel): Promise<IUserModel>;
}

/**
 * Represents a user with sensitive fields removed for secure usage.
 */
export interface ISecureUser extends Omit<IUser, keyof Pick<IUser, 'password'>> {}

/**
 * Represents a user with sensitive fields.
 */
export interface IUser {
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
  password: string;
  /**
   * The username of the user.
   */
  username: string;
}

import { type WrongCredentialsError } from '@domains/authentication';
import { type IUser } from '@domains/user';

/**
 * Represents the data required to authenticate a user.
 */
export interface IUserCredentials extends Pick<IUser, 'password' | 'username'> {}

/**
 * Represents the complete list of authentication domain errors.
 */
export type AuthenticationError = WrongCredentialsError;

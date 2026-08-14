import { type WrongCredentialsError } from '@domains/authentication';
import { type IUser } from '@domains/user';

/**
 * Represents the data required to authenticate a user.
 */
export interface IUserCredentials extends Pick<IUser, 'password' | 'username'> {}

export type AuthenticationError = WrongCredentialsError;

import { type AbstractUsersApp } from '@domains/users';

export type ComposeApis = (configuration: IComposeApisConfiguration) => Promise<void>;

export interface IComposeApisConfiguration {
  /**
   * Provides user use cases.
   */
  usersApp: AbstractUsersApp;
}

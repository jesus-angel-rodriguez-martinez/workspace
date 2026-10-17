import { type IUserModel } from '@domains/user';
import { type Generated } from 'kysely';

export interface IUserTable extends Omit<IUserModel, keyof Pick<IUserModel, 'id'>> {
  /**
   * The time at which the user was created.
   */
  createdAt: Generated<Date>;
  /**
   * The time at which the user was soft-deleted, or null while the user is active.
   */
  deletedAt: Generated<Date | null>;
  /**
   * The unique identifier of the user.
   */
  id: Generated<string>;
  /**
   * The time at which the user was last updated.
   */
  updatedAt: Generated<Date>;
}

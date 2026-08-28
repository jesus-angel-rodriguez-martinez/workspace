import { type IUserModel } from '@domains/user';
import { type Generated } from 'kysely';

export interface IUserTable extends Omit<IUserModel, keyof Pick<IUserModel, 'id'>> {
  /**
   * The unique identifier of the user.
   */
  id: Generated<string>;
}

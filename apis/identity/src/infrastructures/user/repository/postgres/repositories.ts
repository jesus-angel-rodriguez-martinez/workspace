import {
  type ICreateUserModel,
  type IUserModel,
  type IUserModelFilters,
  type IUserRepository
} from '@domains/user';
import { type IDatabase } from '@infrastructures/database';

export class PostgresUserRepository implements IUserRepository {
  private readonly db: IDatabase;

  public constructor(db: IDatabase) {
    this.db = db;
  }

  async findOne(filters: IUserModelFilters): Promise<IUserModel | null> {
    const { id, isActive = true, username } = filters;

    let query = this.db.selectFrom('users').selectAll();
    if (id !== undefined) {
      query = query.where('id', '=', id);
    }
    if (isActive) {
      query = query.where('deletedAt', 'is', null);
    }
    if (username !== undefined) {
      query = query.where('username', '=', username);
    }

    const userModel = await query.limit(1).executeTakeFirst();
    return userModel ?? null;
  }

  async insertOne(payload: ICreateUserModel): Promise<IUserModel> {
    const userModel = await this.db
      .insertInto('users')
      .values({
        name: payload.name,
        password: payload.password,
        salt: payload.salt,
        username: payload.username
      })
      .returningAll()
      .executeTakeFirstOrThrow();

    return userModel;
  }
}

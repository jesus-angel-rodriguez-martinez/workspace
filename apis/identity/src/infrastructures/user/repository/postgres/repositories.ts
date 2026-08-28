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
    let query = this.db.selectFrom('users').selectAll();

    if (filters.id !== undefined) {
      query = query.where('id', '=', filters.id);
    }
    if (filters.username !== undefined) {
      query = query.where('username', '=', filters.username);
    }

    const userModel = await query.executeTakeFirst();
    return userModel ?? null;
  }

  async insert(payload: ICreateUserModel): Promise<IUserModel> {
    const userModel = await this.db
      .insertInto('users')
      .values({
        about: payload.about,
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

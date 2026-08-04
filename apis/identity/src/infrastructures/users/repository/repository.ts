import {
  type ICreateUserModel,
  type IUserModel,
  type IUserModelFilters,
  type IUsersRepository
} from '@domains/users';
import { randomUUID } from 'node:crypto';

export class UsersRepository implements IUsersRepository {
  protected readonly users: IUserModel[] = [];

  async findOne(filters: IUserModelFilters): Promise<IUserModel | null> {
    const user = this.users.find((user) => {
      if (filters.id && filters.id !== user.id) {
        return false;
      }
      if (filters.username && filters.username !== user.username) {
        return false;
      }
      return true;
    });

    return user ? { ...user } : null;
  }

  async insert(payload: ICreateUserModel): Promise<IUserModel> {
    const user: IUserModel = {
      about: payload.about,
      id: randomUUID(),
      name: payload.name,
      password: payload.password,
      salt: payload.salt,
      username: payload.username
    };

    this.users.push(user);

    return { ...user };
  }
}

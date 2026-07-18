import { AbstractUsersModelMapper, type ISecureUser, type IUserModel } from '@domains/users';

export class UsersModelMapper extends AbstractUsersModelMapper {
  public constructor() {
    super();
  }

  public toSecureUser(userModel: IUserModel): ISecureUser {
    return {
      about: userModel.about,
      id: userModel.id,
      name: userModel.name,
      username: userModel.username
    };
  }
}

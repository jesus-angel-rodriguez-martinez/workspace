import { AbstractUserModelMapper, type ISecureUser, type IUserModel } from '@domains/user';

export class UserModelMapper extends AbstractUserModelMapper {
  public constructor() {
    super();
  }

  public toSecureUser(userModel: IUserModel): ISecureUser {
    return {
      id: userModel.id,
      name: userModel.name,
      username: userModel.username
    };
  }
}

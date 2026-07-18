import {
  AbstractUsersApp,
  type ICreateUser,
  type ISecureUser,
  type IUsersAppConfiguration,
  UserAlreadyExistsError
} from '@domains/users';

export class UsersApp extends AbstractUsersApp {
  public constructor(configuration: IUsersAppConfiguration) {
    super(configuration);
  }

  public async create(payload: ICreateUser): Promise<ISecureUser> {
    this.createUsersValidator.validate(payload);

    const { name, password, username } = payload;

    const userModel = await this.usersRepository.findOne({
      username
    });
    if (userModel) {
      throw new UserAlreadyExistsError(username);
    }

    const salt = await this.cryptographyService.generateSalt();

    const hashedPassword = await this.cryptographyService.hashPassword(password, salt);

    const createdUserModel = await this.usersRepository.insert({
      about: '',
      name,
      password: hashedPassword,
      salt,
      username
    });

    const secureUser = this.usersModelMapper.toSecureUser(createdUserModel);
    return secureUser;
  }
}

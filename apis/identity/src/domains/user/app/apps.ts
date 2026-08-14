import {
  AbstractUserApp,
  type ICreateUser,
  type ISecureUser,
  type IUserAppConfiguration,
  UserAlreadyExistsError
} from '@domains/user';

export class UserApp extends AbstractUserApp {
  public constructor(configuration: IUserAppConfiguration) {
    super(configuration);
  }

  public async create(payload: ICreateUser): Promise<ISecureUser> {
    this.createUserValidator.validate(payload);

    const { name, password, username } = payload;

    const userModel = await this.userRepository.findOne({
      username
    });
    if (userModel) {
      throw new UserAlreadyExistsError(username);
    }

    const salt = await this.cryptographyService.generateSalt();

    const hashedPassword = await this.cryptographyService.hashPassword(password, salt);

    const createdUserModel = await this.userRepository.insert({
      about: '',
      name,
      password: hashedPassword,
      salt,
      username
    });

    const secureUser = this.userModelMapper.toSecureUser(createdUserModel);
    return secureUser;
  }
}

import { UserApp } from '@domains/user';
import {
  type ComposeUser,
  CreateUserValidator,
  UserApiMapper,
  UserModelMapper,
  UserRepository
} from '@infrastructures/user';

export const composeUser: ComposeUser = ({ cryptographyService }) => {
  const createUserValidator = new CreateUserValidator();

  const userApiMapper = new UserApiMapper();

  const userModelMapper = new UserModelMapper();

  const userRepository = new UserRepository();

  const userApp = new UserApp({
    createUserValidator,
    cryptographyService,
    userModelMapper,
    userRepository
  });

  return { userApiMapper, userApp, userRepository };
};

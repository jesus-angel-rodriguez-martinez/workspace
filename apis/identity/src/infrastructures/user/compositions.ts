import { CreateUserValidator, UserApp } from '@domains/user';
import {
  type ComposeUser,
  PostgresUserRepository,
  UserApiMapper,
  UserModelMapper
} from '@infrastructures/user';

export const composeUser: ComposeUser = ({ cryptographyService, database }) => {
  const createUserValidator = new CreateUserValidator();

  const userApiMapper = new UserApiMapper();

  const userModelMapper = new UserModelMapper();

  const userRepository = new PostgresUserRepository(database);

  const userApp = new UserApp({
    createUserValidator,
    cryptographyService,
    userModelMapper,
    userRepository
  });

  return { userApiMapper, userApp, userRepository };
};

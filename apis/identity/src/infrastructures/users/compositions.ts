import { UsersApp } from '@domains/users';
import {
  type ComposeUsers,
  CreateUsersValidator,
  UsersApiMapper,
  UsersModelMapper,
  UsersRepository
} from '@infrastructures/users';

export const composeUsers: ComposeUsers = ({ cryptographyService }) => {
  const createUsersValidator = new CreateUsersValidator();

  const usersApiMapper = new UsersApiMapper();

  const usersModelMapper = new UsersModelMapper();

  const usersRepository = new UsersRepository();

  const usersApp = new UsersApp({
    createUsersValidator,
    cryptographyService,
    usersModelMapper,
    usersRepository
  });

  return { usersApiMapper, usersApp, usersRepository };
};

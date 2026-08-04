import { UsersApp } from '@domains/users';
import {
  type ComposeUsers,
  CreateUsersValidator,
  UsersModelMapper,
  UsersRepository
} from '@infrastructures/users';

export const composeUsers: ComposeUsers = ({ cryptographyService }) => {
  const createUsersValidator = new CreateUsersValidator();

  const usersModelMapper = new UsersModelMapper();

  const usersRepository = new UsersRepository();

  const usersApp = new UsersApp({
    createUsersValidator,
    cryptographyService,
    usersModelMapper,
    usersRepository
  });

  return { usersApp, usersRepository };
};

import { UsersApp } from '@domains/users';
import { CreateUsersValidator, UsersModelMapper, UsersRepository } from '@infrastructures/users';
import { type AbstractCryptographyService } from '@libs/security';

export const composeUsers = (cryptographyService: AbstractCryptographyService) => {
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

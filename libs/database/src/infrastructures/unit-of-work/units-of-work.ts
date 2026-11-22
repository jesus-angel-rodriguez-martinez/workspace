import { type IUnitOfWorkOptions, type UnitOfWorkRepositoriesFactory } from '@infrastructures/unit-of-work';
import { type IUnitOfWork, type UnitOfWorkCallback } from '@libs/kernel';
import { type Kysely } from 'kysely';

export class UnitOfWork<Schema, Repositories> implements IUnitOfWork<Repositories> {
  private readonly client: Kysely<Schema>;
  private readonly createRepositories: UnitOfWorkRepositoriesFactory<Schema, Repositories>;

  public constructor({ client, createRepositories }: IUnitOfWorkOptions<Schema, Repositories>) {
    this.client = client;
    this.createRepositories = createRepositories;
  }

  public async execute<Result>(callback: UnitOfWorkCallback<Repositories, Result>): Promise<Result> {
    const result = await this.client.transaction().execute(async (transaction) => {
      const repositories = this.createRepositories(transaction);
      return callback(repositories);
    });

    return result;
  }
}

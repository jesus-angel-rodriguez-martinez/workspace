import { type Kysely, type Transaction } from 'kysely';

/**
 * Creates the repositories bound to a transaction.
 */
export type UnitOfWorkRepositoriesFactory<Schema, Repositories> = (
  transaction: Transaction<Schema>
) => Repositories;

export interface IUnitOfWorkOptions<Schema, Repositories> {
  /**
   * The database client used to open each transaction.
   */
  readonly client: Kysely<Schema>;
  /**
   * Creates the repositories bound to a transaction.
   */
  readonly createRepositories: UnitOfWorkRepositoriesFactory<Schema, Repositories>;
}

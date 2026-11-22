/**
 * The work to run inside a single transaction.
 */
export type UnitOfWorkCallback<Repositories, Result> = (repositories: Repositories) => Promise<Result>;

export interface IUnitOfWork<Repositories> {
  /**
   * Runs the given work inside a single transaction.
   * The transaction commits when the work resolves and rolls back when it rejects.
   *
   * @param callback - The work to run with repositories bound to the transaction.
   *
   * @returns A promise that resolves with the result of the work.
   */
  execute<Result>(callback: UnitOfWorkCallback<Repositories, Result>): Promise<Result>;
}

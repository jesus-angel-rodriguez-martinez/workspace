import { type IOutboxEventTable } from '@infrastructures/outbox-event';
import { type IUserTable } from '@infrastructures/user';
import { type Kysely } from 'kysely';

export interface IDatabaseSchema {
  /**
   * The `outbox_events` table.
   */
  outboxEvents: IOutboxEventTable;
  /**
   * The `users` table.
   */
  users: IUserTable;
}

export interface IDatabase extends Kysely<IDatabaseSchema> {}

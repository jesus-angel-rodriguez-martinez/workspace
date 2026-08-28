import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('outbox_events')
    .addColumn('aggregate_id', 'text', (column) => column.notNull())
    .addColumn('aggregate_type', 'text', (column) => column.notNull())
    .addColumn('id', 'uuid', (column) => column.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('type', 'text', (column) => column.notNull())
    .addColumn('payload', 'jsonb', (column) => column.notNull())
    .addColumn('created_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
    .addColumn('processed_at', 'timestamptz')
    .execute();

  await sql`
    create index outbox_events_unprocessed_idx
    on outbox_events (created_at)
    where processed_at is null
  `.execute(db);
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('outbox_events').execute();
}

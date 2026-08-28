import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('about', 'text')
    .addColumn('created_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
    .addColumn('deleted_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
    .addColumn('id', 'uuid', (column) => column.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('name', 'text', (column) => column.notNull())
    .addColumn('password', 'bytea', (column) => column.notNull())
    .addColumn('salt', 'bytea', (column) => column.notNull())
    .addColumn('updated_at', 'timestamptz', (column) => column.notNull().defaultTo(sql`now()`))
    .addColumn('username', 'text', (column) => column.notNull().unique())
    .execute();
}

export async function down(db: Kysely<unknown>): Promise<void> {
  await db.schema.dropTable('users').execute();
}

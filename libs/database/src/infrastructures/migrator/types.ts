import { type IMigratorServiceConfiguration } from '@domains/migrator';
import { type ClientService } from '@infrastructures/client';

/**
 * Options to construct a migrator service.
 */
export interface IMigratorServiceOptions<Schema> extends IMigratorServiceConfiguration {
  /**
   * Provides the database client migrations run against.
   */
  clientService: ClientService<Schema>;
}

import { type Generated } from 'kysely';

export interface IOutboxEventTable {
  /**
   * The unique identifier of the aggregate the event belongs to.
   */
  aggregateId: string;
  /**
   * The type of the aggregate the event belongs to.
   */
  aggregateType: string;
  /**
   * The time at which the event was created.
   */
  createdAt: Generated<Date>;
  /**
   * The unique identifier of the outbox event.
   */
  id: Generated<string>;
  /**
   * The event payload.
   */
  payload: unknown;
  /**
   * The time at which the event was processed, or null if not yet processed.
   */
  processedAt: Date | null;
  /**
   * The type of the event.
   */
  type: string;
}

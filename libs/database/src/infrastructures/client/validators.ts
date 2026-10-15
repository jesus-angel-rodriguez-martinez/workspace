import {
  AbstractClientValidator,
  AggregateClientConfigurationError,
  type IClientServiceConfiguration,
  MissingClientDatabaseError,
  MissingClientHostError,
  MissingClientPasswordError,
  MissingClientPortError,
  MissingClientUserError
} from '@domains/client';
import { type IKernelError } from '@libs/kernel';

export class ClientValidator extends AbstractClientValidator {
  public constructor() {
    super();
  }

  public validate(configuration: IClientServiceConfiguration): void {
    const { database, host, password, port, user } = configuration;

    const errors: IKernelError[] = [];

    if (!database) {
      errors.push(new MissingClientDatabaseError());
    }
    if (!host) {
      errors.push(new MissingClientHostError());
    }
    if (!password) {
      errors.push(new MissingClientPasswordError());
    }
    if (!port) {
      errors.push(new MissingClientPortError());
    }
    if (!user) {
      errors.push(new MissingClientUserError());
    }

    if (errors.length) {
      throw new AggregateClientConfigurationError(errors);
    }
  }
}

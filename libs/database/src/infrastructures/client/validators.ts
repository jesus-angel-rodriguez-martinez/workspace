import {
  AbstractClientValidator,
  AggregateClientConfigurationError,
  CLIENT_RULES,
  type IClientServiceConfiguration,
  InvalidClientCertificateFileNameError,
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
    const { certificateFileName, database, host, password, port, user } = configuration;

    const errors: IKernelError[] = [];

    const { ALLOWED_CHARACTERS } = CLIENT_RULES.certificateFileName.REGEX_PATTERNS;
    if (certificateFileName !== undefined && !ALLOWED_CHARACTERS.test(certificateFileName)) {
      errors.push(new InvalidClientCertificateFileNameError(certificateFileName));
    }

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

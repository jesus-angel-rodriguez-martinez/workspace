import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more certificate configuration validation errors are found.
 */
export class AggregateCertificateConfigurationError extends AggregateKernelError {
  public readonly code = 'CERTIFICATE.INVALID_CONFIGURATION';
  public readonly title = 'Invalid certificate configuration';

  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, options);
  }
}

/**
 * Error thrown when the certificate file name is invalid.
 */
export class InvalidCertificateFileNameError extends KernelError {
  public readonly code = 'CERTIFICATE.INVALID_FILE_NAME';
  public readonly title = 'Invalid certificate file name';

  /**
   * @param fileName - The invalid certificate file name.
   * @param options - Optional error configuration options.
   */
  constructor(fileName: string, options: IKernelErrorOptions = {}) {
    super(`Certificate file name '${fileName}' must not contain path separators.`, options);
  }
}

/**
 * Error thrown when the certificate file does not exist.
 */
export class MissingCertificateFileError extends KernelError {
  public readonly code = 'CERTIFICATE.MISSING_FILE';
  public readonly title = 'Missing certificate file';

  /**
   * @param filePath - The absolute path where the certificate file was expected.
   * @param options - Optional error configuration options.
   */
  constructor(filePath: string, options: IKernelErrorOptions = {}) {
    super(`Certificate file '${filePath}' does not exist.`, options);
  }
}

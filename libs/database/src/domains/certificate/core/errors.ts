import { AggregateKernelError, type IKernelError, type IKernelErrorOptions, KernelError } from '@libs/kernel';

/**
 * Error thrown when one or more certificate configuration validation errors are found.
 */
export class AggregateCertificateConfigurationError extends AggregateKernelError {
  /**
   * @param errors - The collection of configuration errors.
   * @param options - Optional error configuration options.
   */
  constructor(errors: IKernelError[], options: IKernelErrorOptions = {}) {
    super(errors, {
      cause: options.cause,
      code: 'CERTIFICATE.INVALID_CONFIGURATION',
      title: 'Invalid certificate configuration'
    });
  }
}

/**
 * Error thrown when the certificate file name is invalid.
 */
export class InvalidCertificateFileNameError extends KernelError {
  /**
   * @param fileName - The invalid certificate file name.
   * @param options - Optional error configuration options.
   */
  constructor(fileName: string, options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CERTIFICATE.INVALID_FILE_NAME',
      detail: `Certificate file name '${fileName}' must not contain path separators.`,
      title: 'Invalid certificate file name'
    });
  }
}

/**
 * Error thrown when the certificate file does not exist.
 */
export class MissingCertificateFileError extends KernelError {
  /**
   * @param filePath - The absolute path where the certificate file was expected.
   * @param options - Optional error configuration options.
   */
  constructor(filePath: string, options: IKernelErrorOptions = {}) {
    super({
      cause: options.cause,
      code: 'CERTIFICATE.MISSING_FILE',
      detail: `Certificate file '${filePath}' does not exist.`,
      title: 'Missing certificate file'
    });
  }
}

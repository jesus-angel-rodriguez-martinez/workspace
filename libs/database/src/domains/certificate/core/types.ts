import { type AbstractCertificateValidator } from '@domains/certificate';
import { type AbstractPathService } from '@domains/path';

export interface ICertificateServiceConfiguration {
  /**
   * The certificate file name used to verify the database server.
   */
  readonly fileName: string;
}

export interface ICertificateServiceOptions {
  /**
   * Validates the certificate configuration.
   */
  readonly certificateValidator: AbstractCertificateValidator;
  /**
   * Certificate configuration options.
   */
  readonly configuration: ICertificateServiceConfiguration;
  /**
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
}

export interface ICertificateValidatorOptions {
  /**
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
}

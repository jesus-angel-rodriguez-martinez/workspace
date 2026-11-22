import { type AbstractCertificateValidator } from '@domains/certificate';
import { type AbstractPathService } from '@domains/path';

/**
 * Defines the configuration of the certificate service.
 */
export interface ICertificateServiceConfiguration {
  /**
   * The certificate file name used to verify the database server.
   */
  readonly fileName: string;
}

/**
 * Defines the configuration and dependencies required to create the certificate service.
 */
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

/**
 * Defines the dependencies required to create the certificate validator.
 */
export interface ICertificateValidatorOptions {
  /**
   * Resolves the filesystem paths.
   */
  readonly pathService: AbstractPathService;
}

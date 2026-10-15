import {
  type ICertificateServiceConfiguration,
  type ICertificateServiceOptions,
  type ICertificateValidatorOptions
} from '@domains/certificate';
import { type AbstractPathService } from '@domains/path';

export abstract class AbstractCertificateService {
  /**
   * Certificate configuration options.
   */
  protected readonly configuration: ICertificateServiceConfiguration;
  /**
   * Resolves the filesystem paths.
   */
  protected readonly pathService: AbstractPathService;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - Certificate service options.
   */
  protected constructor({ certificateValidator, configuration, pathService }: ICertificateServiceOptions) {
    certificateValidator.validate(configuration);

    this.configuration = Object.freeze({ ...configuration });
    this.pathService = pathService;
  }

  /**
   * Reads the certificate authority used to verify the database server.
   *
   * @returns The certificate content.
   */
  public abstract read(): string;
}

export abstract class AbstractCertificateValidator {
  /**
   * Resolves the filesystem paths.
   */
  protected readonly pathService: AbstractPathService;

  /**
   * Restricts instantiation to subclasses.
   *
   * @param options - Certificate validator options.
   */
  protected constructor({ pathService }: ICertificateValidatorOptions) {
    this.pathService = pathService;
  }

  /**
   * Validates that the certificate file name is valid and that the file exists.
   *
   * @param configuration - Certificate configuration options to validate.
   */
  public abstract validate(configuration: ICertificateServiceConfiguration): void;
}

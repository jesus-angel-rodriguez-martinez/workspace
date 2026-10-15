import {
  AbstractCertificateValidator,
  AggregateCertificateConfigurationError,
  CERTIFICATE_RULES,
  type ICertificateServiceConfiguration,
  type ICertificateValidatorOptions,
  InvalidCertificateFileNameError,
  MissingCertificateFileError
} from '@domains/certificate';
import { type IKernelError } from '@libs/kernel';
import { existsSync } from 'node:fs';

export class CertificateValidator extends AbstractCertificateValidator {
  public constructor(options: ICertificateValidatorOptions) {
    super(options);
  }

  public validate(configuration: ICertificateServiceConfiguration): void {
    const { fileName } = configuration;

    const errors: IKernelError[] = [];

    const { ALLOWED_CHARACTERS } = CERTIFICATE_RULES.fileName.REGEX_PATTERNS;
    if (!ALLOWED_CHARACTERS.test(fileName)) {
      errors.push(new InvalidCertificateFileNameError(fileName));
    } else {
      const filePath = this.pathService.resolveCertificateFile(fileName);
      if (!existsSync(filePath)) {
        errors.push(new MissingCertificateFileError(filePath));
      }
    }

    if (errors.length) {
      throw new AggregateCertificateConfigurationError(errors);
    }
  }
}

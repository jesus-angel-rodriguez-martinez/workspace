import {
  AbstractCryptographyValidator,
  AggregateCryptographyConfigurationError,
  CRYPTOGRAPHY_RULES,
  type ICryptographyServiceConfiguration,
  InvalidCryptographyKeyLengthError,
  WeakCryptographyIterationsError,
  WeakCryptographySaltLengthError
} from '@domains/cryptography';
import { type IKernelError } from '@libs/kernel';

export class CryptographyValidator extends AbstractCryptographyValidator {
  public constructor() {
    super();
  }

  public validate(configuration: ICryptographyServiceConfiguration): void {
    const { iterations, keyLength, saltLength } = configuration;

    const errors: IKernelError[] = [];

    if (iterations < CRYPTOGRAPHY_RULES.iterations.MIN) {
      errors.push(new WeakCryptographyIterationsError());
    }
    if (keyLength !== CRYPTOGRAPHY_RULES.key.LENGTH) {
      errors.push(new InvalidCryptographyKeyLengthError());
    }
    if (saltLength < CRYPTOGRAPHY_RULES.salt.MIN_LENGTH) {
      errors.push(new WeakCryptographySaltLengthError());
    }

    if (errors.length) {
      throw new AggregateCryptographyConfigurationError(errors);
    }
  }
}

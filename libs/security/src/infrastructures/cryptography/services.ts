import { pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import {
  AbstractCryptographyService,
  AggregateCryptographyConfigurationError,
  CRYPTOGRAPHY_RULES,
  type ICryptographyServiceConfiguration,
  WeakCryptographyIterationsError,
  WeakCryptographyKeyLengthError,
  WeakCryptographySaltLengthError
} from '@domains/cryptography';
import { type IKernelError } from '@libs/kernel';

const pbkdf2Async = promisify(pbkdf2);
const randomBytesAsync = promisify(randomBytes);

export class CryptographyService extends AbstractCryptographyService {
  constructor(configuration: ICryptographyServiceConfiguration) {
    super(configuration);
  }

  public async generateSalt(): Promise<Buffer> {
    const { saltLength } = this.configuration;

    const salt = await randomBytesAsync(saltLength);
    return salt;
  }

  public async hashPassword(password: string, salt: Buffer): Promise<Buffer> {
    const { digest, iterations, keyLength } = this.configuration;

    const hash = await pbkdf2Async(password, salt, iterations, keyLength, digest);
    return hash;
  }

  protected validateConfiguration(configuration: ICryptographyServiceConfiguration): void {
    const { iterations, keyLength, saltLength } = configuration;

    const errors: IKernelError[] = [];

    if (iterations < CRYPTOGRAPHY_RULES.iterations.MIN) {
      errors.push(new WeakCryptographyIterationsError());
    }
    if (keyLength < CRYPTOGRAPHY_RULES.key.MIN_LENGTH) {
      errors.push(new WeakCryptographyKeyLengthError());
    }
    if (saltLength < CRYPTOGRAPHY_RULES.salt.MIN_LENGTH) {
      errors.push(new WeakCryptographySaltLengthError());
    }

    if (errors.length) {
      throw new AggregateCryptographyConfigurationError(errors);
    }
  }

  public async verifyPassword(password: string, salt: Buffer, hashedPassword: Buffer): Promise<boolean> {
    const derivedPassword = await this.hashPassword(password, salt);

    if (derivedPassword.length !== hashedPassword.length) {
      return false;
    }

    const areCredentialsValid = timingSafeEqual(derivedPassword, hashedPassword);
    return areCredentialsValid;
  }
}

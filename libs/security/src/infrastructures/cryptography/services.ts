import { pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import {
  AbstractCryptographyService,
  CRYPTOGRAPHY_RULES,
  type ICryptographyServiceConfiguration,
  WeakCryptographyConfigurationError
} from '@domains/cryptography';

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

  protected validateConfiguration(): void {
    const { iterations, keyLength, saltLength } = this.configuration;

    if (iterations < CRYPTOGRAPHY_RULES.iterations.MIN) {
      throw new WeakCryptographyConfigurationError('iterations', CRYPTOGRAPHY_RULES.iterations.MIN);
    }

    if (keyLength < CRYPTOGRAPHY_RULES.keyLength.MIN) {
      throw new WeakCryptographyConfigurationError('keyLength', CRYPTOGRAPHY_RULES.keyLength.MIN);
    }

    if (saltLength < CRYPTOGRAPHY_RULES.saltLength.MIN) {
      throw new WeakCryptographyConfigurationError('saltLength', CRYPTOGRAPHY_RULES.saltLength.MIN);
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

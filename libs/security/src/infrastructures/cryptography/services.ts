import { pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { AbstractCryptographyService, type ICryptographyServiceConfiguration } from '@domains/cryptography';

const pbkdf2Async = promisify(pbkdf2);
const randomBytesAsync = promisify(randomBytes);

export class CryptographyService extends AbstractCryptographyService {
  constructor(configuration: ICryptographyServiceConfiguration) {
    super(configuration);
  }

  async generateSalt(): Promise<Buffer> {
    const { saltLength } = this.configuration;

    const salt = await randomBytesAsync(saltLength);
    return salt;
  }

  async hashPassword(password: string, salt: Buffer): Promise<Buffer> {
    const { digest, iterations, keyLength } = this.configuration;

    const hash = await pbkdf2Async(password, salt, iterations, keyLength, digest);
    return hash;
  }

  async verifyPassword(password: string, salt: Buffer, hashedPassword: Buffer): Promise<boolean> {
    const derivedPassword = await this.hashPassword(password, salt);

    const areCredentialsValid = timingSafeEqual(derivedPassword, hashedPassword);
    return areCredentialsValid;
  }
}

import { pbkdf2, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { AbstractCryptographyService, type ICryptographyServiceOptions } from '@domains/cryptography';

const pbkdf2Async = promisify(pbkdf2);
const randomBytesAsync = promisify(randomBytes);

export class CryptographyService extends AbstractCryptographyService {
  constructor(options: ICryptographyServiceOptions) {
    super(options);
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

  public async verifyPassword(password: string, salt: Buffer, hashedPassword: Buffer): Promise<boolean> {
    const derivedPassword = await this.hashPassword(password, salt);

    const areCredentialsValid = timingSafeEqual(derivedPassword, hashedPassword);
    return areCredentialsValid;
  }
}

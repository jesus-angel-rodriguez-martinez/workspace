import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  type ICryptographyServiceConfiguration,
  WeakCryptographyConfigurationError
} from '@domains/cryptography';

const generatedSalt = Buffer.alloc(16, 1);
const derivedHash = Buffer.alloc(64, 2);

const pbkdf2Mock = jest.fn(
  (_password, _salt, _iterations, _keyLength, _digest, callback: (error: null, result: Buffer) => void) =>
    callback(null, derivedHash)
);
const randomBytesMock = jest.fn((_size, callback: (error: null, result: Buffer) => void) =>
  callback(null, generatedSalt)
);
const timingSafeEqualMock = jest.fn();

jest.unstable_mockModule('node:crypto', () => ({
  pbkdf2: pbkdf2Mock,
  randomBytes: randomBytesMock,
  timingSafeEqual: timingSafeEqualMock
}));

const { CryptographyService } = await import('@infrastructures/cryptography');

describe('CryptographyService', () => {
  const configuration = {
    digest: 'sha256',
    iterations: 100_000,
    keyLength: 64,
    saltLength: 16
  } satisfies ICryptographyServiceConfiguration;

  const password = 'fake-password';

  let cryptographyService: InstanceType<typeof CryptographyService>;

  beforeEach(() => {
    jest.clearAllMocks();
    cryptographyService = new CryptographyService(configuration);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('throws when the iterations are below the minimum', () => {
      expect(() => new CryptographyService({ ...configuration, iterations: 0 })).toThrow(
        WeakCryptographyConfigurationError
      );
    });

    it('throws when the key length is below the minimum', () => {
      expect(() => new CryptographyService({ ...configuration, keyLength: 0 })).toThrow(
        WeakCryptographyConfigurationError
      );
    });

    it('throws when the salt length is below the minimum', () => {
      expect(() => new CryptographyService({ ...configuration, saltLength: 0 })).toThrow(
        WeakCryptographyConfigurationError
      );
    });
  });

  describe('generateSalt', () => {
    it('requests random bytes of the configured salt length', async () => {
      const salt = await cryptographyService.generateSalt();

      expect(randomBytesMock).toHaveBeenCalledTimes(1);
      expect(randomBytesMock).toHaveBeenCalledWith(configuration.saltLength, expect.any(Function));
      expect(salt).toBe(generatedSalt);
    });
  });

  describe('hashPassword', () => {
    it('derives a key using the configured digest, iterations and key length', async () => {
      const hash = await cryptographyService.hashPassword(password, generatedSalt);

      expect(pbkdf2Mock).toHaveBeenCalledTimes(1);
      expect(pbkdf2Mock).toHaveBeenCalledWith(
        password,
        generatedSalt,
        configuration.iterations,
        configuration.keyLength,
        configuration.digest,
        expect.any(Function)
      );
      expect(hash).toBe(derivedHash);
    });
  });

  describe('verifyPassword', () => {
    it('derives the hash again and compares it against the stored hash in constant time', async () => {
      timingSafeEqualMock.mockReturnValueOnce(true);

      const isValid = await cryptographyService.verifyPassword(password, generatedSalt, derivedHash);

      expect(pbkdf2Mock).toHaveBeenCalledTimes(1);
      expect(timingSafeEqualMock).toHaveBeenCalledTimes(1);
      expect(timingSafeEqualMock).toHaveBeenCalledWith(derivedHash, derivedHash);
      expect(isValid).toBe(true);
    });

    it('returns false when the derived hash does not match the stored hash', async () => {
      const wrongPassword = 'fake-wrong-password';

      timingSafeEqualMock.mockReturnValueOnce(false);

      const isValid = await cryptographyService.verifyPassword(wrongPassword, generatedSalt, derivedHash);

      expect(isValid).toBe(false);
    });

    it('returns false without comparing when the stored hash length differs from the derived hash', async () => {
      const shorterStoredHash = Buffer.alloc(32, 3);

      const isValid = await cryptographyService.verifyPassword(password, generatedSalt, shorterStoredHash);

      expect(isValid).toBe(false);
      expect(timingSafeEqualMock).not.toHaveBeenCalled();
    });
  });
});

import { describe, expect, it } from '@jest/globals';
import { type ICryptographyServiceConfiguration } from '@domains/cryptography';
import { CryptographyService } from '@infrastructures/cryptography';

describe('CryptographyService', () => {
  const password = 'fake-plain-text-password';

  const configuration = {
    digest: 'sha256',
    iterations: 100_000,
    keyLength: 64,
    saltLength: 16
  } satisfies ICryptographyServiceConfiguration;

  const cryptographyService = new CryptographyService(configuration);

  describe('generateSalt', () => {
    it('generates a salt of the configured length', async () => {
      const salt = await cryptographyService.generateSalt();

      expect(salt).toHaveLength(configuration.saltLength);
    });

    it('generates a different salt on each call', async () => {
      const firstSalt = await cryptographyService.generateSalt();
      const secondSalt = await cryptographyService.generateSalt();

      expect(firstSalt).not.toEqual(secondSalt);
    });
  });

  describe('hashPassword', () => {
    it('derives a hash of the configured key length', async () => {
      const salt = await cryptographyService.generateSalt();
      const hash = await cryptographyService.hashPassword(password, salt);

      expect(hash).toHaveLength(configuration.keyLength);
    });

    it('derives the same hash for the same password and salt', async () => {
      const salt = await cryptographyService.generateSalt();

      const firstHash = await cryptographyService.hashPassword(password, salt);
      const secondHash = await cryptographyService.hashPassword(password, salt);

      expect(firstHash).toEqual(secondHash);
    });

    it('derives a different hash for a different salt', async () => {
      const firstSalt = await cryptographyService.generateSalt();
      const firstHash = await cryptographyService.hashPassword(password, firstSalt);

      const secondSalt = await cryptographyService.generateSalt();
      const secondHash = await cryptographyService.hashPassword(password, secondSalt);

      expect(firstHash).not.toEqual(secondHash);
    });
  });

  describe('verifyPassword', () => {
    it('returns true when the password matches the stored hash', async () => {
      const salt = await cryptographyService.generateSalt();
      const hash = await cryptographyService.hashPassword(password, salt);

      const isValid = await cryptographyService.verifyPassword(password, salt, hash);
      expect(isValid).toBe(true);
    });

    it('returns false when the password does not match the stored hash', async () => {
      const wrongPassword = 'fake-wrong-plain-text-password';

      const salt = await cryptographyService.generateSalt();
      const hash = await cryptographyService.hashPassword(password, salt);

      const isValid = await cryptographyService.verifyPassword(wrongPassword, salt, hash);
      expect(isValid).toBe(false);
    });
  });
});

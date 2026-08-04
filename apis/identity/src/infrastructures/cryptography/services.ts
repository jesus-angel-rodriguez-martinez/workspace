import { CryptographyService } from '@libs/security';

export const cryptographyService = new CryptographyService({
  digest: 'sha256',
  iterations: 100_000,
  keyLength: 64,
  saltLength: 16
});

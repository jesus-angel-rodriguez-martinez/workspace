import { type ComposeCryptography } from '@infrastructures/cryptography';
import { CryptographyService } from '@libs/security';

export const composeCryptography: ComposeCryptography = (options) => {
  const cryptographyService = new CryptographyService(options);
  return cryptographyService;
};

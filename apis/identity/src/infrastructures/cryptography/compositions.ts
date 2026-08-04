import { type ComposeCryptography } from '@infrastructures/cryptography';
import { CryptographyService } from '@libs/security';

export const composeCryptography: ComposeCryptography = (configuration) => {
  const cryptographyService = new CryptographyService(configuration);
  return cryptographyService;
};

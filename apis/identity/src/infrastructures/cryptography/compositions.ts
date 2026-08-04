import { CRYPTOGRAPHY_CONFIGURATION } from '@infrastructures/cryptography';
import { CryptographyService } from '@libs/security';

export const composeCryptography = () => {
  const cryptographyService = new CryptographyService(CRYPTOGRAPHY_CONFIGURATION);
  return { cryptographyService };
};

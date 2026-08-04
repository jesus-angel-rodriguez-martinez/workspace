import { type ICryptographyServiceConfiguration } from '@libs/security';

export const CRYPTOGRAPHY_CONFIGURATION = {
  digest: 'sha256',
  iterations: 100_000,
  keyLength: 64,
  saltLength: 16
} as const satisfies ICryptographyServiceConfiguration;

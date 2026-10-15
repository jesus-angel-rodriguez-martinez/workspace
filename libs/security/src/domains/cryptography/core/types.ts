import { type AbstractCryptographyValidator } from '@domains/cryptography';

export interface ICryptographyServiceConfiguration {
  /**
   * The digest algorithm.
   */
  readonly digest: 'sha256';
  /**
   * The number of iterations used by the algorithm.
   */
  readonly iterations: number;
  /**
   * The length in bytes of the derived key.
   */
  readonly keyLength: number;
  /**
   * The length in bytes of the cryptographic salt.
   */
  readonly saltLength: number;
}

export interface ICryptographyServiceOptions {
  /**
   * Cryptography configuration options.
   */
  readonly configuration: ICryptographyServiceConfiguration;
  /**
   * Validates the cryptography configuration.
   */
  readonly cryptographyValidator: AbstractCryptographyValidator;
}

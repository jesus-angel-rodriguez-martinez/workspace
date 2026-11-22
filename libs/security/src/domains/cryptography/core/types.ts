import { type AbstractCryptographyValidator } from '@domains/cryptography';

/**
 * Defines the key derivation settings of the cryptography service.
 */
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

/**
 * Defines the configuration and dependencies required to create the cryptography service.
 */
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

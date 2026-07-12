export interface ICryptographyServiceConfiguration {
  /**
   * The digest algorithm.
   */
  digest: 'sha256';
  /**
   * The number of iterations used by the algorithm.
   */
  iterations: number;
  /**
   * The length in bytes of the derived key.
   */
  keyLength: number;
  /**
   * The length in bytes of the cryptographic salt.
   */
  saltLength: number;
}

import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { type ITokenServiceConfiguration, TokenExpiryError, TokenValidationError } from '@domains/token';
import { TokenService, TokenValidator } from '@infrastructures/token';

describe('TokenService', () => {
  const configuration = {
    algorithm: 'HS256',
    expiresIn: 3_600,
    secret: 'fake-secret-value-used-for-integration-testing',
    type: 'access'
  } satisfies ITokenServiceConfiguration;

  const tokenValidator = new TokenValidator();

  const userId = 'fake-user-id';

  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService({ configuration, tokenValidator });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('issueToken', () => {
    it('returns a token with three segments', () => {
      const token = tokenService.issueToken(userId);

      expect(token.split('.')).toHaveLength(3);
    });
  });

  describe('verifyToken', () => {
    it('returns the decoded token when the token is valid', () => {
      const token = tokenService.issueToken(userId);

      const decodedToken = tokenService.verifyToken(token);

      expect(decodedToken.sub).toBe(userId);
      expect(decodedToken.type).toBe(configuration.type);
      expect(decodedToken.exp - decodedToken.iat).toBe(configuration.expiresIn);
    });

    it('throws a TokenValidationError when the token type differs, even when signed with the same secret', () => {
      const refreshTokenService = new TokenService({
        configuration: { ...configuration, type: 'refresh' },
        tokenValidator
      });

      const refreshToken = refreshTokenService.issueToken(userId);

      expect(() => tokenService.verifyToken(refreshToken)).toThrow(TokenValidationError);
    });

    it('throws a TokenValidationError when the token was signed with a different secret', () => {
      const otherTokenService = new TokenService({
        configuration: { ...configuration, secret: 'another-fake-secret-value-used-for-integration-testing' },
        tokenValidator
      });

      const token = otherTokenService.issueToken(userId);

      expect(() => tokenService.verifyToken(token)).toThrow(TokenValidationError);
    });

    it('throws a TokenExpiryError when the token has expired', () => {
      jest.useFakeTimers({ now: Date.now() });

      const token = tokenService.issueToken(userId);

      jest.setSystemTime(Date.now() + (configuration.expiresIn + 1) * 1_000);

      expect(() => tokenService.verifyToken(token)).toThrow(TokenExpiryError);
    });
  });
});

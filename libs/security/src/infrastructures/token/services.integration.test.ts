import { beforeEach, describe, expect, it } from '@jest/globals';
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

  describe('generateToken', () => {
    it('returns a token with three segments', () => {
      const token = tokenService.generateToken(userId);

      expect(token.split('.')).toHaveLength(3);
    });
  });

  describe('verifyToken', () => {
    it('returns the payload when the token is valid', () => {
      const token = tokenService.generateToken(userId);

      const payload = tokenService.verifyToken(token);

      expect(payload.sub).toBe(userId);
      expect(payload.type).toBe(configuration.type);
      expect(payload.exp - payload.iat).toBe(configuration.expiresIn);
    });

    it('throws a TokenValidationError when the token type differs, even when signed with the same secret', () => {
      const refreshTokenService = new TokenService({
        configuration: { ...configuration, type: 'refresh' },
        tokenValidator
      });

      const refreshToken = refreshTokenService.generateToken(userId);

      expect(() => tokenService.verifyToken(refreshToken)).toThrow(TokenValidationError);
    });

    it('throws a TokenValidationError when the token was signed with a different secret', () => {
      const otherTokenService = new TokenService({
        configuration: { ...configuration, secret: 'another-fake-secret-value-used-for-integration-testing' },
        tokenValidator
      });

      const token = otherTokenService.generateToken(userId);

      expect(() => tokenService.verifyToken(token)).toThrow(TokenValidationError);
    });

    it('throws a TokenExpiryError when the token has expired', () => {
      const expiredTokenService = new TokenService({
        configuration: { ...configuration, expiresIn: -10 },
        tokenValidator
      });

      const token = expiredTokenService.generateToken(userId);

      expect(() => tokenService.verifyToken(token)).toThrow(TokenExpiryError);
    });
  });
});

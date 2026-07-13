import { beforeEach, describe, expect, it } from '@jest/globals';
import { type ITokenServiceConfiguration, TokenExpiryError, TokenValidationError } from '@domains/tokens';
import { TokenService } from '@infrastructures/tokens';

describe('TokenService', () => {
  const configuration = {
    algorithm: 'HS256',
    expiresIn: 3_600,
    secret: 'fake-secret-value-used-for-integration-testing'
  } satisfies ITokenServiceConfiguration;

  const userId = 'fake-user-id';

  let tokenService: TokenService;

  beforeEach(() => {
    tokenService = new TokenService(configuration);
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
      expect(payload.exp - payload.iat).toBe(configuration.expiresIn);
    });

    it('throws a TokenValidationError when the token was signed with a different secret', () => {
      const otherTokenService = new TokenService({
        ...configuration,
        secret: 'another-fake-secret-value-used-for-integration-testing'
      });

      const token = otherTokenService.generateToken(userId);

      expect(() => tokenService.verifyToken(token)).toThrow(TokenValidationError);
    });

    it('throws a TokenExpiryError when the token has expired', () => {
      const expiredTokenService = new TokenService({ ...configuration, expiresIn: -10 });

      const token = expiredTokenService.generateToken(userId);

      expect(() => tokenService.verifyToken(token)).toThrow(TokenExpiryError);
    });
  });
});

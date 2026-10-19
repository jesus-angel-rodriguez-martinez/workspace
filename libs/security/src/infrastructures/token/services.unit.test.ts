import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  AggregateTokenConfigurationError,
  type ITokenServiceConfiguration,
  TokenExpiryError,
  TokenIssuanceError,
  TokenValidationError
} from '@domains/token';

class MockTokenExpiredError extends Error {}

const signMock = jest.fn();
const verifyMock = jest.fn();

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    TokenExpiredError: MockTokenExpiredError,
    sign: signMock,
    verify: verifyMock
  }
}));

const { TokenService, TokenValidator } = await import('@infrastructures/token');

describe('TokenService', () => {
  const configuration = {
    algorithm: 'HS256',
    expiresIn: 3_600,
    secret: 'fake-secret-value-used-for-unit-testing',
    type: 'access'
  } satisfies ITokenServiceConfiguration;

  const tokenValidator = new TokenValidator();

  const token = 'fake.signed.token';
  const userId = 'fake-user-id';

  let tokenService: InstanceType<typeof TokenService>;

  beforeEach(() => {
    jest.clearAllMocks();
    tokenService = new TokenService({ configuration, tokenValidator });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('throws when the expiration is below the minimum seconds', () => {
      const options = { configuration: { ...configuration, expiresIn: 0 }, tokenValidator };

      expect(() => new TokenService(options)).toThrow(AggregateTokenConfigurationError);
    });

    it('throws when the secret is shorter than the minimum length', () => {
      const options = { configuration: { ...configuration, secret: 'fake-short-secret' }, tokenValidator };

      expect(() => new TokenService(options)).toThrow(AggregateTokenConfigurationError);
    });
  });

  describe('issueToken', () => {
    it('signs a token derived from the user id and type with the configured secret and algorithm', () => {
      const milliseconds = 1_000;
      const nowInSeconds = 1_700_000_000;

      jest.spyOn(Date, 'now').mockReturnValueOnce(milliseconds * nowInSeconds);

      signMock.mockImplementationOnce(() => token);

      const issuedToken = tokenService.issueToken(userId);

      expect(signMock).toHaveBeenCalledWith(
        {
          exp: nowInSeconds + configuration.expiresIn,
          iat: nowInSeconds,
          sub: userId,
          type: configuration.type
        },
        configuration.secret,
        { algorithm: configuration.algorithm }
      );
      expect(issuedToken).toBe(token);
    });

    it('throws a TokenIssuanceError when signing fails', () => {
      signMock.mockImplementationOnce(() => {
        throw new Error();
      });

      expect(() => tokenService.issueToken(userId)).toThrow(TokenIssuanceError);
    });
  });

  describe('verifyToken', () => {
    it('returns the decoded token when the token is valid', () => {
      const expectedDecodedToken = {
        exp: 1_700_003_600,
        iat: 1_700_000_000,
        sub: userId,
        type: configuration.type
      };
      verifyMock.mockImplementationOnce(() => expectedDecodedToken);

      const verifiedToken = tokenService.verifyToken(token);

      expect(verifyMock).toHaveBeenCalledWith(token, configuration.secret, {
        algorithms: [configuration.algorithm]
      });
      expect(verifiedToken).toBe(expectedDecodedToken);
    });

    it('throws a TokenExpiryError when the token has expired', () => {
      verifyMock.mockImplementationOnce(() => {
        throw new MockTokenExpiredError();
      });

      expect(() => tokenService.verifyToken(token)).toThrow(TokenExpiryError);
    });

    it('names the configured token type in the TokenExpiryError detail', () => {
      verifyMock.mockImplementationOnce(() => {
        throw new MockTokenExpiredError();
      });

      expect(() => tokenService.verifyToken(token)).toThrow(`The '${configuration.type}' token has expired.`);
    });

    it('throws a TokenValidationError when the token is invalid', () => {
      verifyMock.mockImplementationOnce(() => {
        throw new Error();
      });

      expect(() => tokenService.verifyToken(token)).toThrow(TokenValidationError);
    });

    it('names the configured token type in the TokenValidationError detail', () => {
      verifyMock.mockImplementationOnce(() => {
        throw new Error();
      });

      expect(() => tokenService.verifyToken(token)).toThrow(`The '${configuration.type}' token is invalid.`);
    });

    it('throws a TokenValidationError when the token type differs from the configured type', () => {
      verifyMock.mockImplementationOnce(() => ({
        exp: 1_700_003_600,
        iat: 1_700_000_000,
        sub: userId,
        type: 'refresh'
      }));

      expect(() => tokenService.verifyToken(token)).toThrow(TokenValidationError);
    });

    it('throws a TokenValidationError when the token has no type', () => {
      verifyMock.mockImplementationOnce(() => ({
        exp: 1_700_003_600,
        iat: 1_700_000_000,
        sub: userId
      }));

      expect(() => tokenService.verifyToken(token)).toThrow(TokenValidationError);
    });
  });
});

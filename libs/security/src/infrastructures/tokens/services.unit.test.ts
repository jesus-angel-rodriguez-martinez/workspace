import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  type ITokenServiceConfiguration,
  TokenExpiryError,
  TokenIssuanceError,
  TokenValidationError,
  WeakTokenConfigurationError
} from '@domains/tokens';

class MockTokenExpiredError extends Error {}

const signMock = jest.fn();
const verifyMock = jest.fn();

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: signMock,
    verify: verifyMock,
    TokenExpiredError: MockTokenExpiredError
  }
}));

const { TokenService } = await import('@infrastructures/tokens');

describe('TokenService', () => {
  const configuration = {
    algorithm: 'HS256',
    expiresIn: 3_600,
    secret: 'fake-secret-value-used-for-unit-testing'
  } satisfies ITokenServiceConfiguration;

  const token = 'fake.signed.token';
  const userId = 'fake-user-id';

  let tokenService: InstanceType<typeof TokenService>;

  beforeEach(() => {
    jest.clearAllMocks();
    tokenService = new TokenService(configuration);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('throws when the secret is shorter than the minimum length', () => {
      const secret = 'fake-short-secret';

      expect(() => new TokenService({ ...configuration, secret })).toThrow(WeakTokenConfigurationError);
    });
  });

  describe('generateToken', () => {
    it('signs a payload derived from the user id with the configured secret and algorithm', () => {
      const milliseconds = 1_000;
      const nowInSeconds = 1_700_000_000;

      jest.spyOn(Date, 'now').mockReturnValueOnce(milliseconds * nowInSeconds);

      signMock.mockImplementationOnce(() => token);

      const generatedToken = tokenService.generateToken(userId);

      expect(signMock).toHaveBeenCalledWith(
        {
          exp: nowInSeconds + configuration.expiresIn,
          iat: nowInSeconds,
          sub: userId
        },
        configuration.secret,
        { algorithm: configuration.algorithm }
      );
      expect(generatedToken).toBe(token);
    });

    it('throws a TokenIssuanceError when signing fails', () => {
      signMock.mockImplementationOnce(() => {
        throw new Error();
      });

      expect(() => tokenService.generateToken(userId)).toThrow(TokenIssuanceError);
    });
  });

  describe('verifyToken', () => {
    it('returns the payload when the token is valid', () => {
      const expectedPayload = {
        exp: 1_700_003_600,
        iat: 1_700_000_000,
        sub: userId
      };
      verifyMock.mockImplementationOnce(() => expectedPayload);

      const verifiedToken = tokenService.verifyToken(token);

      expect(verifyMock).toHaveBeenCalledWith(token, configuration.secret, {
        algorithms: [configuration.algorithm]
      });
      expect(verifiedToken).toBe(expectedPayload);
    });

    it('throws a TokenExpiryError when the token has expired', () => {
      verifyMock.mockImplementationOnce(() => {
        throw new MockTokenExpiredError();
      });

      expect(() => tokenService.verifyToken(token)).toThrow(TokenExpiryError);
    });

    it('throws a TokenValidationError when the token is invalid', () => {
      verifyMock.mockImplementationOnce(() => {
        throw new Error();
      });

      expect(() => tokenService.verifyToken(token)).toThrow(TokenValidationError);
    });
  });
});

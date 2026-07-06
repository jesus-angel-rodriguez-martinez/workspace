import dotenv from 'dotenv';
import { join } from 'path';
import { beforeAll, describe, expect, it } from '@jest/globals';
import {
  type ConfigurationValue,
  EmptyConfigurationError,
  InvalidBooleanConfigurationError,
  InvalidNumberConfigurationError,
  MissingConfigurationError,
  UnsupportedPrimitiveError
} from '@domains/configurations';
import { ConfigurationService } from '@infrastructures/configurations';

describe('ConfigurationService', () => {
  beforeAll(() => {
    const filename = '.env.integration.sample';
    const directory = process.cwd();
    const path = join(directory, filename);

    dotenv.config({ override: true, path });
  });

  describe('when environment variables are loaded', () => {
    describe('getAll', () => {
      describe('when configuration values are valid', () => {
        it('returns configuration values correctly parsed from truthy inputs', () => {
          const configurationService = new ConfigurationService();

          expect(
            configurationService.getAll({
              TRUTHY_BOOLEAN: 'boolean',
              TRUTHY_NUMBER: 'number',
              TRUTHY_STRING: 'string'
            })
          ).toEqual({
            TRUTHY_BOOLEAN: true,
            TRUTHY_NUMBER: 1,
            TRUTHY_STRING: 'string'
          });
        });

        it('returns configuration values correctly parsed from falsy inputs', () => {
          const configurationService = new ConfigurationService();

          expect(
            configurationService.getAll({
              FALSY_BOOLEAN: 'boolean',
              FALSY_NUMBER: 'number'
            })
          ).toEqual({
            FALSY_BOOLEAN: false,
            FALSY_NUMBER: 0
          });
        });
      });

      describe('when configuration values are invalid', () => {
        it('throws MissingConfigurationError if a required variable is not defined', () => {
          const configurationService = new ConfigurationService();

          expect(() => configurationService.getAll({ MISSING_KEY: 'string' })).toThrow(
            MissingConfigurationError
          );
        });

        it('throws EmptyConfigurationError if a required variable is empty', () => {
          const configurationService = new ConfigurationService();

          expect(() => configurationService.getAll({ EMPTY_BOOLEAN: 'boolean' })).toThrow(
            EmptyConfigurationError
          );
          expect(() => configurationService.getAll({ EMPTY_NUMBER: 'number' })).toThrow(
            EmptyConfigurationError
          );
          expect(() => configurationService.getAll({ EMPTY_STRING: 'string' })).toThrow(
            EmptyConfigurationError
          );
        });

        it('throws InvalidBooleanConfigurationError if a boolean value is not strictly "true" or "false"', () => {
          const configurationService = new ConfigurationService();

          expect(() => configurationService.getAll({ INVALID_BOOLEAN: 'boolean' })).toThrow(
            InvalidBooleanConfigurationError
          );
        });

        it('throws InvalidNumberConfigurationError if the numeric value is not finite', () => {
          const configurationService = new ConfigurationService();

          expect(() => configurationService.getAll({ NON_FINITE_NUMBER: 'number' })).toThrow(
            InvalidNumberConfigurationError
          );
        });

        it('throws UnsupportedPrimitiveError when the schema declares an unsupported primitive type', () => {
          const configurationService = new ConfigurationService();

          expect(() =>
            configurationService.getAll({
              INVALID_TYPE: '{}' as unknown as ConfigurationValue
            })
          ).toThrow(UnsupportedPrimitiveError);
        });
      });
    });
  });
});

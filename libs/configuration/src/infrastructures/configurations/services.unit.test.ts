import { beforeEach, describe, expect, it } from '@jest/globals';
import {
  EmptyConfigurationError,
  InvalidBooleanConfigurationError,
  InvalidNumberConfigurationError,
  MissingConfigurationError,
  UnsupportedPrimitiveError
} from '@domains/configurations';
import { ConfigurationService } from '@infrastructures/configurations';

describe('ConfigurationService', () => {
  describe('when environment variables are loaded', () => {
    describe('getAll', () => {
      describe('when configuration values are valid', () => {
        beforeEach(() => {
          delete process.env['BOOLEAN'];
          delete process.env['NUMBER'];
          delete process.env['STRING'];
        });

        it('returns configuration values correctly parsed from truthy inputs', () => {
          process.env['BOOLEAN'] = 'true';
          process.env['NUMBER'] = '1';
          process.env['STRING'] = 'abc';

          const configurationService = new ConfigurationService();

          expect(
            configurationService.getAll({
              BOOLEAN: 'boolean',
              NUMBER: 'number',
              STRING: 'string'
            })
          ).toEqual({
            BOOLEAN: true,
            NUMBER: 1,
            STRING: 'abc'
          });
        });

        it('returns configuration values correctly parsed from falsy inputs', () => {
          process.env['BOOLEAN'] = 'false';
          process.env['NUMBER'] = '0';

          const configurationService = new ConfigurationService();

          expect(
            configurationService.getAll({
              BOOLEAN: 'boolean',
              NUMBER: 'number'
            })
          ).toEqual({
            BOOLEAN: false,
            NUMBER: 0
          });
        });
      });

      describe('when configuration values are invalid', () => {
        beforeEach(() => {
          delete process.env['EMPTY_BOOLEAN'];
          delete process.env['EMPTY_NUMBER'];
          delete process.env['EMPTY_STRING'];
          delete process.env['INVALID_BOOLEAN'];
          delete process.env['INVALID_TYPE'];
          delete process.env['NON_FINITE_NUMBER'];
        });

        it('throws MissingConfigurationError if a required variable is not defined', () => {
          const configurationService = new ConfigurationService();

          expect(() => configurationService.getAll({ MISSING_KEY: 'string' })).toThrow(
            MissingConfigurationError
          );
        });

        it('throws EmptyConfigurationError if a required variable is empty', () => {
          process.env['EMPTY_BOOLEAN'] = '';
          process.env['EMPTY_NUMBER'] = '';
          process.env['EMPTY_STRING'] = '';

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
          process.env['INVALID_BOOLEAN'] = 'invalid-boolean';

          const configurationService = new ConfigurationService();

          expect(() => configurationService.getAll({ INVALID_BOOLEAN: 'boolean' })).toThrow(
            InvalidBooleanConfigurationError
          );
        });

        it('throws InvalidNumberConfigurationError if the numeric value is not finite', () => {
          process.env['NON_FINITE_NUMBER'] = 'Infinity';

          const configurationService = new ConfigurationService();

          expect(() => configurationService.getAll({ NON_FINITE_NUMBER: 'number' })).toThrow(
            InvalidNumberConfigurationError
          );
        });

        it('throws UnsupportedPrimitiveError when the schema declares an unsupported primitive type', () => {
          process.env['INVALID_TYPE'] = 'invalid-type';

          const configurationService = new ConfigurationService();

          expect(() =>
            configurationService.getAll({
              INVALID_TYPE: '{}' as any
            })
          ).toThrow(UnsupportedPrimitiveError);
        });
      });
    });
  });
});

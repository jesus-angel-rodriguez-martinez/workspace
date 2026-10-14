import dotenv from 'dotenv';
import { join } from 'path';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { AggregateConfigurationError, type ConfigurationType } from '@domains/configuration';
import { ConfigurationService } from '@infrastructures/configuration';

describe('ConfigurationService', () => {
  beforeAll(() => {
    const fileName = '.env.integration.sample';
    const directory = process.cwd();
    const path = join(directory, fileName);

    dotenv.config({ override: true, path });
  });

  describe('constructor', () => {
    describe('when required is true', () => {
      it('throws an AggregateConfigurationError when a variable is missing', () => {
        expect(() => new ConfigurationService({ MISSING_KEY: { required: true, type: 'string' } })).toThrow(
          AggregateConfigurationError
        );
      });

      it('throws an EmptyConfigurationError when a variable is empty', () => {
        expect(
          () => new ConfigurationService({ EMPTY_BOOLEAN: { required: true, type: 'boolean' } })
        ).toThrow('CONFIGURATION.EMPTY');
        expect(() => new ConfigurationService({ EMPTY_NUMBER: { required: true, type: 'number' } })).toThrow(
          'CONFIGURATION.EMPTY'
        );
        expect(() => new ConfigurationService({ EMPTY_STRING: { required: true, type: 'string' } })).toThrow(
          'CONFIGURATION.EMPTY'
        );
      });

      it('throws an EmptyConfigurationError when a variable contains only whitespace', () => {
        expect(
          () => new ConfigurationService({ WHITESPACE_ONLY: { required: true, type: 'string' } })
        ).toThrow('CONFIGURATION.EMPTY');
      });

      it('throws an InvalidBooleanConfigurationError when a boolean is not strictly "true" or "false"', () => {
        expect(
          () => new ConfigurationService({ INVALID_BOOLEAN: { required: true, type: 'boolean' } })
        ).toThrow('CONFIGURATION.INVALID_BOOLEAN');
      });

      it('throws an InvalidNumberConfigurationError when a number is not finite', () => {
        expect(
          () => new ConfigurationService({ NON_FINITE_NUMBER: { required: true, type: 'number' } })
        ).toThrow('CONFIGURATION.INVALID_NUMBER');
      });

      it('throws an UnsupportedPrimitiveError when the declared primitive type is unsupported', () => {
        expect(
          () =>
            new ConfigurationService({
              INVALID_TYPE: { required: true, type: '{}' as unknown as ConfigurationType }
            })
        ).toThrow('CONFIGURATION.UNSUPPORTED_PRIMITIVE');
      });

      it('collects every error in a single pass', () => {
        let caught: unknown;
        try {
          new ConfigurationService({
            INVALID_BOOLEAN: { required: true, type: 'boolean' },
            MISSING_KEY: { required: true, type: 'string' }
          });
        } catch (error) {
          caught = error;
        }

        expect(caught).toBeInstanceOf(AggregateConfigurationError);
        expect((caught as AggregateConfigurationError).message).toContain('CONFIGURATION.INVALID_BOOLEAN');
        expect((caught as AggregateConfigurationError).message).toContain('CONFIGURATION.MISSING');
      });

      it('parses the configuration once and ignores later environment changes', () => {
        const configurationService = new ConfigurationService({
          TRUTHY_STRING: { required: true, type: 'string' }
        });

        process.env['TRUTHY_STRING'] = 'changed';

        expect(configurationService.get('TRUTHY_STRING')).toBe('string');
        expect(configurationService.getAll()).toEqual({ TRUTHY_STRING: 'string' });

        process.env['TRUTHY_STRING'] = 'string';
      });
    });

    describe('when required is false', () => {
      it('throws an EmptyConfigurationError when a variable is empty', () => {
        expect(() => new ConfigurationService({ EMPTY_STRING: { required: false, type: 'string' } })).toThrow(
          'CONFIGURATION.EMPTY'
        );
      });
    });
  });

  describe('getAll', () => {
    describe('when required is true', () => {
      it('returns every value parsed to its native type', () => {
        const configurationService = new ConfigurationService({
          TRUTHY_BOOLEAN: { required: true, type: 'boolean' },
          TRUTHY_NUMBER: { required: true, type: 'number' },
          TRUTHY_STRING: { required: true, type: 'string' }
        });

        expect(configurationService.getAll()).toEqual({
          TRUTHY_BOOLEAN: true,
          TRUTHY_NUMBER: 1,
          TRUTHY_STRING: 'string'
        });
      });

      it('returns falsy values parsed to their native type', () => {
        const configurationService = new ConfigurationService({
          FALSY_BOOLEAN: { required: true, type: 'boolean' },
          FALSY_NUMBER: { required: true, type: 'number' }
        });

        expect(configurationService.getAll()).toEqual({
          FALSY_BOOLEAN: false,
          FALSY_NUMBER: 0
        });
      });

      it('trims surrounding whitespace before parsing', () => {
        const configurationService = new ConfigurationService({
          WHITESPACE_NUMBER: { required: true, type: 'number' },
          WHITESPACE_STRING: { required: true, type: 'string' }
        });

        expect(configurationService.getAll()).toEqual({
          WHITESPACE_NUMBER: 1,
          WHITESPACE_STRING: 'string'
        });
      });
    });

    describe('when required is false', () => {
      it('returns undefined when a variable is missing', () => {
        const configurationService = new ConfigurationService({
          MISSING_KEY: { required: false, type: 'string' }
        });

        expect(configurationService.getAll()).toEqual({ MISSING_KEY: undefined });
      });

      it('returns a value parsed to its native type when a variable is defined', () => {
        const configurationService = new ConfigurationService({
          TRUTHY_NUMBER: { required: false, type: 'number' }
        });

        expect(configurationService.getAll()).toEqual({ TRUTHY_NUMBER: 1 });
      });
    });
  });

  describe('get', () => {
    describe('when required is true', () => {
      it('returns a single parsed value', () => {
        const configurationService = new ConfigurationService({
          TRUTHY_BOOLEAN: { required: true, type: 'boolean' },
          TRUTHY_NUMBER: { required: true, type: 'number' },
          TRUTHY_STRING: { required: true, type: 'string' }
        });

        expect(configurationService.get('TRUTHY_BOOLEAN')).toBe(true);
        expect(configurationService.get('TRUTHY_NUMBER')).toBe(1);
        expect(configurationService.get('TRUTHY_STRING')).toBe('string');
      });
    });

    describe('when required is false', () => {
      it('returns undefined when a variable is missing', () => {
        const configurationService = new ConfigurationService({
          MISSING_KEY: { required: false, type: 'string' }
        });

        expect(configurationService.get('MISSING_KEY')).toBeUndefined();
      });
    });
  });
});

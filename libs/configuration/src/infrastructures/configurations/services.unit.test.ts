import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { AggregateConfigurationError, type ConfigurationValue } from '@domains/configurations';
import { ConfigurationService } from '@infrastructures/configurations';

describe('ConfigurationService', () => {
  const keys = [
    'BOOLEAN',
    'INVALID_BOOLEAN',
    'INVALID_TYPE',
    'MISSING_KEY',
    'NON_FINITE_NUMBER',
    'NUMBER',
    'STRING'
  ];

  beforeEach(() => {
    keys.forEach((key) => delete process.env[key]);
  });

  afterEach(() => {
    keys.forEach((key) => delete process.env[key]);
  });

  describe('constructor', () => {
    it('throws an AggregateConfigurationError when a variable is missing', () => {
      expect(() => new ConfigurationService({ MISSING_KEY: 'string' })).toThrow(AggregateConfigurationError);
    });

    it('throws an EmptyConfigurationError when a required variable is empty', () => {
      process.env['BOOLEAN'] = '';
      process.env['NUMBER'] = '';
      process.env['STRING'] = '';

      expect(() => new ConfigurationService({ BOOLEAN: 'boolean' })).toThrow('CONFIGURATION.EMPTY');
      expect(() => new ConfigurationService({ NUMBER: 'number' })).toThrow('CONFIGURATION.EMPTY');
      expect(() => new ConfigurationService({ STRING: 'string' })).toThrow('CONFIGURATION.EMPTY');
    });

    it('throws an EmptyConfigurationError when a variable contains only whitespace', () => {
      process.env['STRING'] = ' ';

      expect(() => new ConfigurationService({ STRING: 'string' })).toThrow('CONFIGURATION.EMPTY');
    });

    it('throws an InvalidBooleanConfigurationError when a boolean is not strictly "true" or "false"', () => {
      process.env['INVALID_BOOLEAN'] = 'invalid-boolean';

      expect(() => new ConfigurationService({ INVALID_BOOLEAN: 'boolean' })).toThrow(
        'CONFIGURATION.INVALID_BOOLEAN'
      );
    });

    it('throws an InvalidNumberConfigurationError when a number is not finite', () => {
      process.env['NON_FINITE_NUMBER'] = 'Infinity';

      expect(() => new ConfigurationService({ NON_FINITE_NUMBER: 'number' })).toThrow(
        'CONFIGURATION.INVALID_NUMBER'
      );
    });

    it('throws an UnsupportedPrimitiveError when the declared primitive type is unsupported', () => {
      process.env['INVALID_TYPE'] = 'invalid-type';

      expect(
        () =>
          new ConfigurationService({
            INVALID_TYPE: '{}' as unknown as ConfigurationValue
          })
      ).toThrow('CONFIGURATION.UNSUPPORTED_PRIMITIVE');
    });

    it('collects every error in a single pass', () => {
      process.env['INVALID_BOOLEAN'] = 'invalid-boolean';

      let caught: unknown;
      try {
        new ConfigurationService({
          INVALID_BOOLEAN: 'boolean',
          MISSING_KEY: 'string'
        });
      } catch (error) {
        caught = error;
      }

      expect(caught).toBeInstanceOf(AggregateConfigurationError);
      expect((caught as AggregateConfigurationError).message).toContain('CONFIGURATION.INVALID_BOOLEAN');
      expect((caught as AggregateConfigurationError).message).toContain('CONFIGURATION.MISSING');
    });

    it('parses the configuration once and ignores later environment changes', () => {
      process.env['STRING'] = 'initial';

      const configurationService = new ConfigurationService({ STRING: 'string' });

      process.env['STRING'] = 'changed';

      expect(configurationService.get('STRING')).toBe('initial');
      expect(configurationService.getAll()).toEqual({ STRING: 'initial' });
    });
  });

  describe('getAll', () => {
    it('returns every value parsed to its native type', () => {
      process.env['BOOLEAN'] = 'true';
      process.env['NUMBER'] = '1';
      process.env['STRING'] = 'abc';

      const configurationService = new ConfigurationService({
        BOOLEAN: 'boolean',
        NUMBER: 'number',
        STRING: 'string'
      });

      expect(configurationService.getAll()).toEqual({
        BOOLEAN: true,
        NUMBER: 1,
        STRING: 'abc'
      });
    });

    it('returns falsy values parsed to their native type', () => {
      process.env['BOOLEAN'] = 'false';
      process.env['NUMBER'] = '0';

      const configurationService = new ConfigurationService({
        BOOLEAN: 'boolean',
        NUMBER: 'number'
      });

      expect(configurationService.getAll()).toEqual({
        BOOLEAN: false,
        NUMBER: 0
      });
    });

    it('trims surrounding whitespace before parsing', () => {
      process.env['NUMBER'] = ' 1 ';
      process.env['STRING'] = ' abc ';

      const configurationService = new ConfigurationService({
        NUMBER: 'number',
        STRING: 'string'
      });

      expect(configurationService.getAll()).toEqual({
        NUMBER: 1,
        STRING: 'abc'
      });
    });
  });

  describe('get', () => {
    it('returns a single parsed value', () => {
      process.env['BOOLEAN'] = 'true';
      process.env['NUMBER'] = '1';
      process.env['STRING'] = 'abc';

      const configurationService = new ConfigurationService({
        BOOLEAN: 'boolean',
        NUMBER: 'number',
        STRING: 'string'
      });

      expect(configurationService.get('BOOLEAN')).toBe(true);
      expect(configurationService.get('NUMBER')).toBe(1);
      expect(configurationService.get('STRING')).toBe('abc');
    });
  });
});

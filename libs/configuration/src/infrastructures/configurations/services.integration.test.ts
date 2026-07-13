import dotenv from 'dotenv';
import { join } from 'path';
import { beforeAll, describe, expect, it } from '@jest/globals';
import { AggregateConfigurationError, type ConfigurationValue } from '@domains/configurations';
import { ConfigurationService } from '@infrastructures/configurations';

describe('ConfigurationService', () => {
  beforeAll(() => {
    const filename = '.env.integration.sample';
    const directory = process.cwd();
    const path = join(directory, filename);

    dotenv.config({ override: true, path });
  });

  describe('constructor', () => {
    it('throws an AggregateConfigurationError when a variable is missing', () => {
      expect(() => new ConfigurationService({ MISSING_KEY: 'string' })).toThrow(AggregateConfigurationError);
    });

    it('throws an EmptyConfigurationError when a required variable is empty', () => {
      expect(() => new ConfigurationService({ EMPTY_BOOLEAN: 'boolean' })).toThrow('CONFIGURATION.EMPTY');
      expect(() => new ConfigurationService({ EMPTY_NUMBER: 'number' })).toThrow('CONFIGURATION.EMPTY');
      expect(() => new ConfigurationService({ EMPTY_STRING: 'string' })).toThrow('CONFIGURATION.EMPTY');
    });

    it('throws an EmptyConfigurationError when a variable contains only whitespace', () => {
      expect(() => new ConfigurationService({ WHITESPACE_ONLY: 'string' })).toThrow('CONFIGURATION.EMPTY');
    });

    it('throws an InvalidBooleanConfigurationError when a boolean is not strictly "true" or "false"', () => {
      expect(() => new ConfigurationService({ INVALID_BOOLEAN: 'boolean' })).toThrow(
        'CONFIGURATION.INVALID_BOOLEAN'
      );
    });

    it('throws an InvalidNumberConfigurationError when a number is not finite', () => {
      expect(() => new ConfigurationService({ NON_FINITE_NUMBER: 'number' })).toThrow(
        'CONFIGURATION.INVALID_NUMBER'
      );
    });

    it('throws an UnsupportedPrimitiveError when the declared primitive type is unsupported', () => {
      expect(
        () =>
          new ConfigurationService({
            INVALID_TYPE: '{}' as unknown as ConfigurationValue
          })
      ).toThrow('CONFIGURATION.UNSUPPORTED_PRIMITIVE');
    });

    it('collects every error in a single pass', () => {
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
      const configurationService = new ConfigurationService({ TRUTHY_STRING: 'string' });

      process.env['TRUTHY_STRING'] = 'changed';

      expect(configurationService.get('TRUTHY_STRING')).toBe('string');
      expect(configurationService.getAll()).toEqual({ TRUTHY_STRING: 'string' });

      process.env['TRUTHY_STRING'] = 'string';
    });
  });

  describe('getAll', () => {
    it('returns every value parsed to its native type', () => {
      const configurationService = new ConfigurationService({
        TRUTHY_BOOLEAN: 'boolean',
        TRUTHY_NUMBER: 'number',
        TRUTHY_STRING: 'string'
      });

      expect(configurationService.getAll()).toEqual({
        TRUTHY_BOOLEAN: true,
        TRUTHY_NUMBER: 1,
        TRUTHY_STRING: 'string'
      });
    });

    it('returns falsy values parsed to their native type', () => {
      const configurationService = new ConfigurationService({
        FALSY_BOOLEAN: 'boolean',
        FALSY_NUMBER: 'number'
      });

      expect(configurationService.getAll()).toEqual({
        FALSY_BOOLEAN: false,
        FALSY_NUMBER: 0
      });
    });

    it('trims surrounding whitespace before parsing', () => {
      const configurationService = new ConfigurationService({
        WHITESPACE_NUMBER: 'number',
        WHITESPACE_STRING: 'string'
      });

      expect(configurationService.getAll()).toEqual({
        WHITESPACE_NUMBER: 1,
        WHITESPACE_STRING: 'string'
      });
    });
  });

  describe('get', () => {
    it('returns a single parsed value', () => {
      const configurationService = new ConfigurationService({
        TRUTHY_BOOLEAN: 'boolean',
        TRUTHY_NUMBER: 'number',
        TRUTHY_STRING: 'string'
      });

      expect(configurationService.get('TRUTHY_BOOLEAN')).toBe(true);
      expect(configurationService.get('TRUTHY_NUMBER')).toBe(1);
      expect(configurationService.get('TRUTHY_STRING')).toBe('string');
    });
  });
});

import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { type LoggerOptions } from 'pino';
import {
  type AbstractLoggerService,
  LoggerAlreadyInitializedError,
  type LoggerLevel,
  LoggerNotInitializedError
} from '@domains/logger';

const traceMock = jest.fn();
const debugMock = jest.fn();
const infoMock = jest.fn();
const warnMock = jest.fn();
const errorMock = jest.fn();
const fatalMock = jest.fn();

const defaultMock = jest.fn<(options: LoggerOptions) => unknown>(() => ({
  trace: traceMock,
  debug: debugMock,
  info: infoMock,
  warn: warnMock,
  error: errorMock,
  fatal: fatalMock
}));

const stdTimeFunctionsMock = jest.fn();
jest.unstable_mockModule('pino', () => ({
  default: defaultMock,
  stdTimeFunctions: stdTimeFunctionsMock
}));

type CriticalLevel = Extract<LoggerLevel, 'warn' | 'error' | 'fatal'>;

type DiagnosticLevel = Extract<LoggerLevel, 'trace' | 'debug' | 'info'>;

const criticalLevels = ['warn', 'error', 'fatal'] satisfies CriticalLevel[];

const criticalLevelMocks = {
  warn: warnMock,
  error: errorMock,
  fatal: fatalMock
} satisfies Record<CriticalLevel, jest.Mock>;

const diagnosticLevels = ['trace', 'debug', 'info'] satisfies DiagnosticLevel[];

const diagnosticLevelMocks = {
  trace: traceMock,
  debug: debugMock,
  info: infoMock
} satisfies Record<DiagnosticLevel, jest.Mock>;

const { LoggerService } = await import('@infrastructures/logger');

describe('LoggerService', () => {
  beforeEach(() => {
    LoggerService.close();

    LoggerService.init({
      level: 'trace',
      name: '@libs/logger',
      prettify: false
    });

    jest.clearAllMocks();
  });

  describe('init', () => {
    it('throws LoggerNotInitializedError when a logger is created before initialization', () => {
      LoggerService.close();

      expect(() => new LoggerService()).toThrow(LoggerNotInitializedError);
    });

    it('throws LoggerAlreadyInitializedError when initialized twice', () => {
      expect(() =>
        LoggerService.init({
          level: 'trace',
          name: '@libs/logger',
          prettify: false
        })
      ).toThrow(LoggerAlreadyInitializedError);
    });

    it('configures the pino-pretty transport when prettify is enabled', () => {
      LoggerService.close();

      LoggerService.init({
        level: 'trace',
        name: '@libs/logger',
        prettify: true
      });

      expect(defaultMock).toHaveBeenCalledWith(
        expect.objectContaining({
          transport: {
            options: {
              translateTime: 'yyyy-mm-dd HH:MM:ss'
            },
            target: 'pino-pretty'
          }
        })
      );
    });
  });

  describe('close', () => {
    it('resets the logger so it can be initialized again', () => {
      LoggerService.close();

      expect(() =>
        LoggerService.init({
          level: 'trace',
          name: '@libs/logger',
          prettify: false
        })
      ).not.toThrow();
    });
  });

  describe('logging', () => {
    let loggerService: AbstractLoggerService;

    beforeEach(() => {
      loggerService = new LoggerService();
    });

    it('throws LoggerNotInitializedError when logging after close', () => {
      LoggerService.close();

      expect(() => loggerService.info('message')).toThrow(LoggerNotInitializedError);
    });

    describe('critical levels', () => {
      criticalLevels.forEach((level) => {
        const message = `logging ${level}`;
        const mock = criticalLevelMocks[level];

        it(`calls "${level}" without context and verifies the formatted log is correct`, () => {
          loggerService[level](message);

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({}, `logging ${level}`);
        });

        it(`calls "${level}" with data context and verifies the formatted log is correct`, () => {
          const context = { id: 1 };

          loggerService[level](message, context);

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({ id: 1 }, `logging ${level}`);
        });

        it(`calls "${level}" with error context and verifies the formatted log is correct`, () => {
          const error = new Error(message);

          loggerService[level](message, { error });

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({ error }, `logging ${level}`);
        });
      });
    });

    describe('diagnostic levels', () => {
      diagnosticLevels.forEach((level) => {
        const message = `logging ${level}`;
        const mock = diagnosticLevelMocks[level];

        it(`calls "${level}" without context and verifies the formatted log is correct`, () => {
          loggerService[level](message);

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({}, `logging ${level}`);
        });

        it(`calls "${level}" with data context and verifies the formatted log is correct`, () => {
          const context = { id: 1 };

          loggerService[level](message, context);

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({ id: 1 }, `logging ${level}`);
        });

        it(`calls "${level}" with error context and verifies the formatted log is correct`, () => {
          const error = new Error(message);

          loggerService[level](message, { error });

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({ error }, `logging ${level}`);
        });
      });
    });
  });
});

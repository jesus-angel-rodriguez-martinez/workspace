import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  AbstractLoggerService,
  LoggerAlreadyInitializedError,
  type LoggerLevel,
  LoggerNotInitializedError
} from '@domains/loggers';

const traceMock = jest.fn();
const debugMock = jest.fn();
const infoMock = jest.fn();
const warnMock = jest.fn();
const errorMock = jest.fn();
const fatalMock = jest.fn();

const childMock = jest.fn(() => ({
  trace: traceMock,
  debug: debugMock,
  info: infoMock,
  warn: warnMock,
  error: errorMock,
  fatal: fatalMock
}));

const flushMock = jest.fn((callback?: () => void) => callback?.());

const defaultMock = jest.fn(() => ({
  trace: traceMock,
  debug: debugMock,
  info: infoMock,
  warn: warnMock,
  error: errorMock,
  fatal: fatalMock,
  child: childMock,
  flush: flushMock
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

const { LoggerService } = await import('@infrastructures/loggers');

describe('LoggerService', () => {
  const loggerName = import.meta.url;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when not initialized', () => {
    it('throws LoggerNotInitializedError', () => {
      expect(
        () =>
          new LoggerService({
            loggerName
          })
      ).toThrow(LoggerNotInitializedError);
    });
  });

  describe('when initialized', () => {
    let loggerService: AbstractLoggerService;

    beforeAll(() => {
      LoggerService.init({
        level: 'trace',
        applicationName: '@libs/logger',
        prettify: true
      });
    });

    beforeEach(() => {
      loggerService = new LoggerService({
        loggerName
      });
    });

    it('throws LoggerAlreadyInitializedError if the service has already been initialized', () => {
      expect(() =>
        LoggerService.init({
          level: 'trace',
          applicationName: '@libs/logger',
          prettify: false
        })
      ).toThrow(LoggerAlreadyInitializedError);
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

  describe('close', () => {
    it('flushes and resets the logger so it can be initialized again', async () => {
      await LoggerService.close();

      expect(flushMock).toHaveBeenCalledTimes(1);
      expect(() =>
        LoggerService.init({
          level: 'trace',
          applicationName: '@libs/logger',
          prettify: false
        })
      ).not.toThrow();
    });
  });
});

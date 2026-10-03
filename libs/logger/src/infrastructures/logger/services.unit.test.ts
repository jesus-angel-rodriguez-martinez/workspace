import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  type AbstractLoggerService,
  type CriticalLoggerLevel,
  type DiagnosticLoggerLevel,
  type ILoggerServiceInitConfiguration,
  LoggerAlreadyInitializedError,
  LoggerNotInitializedError
} from '@domains/logger';
import { type LoggerOptions } from 'pino';

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

const diagnosticLoggerLevels = ['trace', 'debug', 'info'] satisfies DiagnosticLoggerLevel[];
const diagnosticLevelMocks = {
  trace: traceMock,
  debug: debugMock,
  info: infoMock
} satisfies Record<DiagnosticLoggerLevel, jest.Mock>;

const criticalLoggerLevels = ['warn', 'error', 'fatal'] satisfies CriticalLoggerLevel[];
const criticalLevelMocks = {
  warn: warnMock,
  error: errorMock,
  fatal: fatalMock
} satisfies Record<CriticalLoggerLevel, jest.Mock>;

const stdTimeFunctionsMock = jest.fn();
jest.unstable_mockModule('pino', () => ({
  default: defaultMock,
  stdTimeFunctions: stdTimeFunctionsMock
}));

const configuration: ILoggerServiceInitConfiguration = {
  level: 'trace',
  name: '@libs/logger',
  prettify: false
};

const { LoggerService } = await import('@infrastructures/logger');

describe('LoggerService', () => {
  describe('when not initialized', () => {
    beforeEach(() => {
      LoggerService.close();

      jest.clearAllMocks();
    });

    it('throws LoggerNotInitializedError when a logger is instantiated', () => {
      expect(() => new LoggerService()).toThrow(LoggerNotInitializedError);
    });

    it('initializes the logger without throwing', () => {
      expect(() => LoggerService.init(configuration)).not.toThrow();
    });
  });

  describe('when initialized', () => {
    let loggerService: AbstractLoggerService;

    beforeEach(() => {
      LoggerService.close();
      LoggerService.init(configuration);

      loggerService = new LoggerService();

      jest.clearAllMocks();
    });

    it('throws LoggerAlreadyInitializedError when init is called again', () => {
      expect(() => LoggerService.init(configuration)).toThrow(LoggerAlreadyInitializedError);
    });

    it('throws LoggerNotInitializedError when logging after the logger is closed', () => {
      LoggerService.close();

      expect(() => loggerService.info('message')).toThrow(LoggerNotInitializedError);
    });

    describe('diagnostic levels', () => {
      diagnosticLoggerLevels.forEach((level) => {
        const message = `logging ${level}`;
        const mock = diagnosticLevelMocks[level];

        it(`logs a "${level}" message with an empty context when none is provided`, () => {
          loggerService[level](message);

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({}, `logging ${level}`);
        });

        it(`logs a "${level}" message with the provided data context`, () => {
          const context = { id: 1 };

          loggerService[level](message, context);

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({ id: 1 }, `logging ${level}`);
        });

        it(`logs a "${level}" message with the provided error context`, () => {
          const error = new Error(message);

          loggerService[level](message, { error });

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({ error }, `logging ${level}`);
        });
      });
    });

    describe('critical levels', () => {
      criticalLoggerLevels.forEach((level) => {
        const message = `logging ${level}`;
        const mock = criticalLevelMocks[level];

        it(`logs a "${level}" message with an empty context when none is provided`, () => {
          loggerService[level](message);

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({}, `logging ${level}`);
        });

        it(`logs a "${level}" message with the provided data context`, () => {
          const context = { id: 1 };

          loggerService[level](message, context);

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({ id: 1 }, `logging ${level}`);
        });

        it(`logs a "${level}" message with the provided error context`, () => {
          const error = new Error(message);

          loggerService[level](message, { error });

          expect(mock).toHaveBeenCalledTimes(1);
          expect(mock).toHaveBeenCalledWith({ error }, `logging ${level}`);
        });
      });
    });
  });
});

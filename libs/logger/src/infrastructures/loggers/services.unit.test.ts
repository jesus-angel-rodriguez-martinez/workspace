import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  type AbstractLoggerService,
  LoggerAlreadyInitializedError,
  type LoggerLevel,
  LoggerNotInitializedError
} from '@domains/loggers';
import { type Bindings } from 'pino';

const traceMock = jest.fn();
const debugMock = jest.fn();
const infoMock = jest.fn();
const warnMock = jest.fn();
const errorMock = jest.fn();
const fatalMock = jest.fn();

const childMock = jest.fn((_bindings: Bindings) => ({
  trace: traceMock,
  debug: debugMock,
  info: infoMock,
  warn: warnMock,
  error: errorMock,
  fatal: fatalMock
}));

const flushMock = jest.fn((callback: Function) => callback());

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

  beforeEach(async () => {
    await LoggerService.close();

    LoggerService.init({
      level: 'trace',
      applicationName: '@libs/logger',
      prettify: false
    });

    jest.clearAllMocks();
  });

  describe('init', () => {
    it('throws LoggerNotInitializedError when a logger is created before initialization', async () => {
      await LoggerService.close();

      expect(() => new LoggerService({ loggerName })).toThrow(LoggerNotInitializedError);
    });

    it('throws LoggerAlreadyInitializedError when initialized twice', () => {
      expect(() =>
        LoggerService.init({
          level: 'trace',
          applicationName: '@libs/logger',
          prettify: false
        })
      ).toThrow(LoggerAlreadyInitializedError);
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

  describe('logging', () => {
    let loggerService: AbstractLoggerService;

    beforeEach(() => {
      loggerService = new LoggerService({
        loggerName
      });
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

  describe('formatLoggerName', () => {
    it('reduces a src "file:" URL to a package-scoped feature path', () => {
      new LoggerService({
        loggerName: 'file:///workspace/libs/logger/src/infrastructures/loggers/services.ts'
      });

      expect(childMock).toHaveBeenCalledWith({ logger: '@libs/logger/infrastructures/loggers' });
    });

    it('reduces a dist "file:" URL to the same package-scoped feature path', () => {
      new LoggerService({
        loggerName: 'file:///workspace/libs/logger/dist/infrastructures/loggers/services.js'
      });

      expect(childMock).toHaveBeenCalledWith({ logger: '@libs/logger/infrastructures/loggers' });
    });

    it('reduces an "index" file at the package root to the bare package name', () => {
      new LoggerService({ loggerName: 'file:///workspace/libs/logger/src/index.ts' });

      expect(childMock).toHaveBeenCalledWith({ logger: '@libs/logger' });
    });

    it('drops a nested "index" file, keeping the feature path', () => {
      new LoggerService({ loggerName: 'file:///workspace/libs/logger/src/domains/loggers/core/index.ts' });

      expect(childMock).toHaveBeenCalledWith({ logger: '@libs/logger/domains/loggers/core' });
    });

    it('keeps the file name for a non-index file at the package root', () => {
      new LoggerService({ loggerName: 'file:///workspace/libs/logger/src/bootstrap.ts' });

      expect(childMock).toHaveBeenCalledWith({ logger: '@libs/logger/bootstrap' });
    });

    it('resolves a dist file even when an ancestor directory is named "src"', () => {
      new LoggerService({
        loggerName: 'file:///src/workspace/libs/logger/dist/infrastructures/loggers/services.js'
      });

      expect(childMock).toHaveBeenCalledWith({ logger: '@libs/logger/infrastructures/loggers' });
    });

    it('uses an explicit logical name verbatim', () => {
      new LoggerService({ loggerName: 'loggers' });

      expect(childMock).toHaveBeenCalledWith({ logger: 'loggers' });
    });

    it('falls back to the original value when the "file:" URL cannot be reduced', () => {
      const unresolvable = 'file:///scratch/services.ts';

      new LoggerService({ loggerName: unresolvable });

      expect(childMock).toHaveBeenCalledWith({ logger: unresolvable });
    });
  });
});

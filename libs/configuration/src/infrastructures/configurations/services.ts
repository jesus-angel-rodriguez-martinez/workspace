import {
  AbstractConfigurationService,
  AggregateConfigurationError,
  type Configuration,
  type ConfigurationKey,
  EmptyConfigurationError,
  InvalidBooleanConfigurationError,
  InvalidNumberConfigurationError,
  MissingConfigurationError,
  type ResolvedConfiguration,
  UnsupportedPrimitiveError
} from '@domains/configurations';
import { CoreError, type ICoreError } from '@libs/core';

export class ConfigurationService<C extends Configuration> extends AbstractConfigurationService<C> {
  public constructor(configuration: C) {
    super(configuration);
  }

  protected parseAll(configuration: C): ResolvedConfiguration<C> {
    const entries = Object.entries(configuration);
    const errors: ICoreError[] = [];

    const result = entries.reduce((previous, [key, type]) => {
      try {
        return {
          ...previous,
          [key]: this.parseOne(key, type)
        };
      } catch (error) {
        if (error instanceof CoreError) {
          errors.push(error);
          return previous;
        }
        throw error;
      }
    }, {} as ResolvedConfiguration<C>);

    if (errors.length) {
      throw new AggregateConfigurationError(errors);
    }

    return result;
  }

  protected parseBoolean(key: string, rawValue: string): boolean {
    const value = this.parseString(key, rawValue);
    if (value !== 'false' && value !== 'true') {
      throw new InvalidBooleanConfigurationError(key);
    }
    return value === 'true';
  }

  protected parseNumber(key: string, rawValue: string): number {
    const value = this.parseString(key, rawValue);
    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue)) {
      throw new InvalidNumberConfigurationError(key);
    }
    return parsedValue;
  }

  protected parseOne<T extends Configuration, K extends ConfigurationKey<T>>(
    key: K,
    type: T[K]
  ): ResolvedConfiguration<T>[K] {
    const rawValue = process.env[key];
    if (rawValue === undefined) {
      throw new MissingConfigurationError(key);
    }

    let parsedValue: boolean | number | string;
    switch (type) {
      case 'boolean':
        parsedValue = this.parseBoolean(key, rawValue);
        break;
      case 'number':
        parsedValue = this.parseNumber(key, rawValue);
        break;
      case 'string':
        parsedValue = this.parseString(key, rawValue);
        break;
      default: {
        const exhaustiveCheck: never = type;
        throw new UnsupportedPrimitiveError(key, exhaustiveCheck);
      }
    }

    return parsedValue as ResolvedConfiguration<T>[K];
  }

  protected parseString(key: string, rawValue: string): string {
    const value = rawValue.trim();
    if (!value) {
      throw new EmptyConfigurationError(key);
    }
    return value;
  }
}

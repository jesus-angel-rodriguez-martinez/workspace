import {
  AbstractConfigurationService,
  type ConfigurationKey,
  type ConfigurationSchema,
  EmptyConfigurationError,
  InvalidBooleanConfigurationError,
  InvalidNumberConfigurationError,
  MissingConfigurationError,
  type ResolvedConfigurationSchema,
  UnsupportedPrimitiveError
} from '@domains/configurations';

export class ConfigurationService extends AbstractConfigurationService {
  public constructor() {
    super();
  }

  protected parseBoolean(key: string, value: string): boolean {
    if (!value) {
      throw new EmptyConfigurationError(key);
    }
    if (value !== 'false' && value !== 'true') {
      throw new InvalidBooleanConfigurationError(key, value);
    }
    return value === 'true';
  }

  protected parseNumber(key: string, value: string): number {
    if (!value) {
      throw new EmptyConfigurationError(key);
    }
    const parsedValue = Number(value);
    if (!Number.isFinite(parsedValue)) {
      throw new InvalidNumberConfigurationError(key, value);
    }
    return parsedValue;
  }

  protected parseString(key: string, value: string): string {
    if (!value) {
      throw new EmptyConfigurationError(key);
    }
    return value;
  }

  protected get<S extends ConfigurationSchema, K extends ConfigurationKey<S>>(
    key: K,
    value: S[K]
  ): ResolvedConfigurationSchema<S>[K] {
    const rawValue = process.env[key];
    if (rawValue === undefined) {
      throw new MissingConfigurationError(key);
    }
    const formattedValue = rawValue.trim();

    let parsedValue: boolean | number | string;
    switch (value) {
      case 'boolean':
        parsedValue = this.parseBoolean(key, formattedValue);
        break;
      case 'number':
        parsedValue = this.parseNumber(key, formattedValue);
        break;
      case 'string':
        parsedValue = this.parseString(key, formattedValue);
        break;
      default: {
        const exhaustiveCheck: never = value;
        throw new UnsupportedPrimitiveError(key, exhaustiveCheck);
      }
    }

    return parsedValue as ResolvedConfigurationSchema<S>[K];
  }

  public getAll<S extends ConfigurationSchema>(schema: S): ResolvedConfigurationSchema<S> {
    const entries = Object.entries(schema);

    const result = entries.reduce((previous, current) => {
      const [key, value] = current;

      return {
        ...previous,
        [key]: this.get(key, value)
      };
    }, {} as ResolvedConfigurationSchema<S>);

    return result;
  }
}

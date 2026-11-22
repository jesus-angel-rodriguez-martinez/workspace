import {
  AbstractConfigurationService,
  AggregateConfigurationError,
  type Configuration,
  EmptyConfigurationError,
  type IConfigurationValue,
  InvalidBooleanConfigurationError,
  InvalidNumberConfigurationError,
  MissingConfigurationError,
  type ResolvedConfiguration,
  UnsupportedPrimitiveError
} from '@domains/configuration';
import { type IKernelError } from '@libs/kernel';
import * as z from 'zod';

export class ConfigurationService<C extends Configuration> extends AbstractConfigurationService<C> {
  public constructor(configuration: C) {
    super(configuration);
  }

  protected parseAll(configuration: C): ResolvedConfiguration<C> {
    const errors: IKernelError[] = [];
    const shape: Record<string, z.ZodType> = {};

    Object.entries(configuration).forEach(([key, value]) => {
      try {
        shape[key] = this.createSchema(key, value);
      } catch (error) {
        if (error instanceof UnsupportedPrimitiveError) {
          errors.push(error);
          return;
        }
        throw error;
      }
    });

    const environment = Object.fromEntries(Object.keys(shape).map((key) => [key, process.env[key]]));
    const result = z.object(shape).safeParse(environment);
    if (!result.success) {
      errors.push(...result.error.issues.map((issue) => this.toError(issue)));
    }

    if (!result.success || errors.length) {
      throw new AggregateConfigurationError(errors);
    }

    return result.data as ResolvedConfiguration<C>;
  }

  /**
   * Creates the schema that parses a raw value to a boolean, accepting only `"true"` and `"false"`.
   */
  private createBooleanSchema(): z.ZodType<boolean, string> {
    return this.createStringSchema().pipe(
      z.stringbool({ case: 'sensitive', falsy: ['false'], truthy: ['true'] })
    );
  }

  /**
   * Creates the schema that parses a raw value to a finite number.
   */
  private createNumberSchema(): z.ZodType<number, string> {
    return this.createStringSchema().pipe(z.coerce.number());
  }

  /**
   * Creates the schema for a single configuration value, based on its declared type and whether it is required.
   *
   * @throws {UnsupportedPrimitiveError} When the declared type is not supported.
   */
  private createSchema(key: string, value: IConfigurationValue): z.ZodType {
    const { required, type } = value;

    let schema: z.ZodType;
    switch (type) {
      case 'boolean':
        schema = this.createBooleanSchema();
        break;
      case 'number':
        schema = this.createNumberSchema();
        break;
      case 'string':
        schema = this.createStringSchema();
        break;
      default: {
        const exhaustiveCheck: never = type;
        throw new UnsupportedPrimitiveError(key, exhaustiveCheck);
      }
    }

    return required ? schema : schema.optional();
  }

  /**
   * Creates the schema that trims a raw value and rejects it when empty.
   */
  private createStringSchema(): z.ZodType<string, string> {
    return z.string().trim().min(1);
  }

  /**
   * Maps a Zod issue to its configuration error.
   *
   * Every schema starts with the string schema, and each stage aborts the pipe on failure,
   * so each issue code identifies a single failure:
   * - `invalid_type` expecting a string: the value is not defined in the environment.
   * - `too_small`: the value is empty or contains only whitespace.
   * - `invalid_value`: the value is neither `"true"` nor `"false"`.
   * - `invalid_type` expecting a number: the value is not a finite number.
   */
  private toError(issue: z.core.$ZodIssue): IKernelError {
    const key = String(issue.path[0]);

    switch (issue.code) {
      case 'invalid_type':
        return issue.expected === 'number'
          ? new InvalidNumberConfigurationError(key)
          : new MissingConfigurationError(key);
      case 'invalid_value':
        return new InvalidBooleanConfigurationError(key);
      case 'too_small':
        return new EmptyConfigurationError(key);
      default:
        throw new z.ZodError([issue]);
    }
  }
}

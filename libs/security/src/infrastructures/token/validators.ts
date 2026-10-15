import {
  AbstractTokenValidator,
  AggregateTokenConfigurationError,
  type ITokenServiceConfiguration,
  TOKEN_RULES,
  WeakTokenSecretError
} from '@domains/token';
import { type IKernelError } from '@libs/kernel';

export class TokenValidator extends AbstractTokenValidator {
  public constructor() {
    super();
  }

  public validate(configuration: ITokenServiceConfiguration): void {
    const { secret } = configuration;

    const errors: IKernelError[] = [];

    if (secret.length < TOKEN_RULES.secret.MIN_LENGTH) {
      errors.push(new WeakTokenSecretError());
    }

    if (errors.length) {
      throw new AggregateTokenConfigurationError(errors);
    }
  }
}

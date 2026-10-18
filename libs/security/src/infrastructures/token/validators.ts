import {
  AbstractTokenValidator,
  AggregateTokenConfigurationError,
  InvalidTokenExpiresInError,
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
    const { expiresIn, secret } = configuration;

    const errors: IKernelError[] = [];

    if (expiresIn < TOKEN_RULES.expiresIn.MIN_SECONDS) {
      errors.push(new InvalidTokenExpiresInError());
    }
    if (secret.length < TOKEN_RULES.secret.MIN_LENGTH) {
      errors.push(new WeakTokenSecretError());
    }

    if (errors.length) {
      throw new AggregateTokenConfigurationError(errors);
    }
  }
}

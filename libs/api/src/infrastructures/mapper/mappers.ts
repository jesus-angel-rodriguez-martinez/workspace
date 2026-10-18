import { ApiError } from '@domains/api';
import { AbstractApiMapper, type ApiErrorMappings } from '@domains/mapper';
import { type IApiMapperOptions } from '@infrastructures/mapper';
import { type KernelError } from '@libs/kernel';

export class ApiMapper extends AbstractApiMapper {
  private readonly errorMappings: ApiErrorMappings;

  public constructor({ errorMappings }: IApiMapperOptions) {
    super();
    this.errorMappings = Object.freeze({ ...errorMappings });
  }

  public toApiError(error: KernelError): ApiError | undefined {
    if (!Object.hasOwn(this.errorMappings, error.code)) {
      return undefined;
    }

    const errorMapping = this.errorMappings[error.code];
    if (!errorMapping) {
      return undefined;
    }

    const { detail = error.detail, status, title = error.title } = errorMapping;
    return new ApiError({ cause: error, code: error.code, detail, status, title });
  }
}

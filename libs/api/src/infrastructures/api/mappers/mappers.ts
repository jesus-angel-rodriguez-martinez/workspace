import { AbstractApiMapper, type ApiError } from '@domains/api';
import { type IApiMapperConfiguration } from '@infrastructures/api';
import { type CoreError } from '@libs/core';

export class ApiMapper extends AbstractApiMapper {
  private readonly mappers: AbstractApiMapper[];

  public constructor({ mappers }: IApiMapperConfiguration) {
    super();
    this.mappers = mappers;
  }

  public toApiError(error: CoreError): ApiError | undefined {
    for (const mapper of this.mappers) {
      const apiError = mapper.toApiError(error);
      if (apiError) {
        return apiError;
      }
    }
    return undefined;
  }
}

import { AbstractApiMapper, type IApiMapperConfiguration } from '@infrastructures/api';
import { type ApiError } from '@libs/api';
import { type CoreError } from '@libs/core';

export class ApiMapper extends AbstractApiMapper {
  public constructor(configuration: IApiMapperConfiguration) {
    super(configuration);
  }

  public toApiError(error: CoreError): ApiError | undefined {
    const mappers = [this.usersApiMapper, this.authenticationApiMapper];

    for (const mapper of mappers) {
      const apiError = mapper.toApiError(error);

      if (apiError) {
        return apiError;
      }
    }

    return undefined;
  }
}

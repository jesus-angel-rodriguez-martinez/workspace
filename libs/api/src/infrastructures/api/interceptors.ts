import { type IApiResponse } from '@domains/api';
import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { map, type Observable } from 'rxjs';

export class ApiInterceptor<T> implements NestInterceptor<T, IApiResponse<T> | undefined> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<IApiResponse<T> | undefined> {
    const observable = next.handle();

    const response = observable.pipe(map((data) => this.toApiResponse(data)));
    return response;
  }

  private toApiResponse(data: T): IApiResponse<T> | undefined {
    if (data === undefined) {
      return undefined;
    }
    const response = { data };
    return response;
  }
}

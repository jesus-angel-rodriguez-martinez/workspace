import { type IApiResponse } from '@domains/api';
import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { map, type Observable } from 'rxjs';

export class ApiInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<IApiResponse<T>> {
    const observable = next.handle();

    const response = observable.pipe(map((data) => this.toApiResponse(data)));
    return response;
  }

  private toApiResponse(data: T): IApiResponse<T> {
    const response = { data };
    return response;
  }
}

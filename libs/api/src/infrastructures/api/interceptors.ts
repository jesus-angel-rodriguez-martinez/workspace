import { type IApiResponse } from '@domains/api';
import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { map, type Observable } from 'rxjs';

export class ApiInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<IApiResponse<T>> {
    return next.handle().pipe(map((data) => this.toApiResponse(data)));
  }

  private toApiResponse(data: T): IApiResponse<T> {
    return { data };
  }
}

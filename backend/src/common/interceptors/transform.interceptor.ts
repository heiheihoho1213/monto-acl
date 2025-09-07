import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    return next.handle().pipe(
      map((data) => {
        // 如果响应已经格式化，直接返回
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // 格式化响应
        const formattedResponse: Response<T> = {
          success: true,
          code: response.statusCode || 200,
          message: 'Success',
          data: data,
          timestamp: new Date().toISOString(),
        };

        return formattedResponse;
      }),
    );
  }
}

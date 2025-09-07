import { Response } from 'express';

export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message: string = 'Success',
    statusCode: number = 200,
  ) {
    return res.status(statusCode).json({
      success: true,
      code: statusCode,
      message: message,
      data: data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(
    res: Response,
    message: string = 'Error',
    statusCode: number = 400,
    error?: any,
  ) {
    return res.status(statusCode).json({
      success: false,
      code: statusCode,
      message: message,
      error: error || message,
      timestamp: new Date().toISOString(),
    });
  }

  static created<T>(res: Response, data: T, message: string = 'Created successfully') {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response, message: string = 'No content') {
    return this.success(res, null, message, 204);
  }

  static pagination<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    pageSize: number,
    message: string = 'Success',
  ) {
    return res.status(200).json({
      success: true,
      code: 200,
      message: message,
      data: {
        list: data,
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      },
      timestamp: new Date().toISOString(),
    });
  }
}

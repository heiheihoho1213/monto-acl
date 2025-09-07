import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    public readonly code?: string,
  ) {
    super(
      {
        success: false,
        code: status,
        message: message,
        error: message,
        timestamp: new Date().toISOString(),
      },
      status,
    );
  }
}

export class BusinessException extends CustomException {
  constructor(message: string, code?: string) {
    super(message, HttpStatus.BAD_REQUEST, code);
  }
}

export class UnauthorizedException extends CustomException {
  constructor(message: string = 'Unauthorized', code?: string) {
    super(message, HttpStatus.UNAUTHORIZED, code);
  }
}

export class ForbiddenException extends CustomException {
  constructor(message: string = 'Forbidden', code?: string) {
    super(message, HttpStatus.FORBIDDEN, code);
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string = 'Not Found', code?: string) {
    super(message, HttpStatus.NOT_FOUND, code);
  }
}

export class ConflictException extends CustomException {
  constructor(message: string = 'Conflict', code?: string) {
    super(message, HttpStatus.CONFLICT, code);
  }
}

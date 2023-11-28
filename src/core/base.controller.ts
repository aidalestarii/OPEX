import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

export abstract class BaseController {

  ok<T>(res: Response, result: T, meta) {
    return res.status(HttpStatus.OK).json({
      data: result,
      meta: meta,
      timestamp: new Date(),
    });
  }

  created<T>(res: Response, result: T, meta) {
    return res.status(HttpStatus.CREATED).json({
      data: result,
      meta: meta,
      timestamp: new Date(),
    });
  }

  generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  loginCheck(status: boolean) {
    if (status) {
      return;
    }

    throw new Error();
  }

  exceptionHandler(error: Error) {
    if (error instanceof NotFoundException) {
      throw error; // NestJS will handle NotFoundException and send a 404 response
    }

    throw new HttpException(
      error.message || 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

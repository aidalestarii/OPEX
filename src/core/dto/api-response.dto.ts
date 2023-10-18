import { Expose } from 'class-transformer';

export class ApiResponseDto<T, U> {
  @Expose()
  data: T;

  @Expose()
  meta: U;

  @Expose()
  time: Date;
}

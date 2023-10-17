import { Expose } from "class-transformer";

export class ApiResponseDto<T> {
   @Expose()
   data: T;

   @Expose()
   meta: any;

   @Expose()
   time: Date;
}
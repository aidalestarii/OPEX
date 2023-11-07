import { PartialType } from '@nestjs/mapped-types';
import { CreateGetAllDto } from './create-get-all.dto';

export class UpdateGetAllDto extends PartialType(CreateGetAllDto) {}

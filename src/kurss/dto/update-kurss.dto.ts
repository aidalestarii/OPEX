import { PartialType } from '@nestjs/mapped-types';
import { CreateKurssDto } from './create-kurss.dto';

export class UpdateKurssDto extends PartialType(CreateKurssDto) {}

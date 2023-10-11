import { PartialType } from '@nestjs/mapped-types';
import { CreateMCostCenterDto } from './create-m_cost_center.dto';

export class UpdateMCostCenterDto extends PartialType(CreateMCostCenterDto) {}

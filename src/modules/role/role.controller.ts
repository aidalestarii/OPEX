import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Observable, map } from 'rxjs';
import { RoleDto } from './dto/role.dto';
import { AllRoleDto } from '../realization/dto/create-realization.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':personalNumberTo')
  async getSample(
    @Param('personalNumberTo') personalNumberTo: string,
  ): Promise<Partial<RoleDto>> {
    return this.roleService.getName(personalNumberTo);
  }
}

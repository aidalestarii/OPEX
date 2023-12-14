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

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':personalNumber')
  async getSample(@Param('personalNumber') personalNumber: string) {
    return this.roleService.getRole(personalNumber);
  }
}

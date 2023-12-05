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
  async getSample(
    @Param('personalNumber') personalNumber: string,
  ): Promise<any> {
    return this.roleService.sample(personalNumber);
  }

  // @Get(':personalNumber')
  // getManagerAndSeniorManager(
  //   @Param('personalNumber') personalNumber: string,
  // ): Observable<{ manager: string; seniorManager: string }> {
  //   return this.roleService.getEmployeeData(personalNumber).pipe(
  //     map((data) => ({
  //       personalNumber,
  //       personalUnit: data.employee ? data.employee.personalUnit : null,
  //       manager: data.manager ? data.manager.personalNumber : null,
  //       personalUnitManager: data.manager ? data.manager.personalUnit : null,
  //       seniorManager: data.seniorManager
  //         ? data.seniorManager.personalNumber
  //         : null,
  //       personalUnitSeniorManager: data.seniorManager
  //         ? data.seniorManager.personalUnit
  //         : null,
  //     })),
  //   );
  // }
}

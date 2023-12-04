import { Controller, Get, Param } from '@nestjs/common';
import { UserDataService } from './user_data.service';
import { Observable, map } from 'rxjs';

@Controller('user-data')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @Get(':personalNumber')
  getManagerAndSeniorManager(
    @Param('personalNumber') personalNumber: string,
  ): Observable<{ manager: string; seniorManager: string }> {
    return this.userDataService.getEmployeeData(personalNumber).pipe(
      map((data) => ({
        personalNumber,
        personalUnit: data.employee ? data.employee.personalUnit : null,
        manager: data.manager ? data.manager.personalNumber : null,
        personalUnitManager: data.manager ? data.manager.personalUnit : null,
        seniorManager: data.seniorManager
          ? data.seniorManager.personalNumber
          : null,
        personalUnitSeniorManager: data.seniorManager
          ? data.seniorManager.personalUnit
          : null,
      })),
    );
  }
}

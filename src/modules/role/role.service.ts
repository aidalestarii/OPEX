import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, catchError, lastValueFrom, map, tap } from 'rxjs';

@Injectable()
export class RoleService {
  constructor(private readonly httpService: HttpService) {}

  private apiKey: string = '543C-EF0B-4137-A27F';

  async sample(personalNumber: string): Promise<any> {
    const apiUrl = `https://api.gmf-aeroasia.co.id/th/soev2/v2/employee/${personalNumber}/get-manager-and-sm`;
    // const apiUrl = `https://api.gmf-aeroasia.co.id/th/soev2/v2/employee/${personalNumber}?superior=true`;
    const headers = {
      'x-api-key': this.apiKey,
    };

    let result;
    const data = await lastValueFrom(
      this.httpService.get(apiUrl, { headers }).pipe(
        tap((v) => {
          result = v.data;
        }),
      ),
    );
    return result;
  }
}

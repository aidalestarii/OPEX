import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class UserDataService {
  constructor(private readonly httpService: HttpService) {}

  private apiKey: string = '543C-EF0B-4137-A27F';

  getEmployeeData(personalNumber: string): Observable<any> {
    const apiUrl = `https://api.gmf-aeroasia.co.id/th/soev2/v2/employee/${personalNumber}/get-manager-and-sm`;

    const headers = {
      'x-api-key': this.apiKey,
    };

    return this.httpService.get(apiUrl, { headers }).pipe(
      map((response) => response.data.body),
      catchError((error) => {
        console.error('Error during request:', error.message);
        return 'An error occurred during the request.';
      }),
    );
  }
}

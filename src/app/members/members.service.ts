import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  public api_url: string;

  memberRoles: any = [
    { name: 'Coach', value: 'manager' },
    { name: 'Player Coach', value: 'editor' },
    { name: 'Player', value: 'member' },
    { name: 'Supporter', value: 'readonly' }
  ]

  constructor(private http: HttpClient) {
    this.api_url = '';
  }


  fetchInvitationUrl(teamId: string, role: any): Observable<any> {
    return this.http.post(this.api_url + '/teams/' + teamId + '/invites', role, { observe: 'response' }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  getTeamMembersData(teamId: string): Observable<any> {
    return this.http.get(this.api_url + '/teams/' + teamId, { observe: 'response' }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }




}

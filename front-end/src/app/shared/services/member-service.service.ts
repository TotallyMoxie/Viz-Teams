import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberServiceService {
  private baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  addNewMember(member: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/member/new`, member);
  }

  deleteMember(member: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/member/${member.id}`);
  }

  updateMember(member: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/member/${member.id}`, member);
  }

  getMembers(): any {
    return this.http
      .get(`${this.baseUrl}/api/v1/members`)
      .subscribe((response) => {
        console.log('Members fetched successfully', response);
        return { response };
      });
  }

  getMemberById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/member/${id}`);
  }
}

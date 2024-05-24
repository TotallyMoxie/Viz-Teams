import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private baseUrl = 'http://localhost:3000';
  newTeam: any;
  public teams: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>(null);
  constructor(private http: HttpClient) {}

  addNewTeam(team: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/team/new`, team);
  }

  deleteTeam(team: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/team/${team.id}`);
  }

  updateTeam(team: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/team/${team.id}`, team);
  }

  getTeams(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/team`);
  }

  getTeamById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/team/${id}`);
  }
}

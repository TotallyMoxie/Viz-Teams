import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  newTeam: any;
  public teams: any[] = [];
  constructor() {}
}

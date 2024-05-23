// team.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TeamService {
  teams: { teamName: string, description: string }[] = [];

  constructor() { }

  addTeam(teamName: string, description: string) {
    this.teams.push({ teamName, description });
  }

  getTeams() {
    return this.teams;
  }
}


import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

  export class MoveTeamService {
    public selectedTeam: any = null;
    private teamsSource = new BehaviorSubject<any[]>([
      {
        name: 'Team A',
        members: [
          { name: 'Alice', image: '' },
          { name: 'Bob', image: '' },
          { name: 'Charlie', image: '' },
          { name: 'David', image: '' },
          { name: 'Eve', image: '' },
          { name: 'Frank', image: '' },
          { name: 'Alice', image: '' },
          { name: 'Bob', image: '' },
          { name: 'Charlie', image: '' },
          { name: 'David', image: '' },
          { name: 'Eve', image: '' },
          { name: 'Frank', image: '' }
          // Add more members as needed
        ]
      },
      {
        name: 'Team B',
        members: [
          { name: 'David', image: '' },
          { name: 'Eve', image: '' },
          { name: 'Frank', image: '' }
        ]
      },
      {
        name: 'Team C',
        members: []
      }
    ]);
    currentTeams = this.teamsSource.asObservable();

    selectTeams(team: any) {
      this.selectedTeam = team;

      };
    }





import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  newTeam: any;
  public teams: any[] = [
    {
      name: 'Software Engineer',
      members: [
        { name: 'Alice', image: '' },
        { name: 'Bob', image: '' },
        { name: 'Charlie', image: '' },
        { name: 'Alice', image: '' },
        { name: 'Bob', image: '' },
        { name: 'Charlie', image: '' },
        { name: 'Alice', image: '' },
        { name: 'Bob', image: '' },
        { name: 'Charlie', image: '' },
        { name: 'Alice', image: '' },
        { name: 'Bob', image: '' },
        { name: 'Charlie', image: '' },
      ],
    },
    {
      name: 'Quality Engineer',
      members: [
        { name: 'David', image: '' },
        { name: 'Eve', image: '' },
        { name: 'Frank', image: '' },
      ],
    },
    { name: 'Team C', members: [] },
  ];
  constructor() {}
}

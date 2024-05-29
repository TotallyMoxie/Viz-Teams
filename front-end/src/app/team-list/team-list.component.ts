import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  DialogData,
  DialogOverviewExampleDialog,
} from '../team-dialog/team-dialog.component';

import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';

import { CommonModule } from '@angular/common';
import { TeamService } from '../shared/services/team-service.service';
import { MoveTeamService } from '../shared/services/move-teams.service';
import { Subscription } from 'rxjs';
import { Team } from '../shared/models/team.model';

@Component({
  selector: 'app-team-list',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatAccordion,
    CommonModule,
  ],
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})

export class TeamListComponent {
clearLocalStorage() {
throw new Error('Method not implemented.');
}
  teamSubscription: Subscription;
  message: any;
  teams: any;
  constructor(
    public dialog: MatDialog,
    public teamService: TeamService,
    public MoveTeamService: MoveTeamService
  ) {}

  ngOnInit() {
    this.teamService.teams.subscribe((teams) => {
      this.teams = teams;
    });

    this.teamService.getTeams().subscribe((res) => {
      let { teams } = res;
      this.teamService.teams.next(teams);
      console.log(this.teams);
    });

    // Check if there are teams stored in local storage
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      this.teams = JSON.parse(storedTeams);
    } else {
      // If no teams are stored, initialize with default data
      this.teams = [
        // {
        //   name: 'Team A',
        //   members: [
        //     { name: 'Alice', image: '' },
        //     { name: 'Bob', image: '' },
        //     { name: 'Charlie', image: '' },
        //   ],
        // },
        // {
        //   name: 'Team B',
        //   members: [
        //     { name: 'David', image: '' },
        //     { name: 'Eve', image: '' },
        //     { name: 'Frank', image: '' },
        //   ],
        // },
        // { name: 'Team C', members: [] },
      ];
    }
  }
  openDialog(): void {
    this.dialog.open(DialogOverviewExampleDialog, {
      height: '400px',
      width: '600px',
    });
  }

  onAddPerson(team) {
    this.dialog.open(AddPersonDialogComponent, {
      data: { teamName: team.name },
    });
  }
  selectTeam(team) {
    this.MoveTeamService.selectTeams(team);
    console.log(this.MoveTeamService.selectedTeam);
  }
}

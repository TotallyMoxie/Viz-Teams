import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

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
import { MoveTeamService } from './move-teams.service';

import { CommonModule } from '@angular/common';
import { TeamService } from '../shared/services/team-service.service';

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
  message: any;
  teams: any;
  constructor(public dialog: MatDialog, public teamService: TeamService) {}

  ngOnInit() {
    // Check if there are teams stored in local storage
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      this.teams = JSON.parse(storedTeams);
    } else {
      // If no teams are stored, initialize with default data
      this.teams = [
        {
          name: 'Team A',
          members: [
            { name: 'Alice', image: '' },
            { name: 'Bob', image: '' },
            { name: 'Charlie', image: '' },
          ],
        },
        {
          name: 'Team B',
          members: [
            { name: 'David', image: '' },
            { name: 'Eve', image: '' },
            { name: 'Frank', image: '' },
          ],
        },
        { name: 'Team C', members: [] },
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
  clearLocalStorage() {
    localStorage.clear();
    this.teams = []; // Clear the teams array in the component
  }
  // selectTeam(team) {
  //   this.MoveTeamService.selectTeams(team);
  //   console.log(this.MoveTeamService.selectedTeam);
  //   }
}

export class TeamDialogComponent {}

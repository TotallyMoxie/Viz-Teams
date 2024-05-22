import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogOverviewExampleDialog } from '../team-dialog/team-dialog.component';
import { AddPersonDialogComponent } from '../add-person-dialog/add-person-dialog.component';
import { MoveTeamService } from './move-teams.service';

import { CommonModule } from '@angular/common';


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
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {

  teams: any[] = [];
  constructor(public dialog: MatDialog, public MoveTeamService: MoveTeamService) {
    this.MoveTeamService.currentTeams.subscribe(teams => this.teams = teams);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  onAddPerson(team) {
    this.dialog.open(AddPersonDialogComponent, {
      data: {teamName: team},
    })
  }
  selectTeam(team) {
    this.MoveTeamService.selectTeams(team);
    console.log(this.MoveTeamService.selectedTeam);
    }
}

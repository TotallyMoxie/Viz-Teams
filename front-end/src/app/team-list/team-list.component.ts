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
<<<<<<< Updated upstream
export class TeamListComponent {
  message: any;
  constructor(public dialog: MatDialog, public teamService: TeamService) {}
=======
export class TeamListComponent implements OnInit {
  teams: any[] = [];
  dialogRef: any;

  constructor(public dialog: MatDialog) {}
>>>>>>> Stashed changes

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
            { name: 'Charlie', image: '' }
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
        {name: 'Team C', members: []}
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
<<<<<<< Updated upstream
      data: { teamName: team.name },
    });
=======
      data: {teamName: team},
    }
  )
>>>>>>> Stashed changes
  }
  clearLocalStorage() {
    localStorage.clear();
    this.teams = []; // Clear the teams array in the component
  }

  }


<<<<<<< Updated upstream
export class TeamDialogComponent {}
=======
export class TeamDialogComponent {

}
>>>>>>> Stashed changes

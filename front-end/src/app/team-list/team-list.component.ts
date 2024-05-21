import { Component, Inject } from '@angular/core';
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
export class TeamListComponent {
  message: any;
  constructor(public dialog: MatDialog, public teamService: TeamService) {}

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
}

export class TeamDialogComponent {}

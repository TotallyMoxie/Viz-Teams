import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogOverviewExampleDialog } from '../team-dialog/team-dialog.component';

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
  teams: any[] = [
    {
      name: 'Team A',
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
  ];
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
}

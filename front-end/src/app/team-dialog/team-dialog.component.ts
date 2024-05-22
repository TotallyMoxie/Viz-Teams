import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Text } from '@angular/compiler';
import { TeamService } from '../shared/services/team-service.service';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';

NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NgModule,
  ],
  providers: [TeamService],
  bootstrap: [AppComponent],
});

export interface DialogData {
  description: any | undefined;
  teamName: string | undefined;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-team-list',
  templateUrl: 'team-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  styleUrl: './team-dialog.component.css',

})
export class DialogOverviewExample {
  description: any | undefined;
  teamName: string | undefined;
  onSubmit: any;

  constructor(public dialog: MatDialog, private teamService: TeamService) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { name: this.teamName, description: this.description },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  }
@Component({
  selector: 'app-team-list',
  templateUrl: 'team-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  styleUrl: './team-dialog.component.css',
})
export class DialogOverviewExampleDialog {
  description: any | undefined;
  teamName: string | undefined;
  http: any;
  teams: any;

 constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private teamService: TeamService
  ) {}

  onSubmit(): void {
    const teamData = {
      teamName: this.teamName,
      description: this.description
    };
    console.log('Team data:', teamData);
    this.dialogRef.close({ refreshTeams: true });

    const teams = JSON.parse(localStorage.getItem('teams') || '[]');
    teams.push(teamData);
    localStorage.setItem('teams', JSON.stringify(teams));

    this.dialogRef.close();
  }

  loadTeamsFromLocalStorage() {
    const storedTeams = localStorage.getItem('teams');
    if (storedTeams) {
      this.teams = JSON.parse(storedTeams);
    } else {
      this.teams = [];
    }
  }



}

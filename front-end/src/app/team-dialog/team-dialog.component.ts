import {Component, Inject} from '@angular/core';
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
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Text } from '@angular/compiler';

export interface DialogData {
  teamName: string;
  description: Text;

}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-team-list',
  templateUrl: 'team-dialog.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule],
  styleUrl: './team-dialog.component.css'
})
export class DialogOverviewExample {
  teamName: string | undefined;
  description: Text | undefined;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {name: this.teamName, description: this.description},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.description = result;
      this.teamName = result;
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
  styleUrl: './team-dialog.component.css'
})
export class DialogOverviewExampleDialog {
description: Text | undefined;
teamName: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

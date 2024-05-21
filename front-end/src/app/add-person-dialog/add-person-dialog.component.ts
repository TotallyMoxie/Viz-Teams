import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DialogData } from '../team-dialog/team-dialog.component';
import { TeamService } from '../shared/services/team-service.service';

@Component({
  selector: 'app-add-person-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './add-person-dialog.component.html',
  styleUrl: './add-person-dialog.component.css',
})
export class AddPersonDialogComponent implements OnInit {
  addPersonForm: FormGroup = new FormGroup({});
  titles = new FormControl();
  titlesList: string[] = ['Software Engineer', 'Quality Engineer'];
  teamsList: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddPersonDialogComponent>,
    private teamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.teamsList = this.teamService.teams.map((team) => team.name);
    this.addPersonForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      team: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.addPersonForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}

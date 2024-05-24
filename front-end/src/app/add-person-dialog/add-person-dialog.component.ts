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
import { Team } from '../shared/models/team.model';
import { Member } from '../shared/models/member.model';
import { MemberServiceService } from '../shared/services/member-service.service';

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
  addPersonForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    team: new FormControl('', [Validators.required]),
  });
  titles = new FormControl();
  titlesList: string[] = ['Software Engineer', 'Quality Engineer'];
  teams: Team[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddPersonDialogComponent>,
    private teamService: TeamService,
    private memberService: MemberServiceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    console.log('Data', this.data);
    this.teamService.teams.subscribe((teams) => {
      this.teams = teams;
    });
    this.addPersonForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      team: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const { firstName, lastName, title, team } = this.addPersonForm.value;
    const newPerson = new Member(firstName, lastName, title, team);
    this.memberService.addNewMember(newPerson).subscribe((res) => {
      console.log('New person added successfully', res);
    });
    this.dialogRef.close(newPerson);
  }

  onCancel() {
    this.dialogRef.close();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/User.model';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  animal: string = '';
  name: string = '';

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(SignInComponentDialog, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
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
    ReactiveFormsModule,
  ],
})
export class SignInComponentDialog implements OnInit {
  public name: string;
  public animal: string;
  public signInForm: FormGroup;

  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignInComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formValid() {
    if (this.signInForm.invalid) {
      return true;
    }
    return false;
  }

  onSubmit() {
    const signInForm = this.signInForm.getRawValue();
    this.authService
      .signin(signInForm.email, signInForm.password)
      .subscribe((res) => {
        const { email, _id: id } = res.data.user;
        const user = new User(email, id);
        this.authService.user.next(user);
        this.dialogRef.close();
      });
  }
}

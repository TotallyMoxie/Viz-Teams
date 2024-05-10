import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponentDialog } from '../sign-up/sign-up.component';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/User.model';
import { SignInComponentDialog } from '../sign-in/sign-in.component';

@Component({
  selector: 'app-Header',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIcon, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class Header implements OnInit {
  public user: User;
  constructor(public dialog: MatDialog, private authService: AuthService) {}
  ngOnInit() {
    this.authService.currentUser.subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
  openSignUp(): void {
    const dialogRef = this.dialog.open(SignUpComponentDialog);
  }
  openSignIn(): void {
    const dialogRef = this.dialog.open(SignInComponentDialog);
  }
}

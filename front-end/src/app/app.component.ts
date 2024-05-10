import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { InfoContainerComponent } from './info-container/info-container.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Header } from '../app/header/header.component';
import { AuthService } from './auth/auth.service';
import { User } from './auth/User.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TeamListComponent,
    InfoContainerComponent,
    MatToolbarModule,
    Header,
    SignUpComponent,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'front-end';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
      this.authService.authenticate().subscribe((res) => {
        const user = new User(res.data.user.email, res.data.user._id);
        this.authService.user.next(user);
      },
      (error) => {
        this.authService.user.next(null);
      });
  }
}

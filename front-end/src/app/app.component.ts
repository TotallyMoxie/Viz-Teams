import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TeamListComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-end';
}

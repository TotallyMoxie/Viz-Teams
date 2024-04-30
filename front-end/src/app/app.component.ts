import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { InfoContainerComponent } from './info-container/info-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TeamListComponent,
    InfoContainerComponent,
  ],
  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front-end';
}

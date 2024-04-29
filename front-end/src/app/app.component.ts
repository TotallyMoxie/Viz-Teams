import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoContainerComponent } from './info-container/info-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfoContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'front-end';
}

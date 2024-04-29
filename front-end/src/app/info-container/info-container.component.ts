import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-info-container',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './info-container.component.html',
  styleUrl: './info-container.component.css',
})
export class InfoContainerComponent {}

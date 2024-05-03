import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon } from "@angular/material/icon";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-Header',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
    MatIcon,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class Header {
  title = 'front-end';
}
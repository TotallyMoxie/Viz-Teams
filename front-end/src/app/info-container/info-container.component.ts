import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MoveTeamService } from '../shared/services/move-teams.service';
import { DialogOverviewExampleDialog } from '../team-dialog/team-dialog.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButton } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-info-container',
  standalone: true,
  imports: [MatCardModule, CommonModule,MatIcon, MatTooltip, MatButton, MatCardModule, MatDividerModule, MatAccordion, MatExpansionModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './info-container.component.html',
  styleUrl: './info-container.component.css',
})
export class InfoContainerComponent  {
  teams: any[] = [];
  selectedMember = null;
  team = this.teams;

  constructor(public dialog: MatDialog, public MoveTeamService: MoveTeamService) {
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle result if needed
    });
  }

  selectTeam(team) {
    this.MoveTeamService.selectedTeam(team);

  }

  memberInfo(member) {
    this.selectedMember = member;

  }
  returnToTeam(team){
    this.selectedMember = null;
  }
}


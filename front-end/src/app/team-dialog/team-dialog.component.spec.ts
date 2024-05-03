import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogContent } from '@angular/material/dialog';
import {TeamDialogComponent} from './team-dialog.component';

describe('TeamDialogComponent', () => {
  let component: TeamDialogComponent;
  let fixture: ComponentFixture<TeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogContent]
  
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

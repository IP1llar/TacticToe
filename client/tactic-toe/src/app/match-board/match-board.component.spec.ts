import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchBoardComponent } from './match-board.component';

describe('MatchBoardComponent', () => {
  let component: MatchBoardComponent;
  let fixture: ComponentFixture<MatchBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchBoardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

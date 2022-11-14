import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatboardComponent } from './statboard.component';

describe('StatboardComponent', () => {
  let component: StatboardComponent;
  let fixture: ComponentFixture<StatboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotSvgComponent } from './robot-svg.component';

describe('RobotSvgComponent', () => {
  let component: RobotSvgComponent;
  let fixture: ComponentFixture<RobotSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RobotSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

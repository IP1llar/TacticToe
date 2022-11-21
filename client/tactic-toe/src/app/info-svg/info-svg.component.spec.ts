import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSvgComponent } from './info-svg.component';

describe('InfoSvgComponent', () => {
  let component: InfoSvgComponent;
  let fixture: ComponentFixture<InfoSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

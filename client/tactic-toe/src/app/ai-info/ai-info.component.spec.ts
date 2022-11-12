import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiInfoComponent } from './ai-info.component';

describe('AiInfoComponent', () => {
  let component: AiInfoComponent;
  let fixture: ComponentFixture<AiInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

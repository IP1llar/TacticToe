import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnAiComponent } from './create-an-ai.component';

describe('CreateAnAiComponent', () => {
  let component: CreateAnAiComponent;
  let fixture: ComponentFixture<CreateAnAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnAiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

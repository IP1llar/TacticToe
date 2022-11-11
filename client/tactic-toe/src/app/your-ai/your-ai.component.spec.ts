import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourAiComponent } from './your-ai.component';

describe('YourAiComponent', () => {
  let component: YourAiComponent;
  let fixture: ComponentFixture<YourAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourAiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

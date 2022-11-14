import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBattleInfoComponent } from './ai-battle-info.component';

describe('AiBattleInfoComponent', () => {
  let component: AiBattleInfoComponent;
  let fixture: ComponentFixture<AiBattleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiBattleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiBattleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

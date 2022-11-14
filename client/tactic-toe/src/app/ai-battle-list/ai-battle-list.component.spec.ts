import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBattleListComponent } from './ai-battle-list.component';

describe('AiBattleListComponent', () => {
  let component: AiBattleListComponent;
  let fixture: ComponentFixture<AiBattleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiBattleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiBattleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

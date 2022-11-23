import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBattleComponent } from './create-battle.component';

describe('CreateBattleComponent', () => {
  let component: CreateBattleComponent;
  let fixture: ComponentFixture<CreateBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBattleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

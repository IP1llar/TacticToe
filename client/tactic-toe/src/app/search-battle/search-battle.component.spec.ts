import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBattleComponent } from './search-battle.component';

describe('SearchBattleComponent', () => {
  let component: SearchBattleComponent;
  let fixture: ComponentFixture<SearchBattleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBattleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBattleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

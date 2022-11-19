import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { NavbarComponent } from './navbar.component';
import { HttpClientModule } from '@angular/common/http';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports:[HttpClientModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle DarkMode', ()=>{
    expect(component.isDark)
    .withContext('false at first')
    .toBe(false);
    component.toggleDarkMode();
    expect(component.isDark)
    .withContext('true after click')
    .toBe(true);
    component.toggleDarkMode()
    expect(component.isDark)
    .withContext('true false in the end')
    .toBe(false)
  })
  it('should display "tActIc-toe" as a headline', () => {
    expect(fixture.nativeElement.querySelector('h1').textContent).toEqual('tActIc-toe')
  });
  // it('should switch to the short nav when width < 700px ',()=>{
  //   // spyOnProperty(window,'innerWidth').and.returnValue(699);
  //   // window.dispatchEvent(new Event('resize'));
  //   expect(component.bigNav)
  //   .withContext('should be false')
  //   .toBe(false)
    
  // })
});

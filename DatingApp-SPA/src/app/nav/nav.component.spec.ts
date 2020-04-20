/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement} from '@angular/core';

import { NavComponent } from './nav.component';
import {HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

fdescribe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  let userIn: DebugElement;
  let passIn: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, FormsModule],
      declarations: [ NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userIn = fixture.debugElement.query(By.css('input[name=username]'));
    passIn = fixture.debugElement.query(By.css('input[name=password]'));

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have `Dating App` in nav', () => {

    const defValueNav = 'Dating App';
    const nameBrand = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(nameBrand.nativeElement.textContent.trim()).toContain(defValueNav);

  });

  it('should called `login` method', async (() => {
    spyOn(component, 'login');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.login).toHaveBeenCalled();
    });

  }));

  it('should have `Username` and `Password` as a placeholders', () => 
  {
    // get attribute of placeholders
    const userPlace = userIn.nativeElement.getAttribute('placeholder');
    const passPlace = passIn.nativeElement.getAttribute('placeholder');
    // test
    expect(userPlace).toBe('Username');
    expect(passPlace).toBe('Password');

  });

});

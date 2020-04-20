/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';
import { RegisterComponent } from '../register/register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  //let regComp: RegisterComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [HttpClientTestingModule, HttpClient, HttpHandler, RegisterComponent, FormBuilder, Router],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // regComp = TestBed.inject(RegisterComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create new div after registerToggle', async(() => 
  {
    const compiled = fixture.debugElement.nativeElement;
    //lack of component, when registerMode == false
    expect(compiled.querySelector('app-register')).toEqual(null);
    component.registerToggle();
    fixture.detectChanges();
    //Here we are!
    expect(compiled.querySelector('app-register')).not.toEqual(null);

  }));

});

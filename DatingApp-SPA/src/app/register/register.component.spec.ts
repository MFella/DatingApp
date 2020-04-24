/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterComponent } from './register.component';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClientTestingModule, HttpClient, HttpHandler, FormBuilder, {provide: Router, useValue: router}],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('`register()` should register new user if the form is valid', done => {
    //dummy data
    let attrs = ['male', 'Cesary', 'Charlin', '25-07-1995', 'Warsaw', 'Poland', 'Charlin0', 'Charlin0'];
    
    Object.keys(component.registerForm.controls).forEach((el, index, arr) => 
    {
      arr[index] = attrs[index];
    });
    let mockReg = Object.assign({}, component.registerForm.value);

    component['authServ'].register = () => of(mockReg);
    component['authServ'].login = () => of(mockReg);
    spyOn(component['authServ'], 'register').and.callThrough();
    spyOn(component['alertify'], 'success').and.returnValue();
    spyOn(component['alertify'], 'error').and.returnValue();
    spyOn(component['authServ'], 'login').and.stub();

    component['authServ'].register(mockReg).subscribe(() => 
    {
      expect(component['authServ'].register).toHaveBeenCalled();
      component['alertify'].success("Registration successful!");
    }, err => {
      component['alertify'].error(err);
    }, () => {
        router.navigate(['/members']);
    });

    component.register();
    expect(component['alertify'].success).toHaveBeenCalled();
    expect(component['alertify'].error).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/members']);
    fixture.detectChanges();
    done();
  });
});

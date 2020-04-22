/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListsComponent } from './lists.component';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { of, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

fdescribe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  let authServ: AuthService;
  let userServ: UserService;
  let alertify: AlertifyService;

  const fakeActivatedRoute = {
    data: of({users: {result: null, pagination: {totalItems: 10, itemsPerPage: 5}}})
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientTestingModule, HttpClient, HttpHandler, {provide: ActivatedRoute, useValue: fakeActivatedRoute}],
      declarations: [ ListsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsComponent);
    component = fixture.componentInstance;
    authServ = TestBed.inject(AuthService);
    userServ = TestBed.inject(UserService);
    alertify = TestBed.inject(AlertifyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should `loadUsers` load every User', done => {
    let resFake: PaginatedResult<User[]>;
    let users: User[];
    //const subMock$ = of(resFake);
    expect(component.loadUsers()).toBeUndefined();
    done();
  
  });


});

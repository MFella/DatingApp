/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListsComponent } from './lists.component';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { of, Observable, Subject, BehaviorSubject } from 'rxjs';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { User } from '../_models/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap';
import { EventEmitter } from 'protractor';

fdescribe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  let authServ: AuthService;
  let userServ: UserService;
  let alertify: AlertifyService;

  // Dummy data
  const resFake: PaginatedResult<User[]>  = {result:[{id: 1, user: 'Adi', knownAs:'Adison', age: 20, gender:'male',
  created:  new Date(Date.UTC(2019, 2)), lastActive: new Date(Date.now()), photoUrl:'fk', city: 'London', country:'UK'}],
  pagination: { currentPage: 1, itemsPerPage: 10, totalItems: 50, totalPages: 5}};

  const fakeActivatedRoute = {
    //data: of({users: {result: null, pagination: {totalItems: 50, itemsPerPage: 10, currentPage: 1, totalPages: 5}}})
    data: of({users: resFake})
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

  it('`loadUsers()`should call userServ.getUsers and response should contain actual values', done => {

    component['userServ'].getUsers = () => of(resFake);
    spyOn(component['userServ'], 'getUsers').and.callThrough();

    component['userServ'].getUsers(component.pagination.currentPage, 
      component.pagination.itemsPerPage, null, component.likesParam).subscribe((res: PaginatedResult<User[]>) => 
    {   
      expect(component['userServ'].getUsers).toHaveBeenCalled();
      console.log(res);
      expect(component.users).toEqual(res.result);
      expect(component.pagination).toEqual(res.pagination);
    });
    component.loadUsers();
    done();
  
  });

  it('`pageChanged() should call `loadUsers()`', () => 
  {
    let eveMock$ = new BehaviorSubject<{page: number, itemsPerPage: number}>({page: 2, itemsPerPage: 10});
    spyOn(component, 'loadUsers');
    component.pageChanged(eveMock$);
    fixture.detectChanges();
    expect(component.loadUsers).toHaveBeenCalled();
    expect(component.pagination).toBeDefined();
  });

});

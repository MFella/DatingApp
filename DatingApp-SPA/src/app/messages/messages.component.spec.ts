/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessagesComponent } from './messages.component';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';


fdescribe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let authServ: AuthService;
  let userServ: UserService;
  let alertify: AlertifyService;
    // Dummy data
  const resFake: PaginatedResult<Message[]>  = {result:[{id: 1, senderId: 2,
    senderKnownAs: 'Timmy', senderPhotoUrl: 'http://somethihg.com/1',
  recipientId: 5, recipientKnownAs: 'Ryan', recipientPhotoUrl: 'http://somethihg.com/4',
  content: 'Hello, there!', isRead: false ,dateRead: new Date(Date.now()), messageSent: new Date(Date.now())}],
    pagination: { currentPage: 1, itemsPerPage: 10, totalItems: 50, totalPages: 5}};
  
  const fakeActivatedRoute = {
      data: of({messages: resFake})
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ MessagesComponent ],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServ = TestBed.inject(AuthService);
    userServ = TestBed.inject(UserService);
    alertify = TestBed.inject(AlertifyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('`loadMessage()` should load dummyData and not call alertify.error', done => 
  {
    component['userServ'].getMessages = () => of(resFake);
    spyOn(component['userServ'], 'getMessages').and.callThrough();
    spyOn(component['alertify'], 'error').and.stub();

    component['userServ'].getMessages(component['authServ'].decodedToken, component.pagination.currentPage,
    component.pagination.itemsPerPage, component.messageContainer)
      .subscribe((res: PaginatedResult<Message[]>) => {
        expect(component['userServ'].getMessages).toHaveBeenCalled();
        expect(res.pagination).toEqual(component.pagination);
        expect(res.result).toEqual(component.messages);
      }, err => {
        component['alertify'].error(err);
      });

    expect(component['alertify'].error).not.toHaveBeenCalled();
     done(); 

  });
});

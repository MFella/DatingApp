/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MemberCardComponent } from './member-card.component';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('MemberCardComponent', () => {
  let component: MemberCardComponent;
  let fixture: ComponentFixture<MemberCardComponent>;
  let authServ: AuthService;
  let userServ: UserService;
  let alertify: AlertifyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ MemberCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCardComponent);
    component = fixture.componentInstance;
    component.user = {id: 1, user: 'Adi', knownAs:'Adison', age: 20, gender:'male',
    created:  new Date(Date.UTC(2019, 2)), lastActive: new Date(Date.now()), photoUrl:'fk', city: 'London', country:'UK'};
    fixture.detectChanges();
    authServ = TestBed.inject(AuthService);
    userServ = TestBed.inject(UserService);
    alertify = TestBed.inject(AlertifyService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('`sendLike` should send a like', done => {

    let id = 5;

    spyOn(component['userServ'], 'sendLike').and.callThrough();
    spyOn(component['alertify'], 'success').and.stub();
    spyOn(component['alertify'], 'error').and.stub();


    component['userServ'].sendLike(component['authServ'].decodedToken, id)
      .subscribe(data => {
        expect(component['userServ'].sendLike).toHaveBeenCalled();
        component['alertify'].success('You have liked: ' + component.user.knownAs);
      }, err => 
      {
        component['alertify'].error(err);
      });
    
    
    expect(component['alertify'].success).not.toHaveBeenCalled();
    expect(component['alertify'].error).not.toHaveBeenCalled();

    done();
  });
});

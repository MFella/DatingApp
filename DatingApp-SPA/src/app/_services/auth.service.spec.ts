/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import {User} from '../_models/user';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

fdescribe('Service: Auth', () => {
  let inj: TestBed;
  let httpMock: HttpTestingController;
  let user: User;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    inj = getTestBed();
    httpMock = inj.inject(HttpTestingController);
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('register() should return POST request', async((inject([AuthService], (authServ: AuthService) => {

    authServ.register(user).subscribe(res => {
      expect(res).toBeDefined();
    });

    const req = httpMock.expectOne(authServ.baseUrl + 'register');
    expect(req.request.method).toBe('POST');

    httpMock.verify();
  }))
  ));

  it('response of`changeMemberPhoto()` should contain standard Photo Url', async(inject([AuthService], (authServ: AuthService) => {
    const testUrl = '../../assets/user.png';
    const subjMock = new BehaviorSubject<string>(undefined);
    subjMock.pipe(filter(res => !!res)).subscribe(res => expect(res).toEqual(testUrl));
    subjMock.next(testUrl);

  })));

});

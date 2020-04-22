/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed, fakeAsync } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../_models/user';

fdescribe('Service: User', () => {

  let injector: TestBed;
  let httpMock: HttpTestingController;
  let userServ: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    injector = getTestBed();
    //service = injector.inject(UserService);
    httpMock = injector.inject(HttpTestingController);
    //userServ = injector.inject(UserService);
  });



  // tslint:disable-next-line: no-shadowed-variable
  it('should ...', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('getUser() should contain GET request', async(inject([UserService], (userServ: UserService) => {

    userServ.getUser(1)
      .subscribe((user: User) => {
        expect(user.knownAs).toBeDefined();
      });

    let req = httpMock.expectOne(userServ.baseUrl + 'users/1');
    expect(req.request.method).toBe("GET");

    httpMock.verify();
  })));

  it('deleteMess() should contain POST request', async(inject([UserService], (userServ: UserService) => {

    userServ.deleteMess(1, 6)
      .subscribe((ok) => {
        expect(ok).toBeDefined();
      });
    let req = httpMock.expectOne(userServ.baseUrl + 'users/' + 6 + '/messages/' + 1);
    expect(req.request.method).toBe("POST");

    httpMock.verify();

  })));

  
  afterEach(() => 
  {
    httpMock.verify();
  });

});

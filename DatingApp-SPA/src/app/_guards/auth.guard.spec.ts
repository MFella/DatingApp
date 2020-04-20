import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { appRoutes } from '../routes';
import { AlertifyService } from '../_services/alertify.service';
import { NgZone } from '@angular/core';

class MockRouter {
  navigate(path) {}
}
fdescribe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServ: AuthService;
  let router: Router;
  let alertify: AlertifyService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientTestingModule, HttpClient, HttpHandler],
      imports: [RouterTestingModule, RouterModule.forRoot(appRoutes)]
    });
    guard = TestBed.inject(AuthGuard);
    authServ = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    alertify = TestBed.inject(AlertifyService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true for a loggedIn user', () => 
  {
    spyOn(authServ, 'loggedIn').and.returnValue(true);
    expect(guard.canActivate()).toEqual(true);
  });

  it('should return false, call navigate method, and error method for a not loggedIn user', () => 
  {
    spyOn(authServ, 'loggedIn').and.returnValue(false);
    spyOn(router, 'navigate').and.stub();
    spyOn(alertify, 'error').and.stub();
    expect(guard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
    expect(alertify.error).toHaveBeenCalled();
  });

});

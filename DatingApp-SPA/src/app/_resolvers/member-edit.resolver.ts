import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{

    constructor(private userServ: UserService,
        private router: Router, private alertify: AlertifyService,
        private authServ: AuthService) {}


        resolve(route: ActivatedRouteSnapshot): Observable<User> {
            return this.userServ.getUser(this.authServ.decodedToken.nameid).pipe(
                catchError(err => {
                    
                    this.alertify.error('Problem retriving your data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
        }
}
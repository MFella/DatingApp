import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable()
export class MemberDetailResolver implements Resolve<User>{

    constructor(private userServ: UserService,
        private router: Router, private alertify: AlertifyService) {}


        resolve(route: ActivatedRouteSnapshot): Observable<User> {
            return this.userServ.getUser(route.params['id']).pipe(
                catchError(err => {
                    
                    this.alertify.error("Problem retriving data");
                    this.router.navigate(["/members"]);
                    return of(null);
                })
            )
        }
}
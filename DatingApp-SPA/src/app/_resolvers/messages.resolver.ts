import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MessagesResolver implements Resolve<Message[]>{

    pageNo = 1;
    pageSize = 5;
    messageContainer = 'Unread';
    
    constructor(private userServ: UserService,
        private router: Router, private alertify: AlertifyService,
        private authServ: AuthService) {}


        resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
            return this.userServ.getMessages(this.authServ.decodedToken.nameid, this.pageNo, 
                this.pageSize, this.messageContainer).pipe(
                catchError(err => {
                    
                    this.alertify.error("Problem retriving messages");
                    this.router.navigate(["/home"]);
                    return of(null);
                })
            )
        }
}
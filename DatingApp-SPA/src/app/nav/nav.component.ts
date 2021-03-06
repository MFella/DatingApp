import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string;

  constructor(public authServ: AuthService, 
    private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authServ.currentPhotoUrl.subscribe(
      photoUrl => {
        this.photoUrl = photoUrl;
      }
    );

  }

  login(){
    this.authServ.login(this.model).subscribe(next => {

      this.alertify.success('Success of logging!');
    }, error => {
      this.alertify.error(error);
    }, ()=> {
      this.router.navigate(['/members']);
    });
  }

  loggedIn(){
    return this.authServ.loggedIn();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authServ.decodedToken = null;
    this.authServ.currentUser = null;
    this.alertify.message('Logged out!');
    this.router.navigate(['/home']);
  }
}

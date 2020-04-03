import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authServ: AuthService) { }

  ngOnInit() {

  }

  login(){
   
    this.authServ.login(this.model).subscribe(next => {

      console.log('Success of logging!');
    }, error => {
      console.log(`Failed to login: ${error}`);
    })
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(){
    localStorage.removeItem('token');
    console.log('Logged out!');
  }
}

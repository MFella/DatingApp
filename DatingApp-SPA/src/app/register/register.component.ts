import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private authServ: AuthService) { }

  ngOnInit() {
  }

  register(){
      this.authServ.register(this.model).subscribe(() => {

        console.log('success');

      }, err => {

        console.log(err);

      });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authServ: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    },this.passMatchValidator)
  }

  //custom Validator
  passMatchValidator(g: FormGroup)
  {
    return g.get('password').value === g.get('confirmPassword').value ? null : 
    {
      'mismatch': true
    };
  }

  register(){

      // this.authServ.register(this.model).subscribe(() => {

      //   this.alertify.success("Registered successful!");

      // }, err => {

      //   this.alertify.error(err);

      // });
      console.log(this.registerForm.value);
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log('Cancelled');
  }
}

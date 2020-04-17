import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {

  @Input() recipientId: number;
  messages: Message[];
  newMess: any = {};


  constructor(private authServ: AuthService, private userServ: UserService,
      private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    this.userServ.getMessageThread(this.authServ.decodedToken.nameid, this.recipientId)
    .subscribe(mess => {
        this.messages = mess;
      }, err => {
        this.alertify.error(err);
      }
    );
  }

  sendMessage()
  {
    this.newMess.recipientId = this.recipientId;
    this.userServ.sendMessage(this.authServ.decodedToken.nameid, this.newMess)
      .subscribe( (mess: Message) => {
        
        this.messages.unshift(mess);
        this.newMess.content = '';
      }, err => {
        this.alertify.error(err);
      });
  }
}

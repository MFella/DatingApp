import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Message } from '../_models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userServ: UserService, private authServ: AuthService,
      private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
   
  }

  loadMessages() {

    this.userServ.getMessages(this.authServ.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer)
        .subscribe((res: PaginatedResult<Message[]>) => {
          this.messages = res.result;
          this.pagination = res.pagination;
        }, err => {
            this.alertify.error(err);
        });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userServ: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
    
      this.user = data['user'];
    });

  /*Config for @kolkov/ngx-gallery*/     

    this.galleryOptions = [
    {
      width: '500px',
      height: '400px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: '600px',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false
    }
  ];

    this.galleryImages = this.getImages();
    // },
    // {
    //   small: 'assets/img/gallery/2-small.jpeg',
    //   medium: 'assets/img/gallery/2-medium.jpeg',
    //   big: 'assets/img/gallery/2-big.jpeg'
    // },
    // {
    //   small: 'assets/img/gallery/3-small.jpeg',
    //   medium: 'assets/img/gallery/3-medium.jpeg',
    //   big: 'assets/img/gallery/3-big.jpeg'
    // },{
    //   small: 'assets/img/gallery/4-small.jpeg',
    //   medium: 'assets/img/gallery/4-medium.jpeg',
    //   big: 'assets/img/gallery/4-big.jpeg'
    // },
    // {
    //   small: 'assets/img/gallery/5-small.jpeg',
    //   medium: 'assets/img/gallery/5-medium.jpeg',
    //   big: 'assets/img/gallery/5-big.jpeg'
    // }
 




  }

    getImages(){
      const imageUrls = [];
      for (const photo of this.user.photos) {
        imageUrls.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description
        });
      }
      return imageUrls;
    }
  // loadUser(){
  //   this.userServ.getUser(+this.route.snapshot.params['id'])
  //     .subscribe((user: User) => {
  //       this.user = user;
  //     }, err => {
  //       this.alertify.error(err);
  //     });
  // }

}

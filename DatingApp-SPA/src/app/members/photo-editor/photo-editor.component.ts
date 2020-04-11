import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import {environment} from '../../../environments/environment';  
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response: string;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private authServ: AuthService, private userServ: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.initUploader();
  }

  fileOverBase(e: any)
  {
    this.hasBaseDropZoneOver = e;
  }

  initUploader()
  {

    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authServ.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 //10MB
    });
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
 
    this.uploader.onSuccessItem = (item, res, status, head) => {

      if(res)
      {
        const resI: Photo = JSON.parse(res);
        const photo = {
          id: resI.id,
          url: resI.url,
          dateAdded: resI.dateAdded,
          description: resI.description,
          isMain: resI.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo)
  {
    this.userServ.setMainPhoto(this.authServ.decodedToken.nameid,photo.id)
      .subscribe(() => 
      {
        this.currentMain = this.photos.filter( p => p.isMain == true)[0];
        this.currentMain.isMain = false;
        photo.isMain =true;
        this.authServ.changeMemberPhoto(photo.url);
        this.authServ.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authServ.currentUser));
      }, err => {
        this.alertify.error(err);
      })
  }

  deletePhoto(id: number)
  {
    this.alertify.confirm('Are you sure you want to delete this photo?',
    () => {

      this.userServ.deletePhoto(this.authServ.decodedToken.nameid, id)
        .subscribe(() => {
          this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
          this.alertify.success('Photo has been deleted');
        }, err => {
          this.alertify.error('Failed to delete the photo!');
        });
    });
  }
}

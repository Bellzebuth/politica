import { Component, OnInit } from '@angular/core';
import { IDebate } from 'src/app/interfaces/debate';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { DebateService } from 'src/app/services/debate.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-debate-details',
  templateUrl: './debate-details.component.html',
  styleUrls: ['./debate-details.component.scss']
})
export class DebateDetailsComponent implements OnInit {

  debate!: IDebate;
  profil: any;
  mainNews: Array<any> = [];
  commentSide: Boolean = false;
  isLoggedIn = false;
  debateList: any;

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private debateService: DebateService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
  ) {
    
   }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
    this.getDebate();
    this.isLiked();
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
      this.imageService.get(data.data.profilPicture).subscribe( image => {
        data.data.profilPicture = this.arrayBufferToBase64(image);
        this.profil = data.data;
        this.isLoggedIn = !!this.tokenStorageService.getToken();
      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    });
  }

  getDebate() {
    this.route.params.subscribe((params: Params) => {
      this.route.data.subscribe(async () => {
        this.debateService.get(params['_id']).subscribe(data => {
          this.debate = data.data;
          this.imageService.get(this.debate.user.profilPicture).subscribe((image: Iterable<number>) => {
            this.debate.user.profilPicture = this.arrayBufferToBase64(image);
          });
          this.debate.comment.forEach((comment, indexComment) => {
            this.imageService.get(comment.user.profilPicture).subscribe((image: Iterable<number>) => {
              this.debate.comment[indexComment].user.profilPicture = this.arrayBufferToBase64(image);
            });
          });
          },
          error => {
            console.log(error);
          });
      })
    })
  }

  formatDate(date: { getDate: () => any; getMonth: () => number; getFullYear: () => any; }) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  padTo2Digits(num: { toString: () => string; }) {
    return num.toString().padStart(2, '0');
  }

  isLiked() {
    //TODO verifier quels commentaires ont été likés
  }

  interest(debate_id: String){
    //TODO Modifier liste debat_liked de l'utilisateur et ajouter un au score du débat
    
  }

  onLike(debate_id: String, comment_id: String){
    //TODO Vérifier si c'est un like ou un dislike
  }

  like(debate_id: String, comment_id: String){
    //TODO liker le commentaire
  }

  dislike(debate_id: String, comment_id: String){
    //TODO disliker le commentaire
  }

  submit(form: NgForm, debate_id: String) {
    if (form.value.comment.length != 0){
      this.debateService.get(debate_id).subscribe((data) => {
        data.data.comment.push({
          user: {
            id: this.tokenStorageService.getUser().id,
            username: this.profil.username,
            profilPicture: this.profil.profilPicture,
          },
          comment: form.value.comment,
          side: this.commentSide,
          score: 0,
          dateTime: new Date(),
        });
        this.sortByScore(data.data.comment);
        this.debateService.update(data.data._id, data.data).subscribe((data: any) => {
          this.getDebate();
        })
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  sortByScore(list: Array<any>) {
    list.sort(function (a, b) {
      var key1 = a.score;
      var key2 = b.score;
  
      if (key1 > key2) {
          return -1;
      } else if (key1 == key2) {
          return 0;
      } else {
          return 1;
      }
    });
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }  

  arrayBufferToBase64( buffer: Iterable<number> ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
}

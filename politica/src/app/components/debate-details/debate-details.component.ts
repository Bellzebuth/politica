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
import { CommentService } from 'src/app/services/comment.service';
import { IComment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-debate-details',
  templateUrl: './debate-details.component.html',
  styleUrls: ['./debate-details.component.scss']
})
export class DebateDetailsComponent implements OnInit {

  debate!: IDebate;

  profil: any;

  commentSide: Boolean = false;

  mainNews: Array<any> = [];
  
  isLoggedIn = false;

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private debateService: DebateService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private commentService: CommentService,
  ) {
    
   }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
    this.getDebate();
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
      this.profil = data.data;
      this.isLoggedIn = !!this.tokenStorageService.getToken();
    }, error => {
      console.log(error);
    });
  }

  getDebate() {
    this.route.params.subscribe((params: Params) => {
      this.route.data.subscribe(async () => {
        this.debateService.get(params['_id']).subscribe(data => {
          this.debate = data.data;
          this.commentService.getCommentDebate(this.debate._id).subscribe(data => {
            this.debate.comment = data.data;
            this.sortByScore(this.debate.comment);
          })
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

  sortByDate(list: Array<any>) {
    list.sort(function (a, b) {
      var key1 = a.dateTime;
      var key2 = b.dateTime;
  
      if (key1 > key2) {
          return -1;
      } else if (key1 == key2) {
          return 0;
      } else {
          return 1;
      }
    });
  }

  isDebateLiked(debate_id: string) {
    if (this.profil.debate_liked_id.includes(debate_id)){
      return true;
    } else {
      return false;
    }
  }

  likeDebate(debate_id: string, debate: IDebate){
    if (this.isDebateLiked(debate_id)) {
      this.profil.debate_liked_id.splice(this.profil.debate_liked_id.indexOf(debate_id), 1);
      debate.interest_score -= 1;
      this.authService.update(this.tokenStorageService.getUser().id, this.profil).subscribe();
      this.debateService.update(debate_id, debate).subscribe();
    } else {
      this.profil.debate_liked_id.push(debate_id);
      debate.interest_score += 1;
      this.authService.update(this.tokenStorageService.getUser().id, this.profil).subscribe();
      this.debateService.update(debate_id, debate).subscribe();
    }
  }

  isCommentLiked(comment_id: string){
    if (this.profil.comment_liked.includes(comment_id)){
      return true;
    } else {
      return false;
    }
  }

  like(comment_id: string, comment: IComment){
    if (this.profil.comment_liked.includes(comment_id)) {
      this.profil.comment_liked.splice(this.profil.comment_liked.indexOf(comment_id), 1);
      comment.interest_score -= 1;
      this.authService.update(this.tokenStorageService.getUser().id, this.profil).subscribe();
      this.commentService.update(comment_id, comment).subscribe();
    } else {
      this.profil.comment_liked.push(comment_id);
      comment.interest_score += 1;
      this.authService.update(this.tokenStorageService.getUser().id, this.profil).subscribe();
      this.commentService.update(comment_id, comment).subscribe();
    }
  }

  submit(form: NgForm, debate_id: String) {
    if (form.value.comment.length != 0){
      const comment = {
        debate_id: debate_id,
        user_id: this.tokenStorageService.getUser().id,
        user: {
          username: this.profil.username,
          profilPicture: this.profil.profilPicture,
        },
        politicalParti: this.profil.politicalParti,
        interest_score: 1,
        comment: form.value.comment,
        side: this.commentSide,
        dateTime: new Date(),
      }
      this.commentService.create(comment).subscribe(() => {
        this.getDebate();
      });
    }
  }

  sortByScore(list: Array<any>) {
    list.sort(function (a, b) {
      var key1 = a.interest_score;
      var key2 = b.interest_score;
  
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

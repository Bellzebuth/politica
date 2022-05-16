import { Component, OnInit } from '@angular/core';
import { IDebate } from 'src/app/interfaces/debate';
import { INews } from 'src/app/interfaces/news';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DebateService } from 'src/app/services/debate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { IComment } from 'src/app/interfaces/comment';
import { VoteService } from 'src/app/services/vote.service';
import { IVote } from 'src/app/interfaces/vote';

@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.scss']
})
export class DebateComponent implements OnInit {

  debateList: Array<IDebate> = [];
  
  profil!: IUser;

  newPost: String | undefined;
  commentSide: Boolean = false;

  voteEnded: Array<IVote> = [];

  isLoggedIn = false;

  widthBar = [{
    for: "0%",
    against: "0%"
  },{
    for: "0%",
    against: "0%"
  },{
    for: "0%",
    against: "0%"
  }]; 

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private debateService: DebateService,
    private sanitizer: DomSanitizer,
    private commentService: CommentService,
    private voteService: VoteService,
    ) {}

  ngOnInit(): void {
    this.getVoteResult();
    this.getAllDebate();
    this.getUser(this.tokenStorageService.getUser().id);
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
        this.profil = data.data;
        this.isLoggedIn = !!this.tokenStorageService.getToken();
      }, error => {
      console.log(error);
    });
  }

  getAllDebate() {
    this.debateService.getAll().subscribe((data) => {
      this.debateList = data.data;
      this.sortByDate(this.debateList);
      this.debateList.forEach(debate => {
        this.commentService.getCommentDebate(debate._id).subscribe(data => {
          debate.comment = data.data;
          this.sortByScore(debate.comment);
        })
      });
    }, error => {
      console.log(error);
    });
  }

  getTheTwoFirstElement(list: Array<any>) {
    if (list.length >= 2){
      return [list[0], list[1]];
    } else {
      return list;
    }
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

  formatDate(date: any) {
    const frenchDate = date.toString().split('T')[0].split('-');
    return [
      frenchDate[2],
      frenchDate[1],
      frenchDate[0]
    ].join('/');
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

  like(comment: IComment){
    if (this.profil.comment_liked.includes(comment._id)) {
      this.profil.comment_liked.splice(this.profil.comment_liked.indexOf(comment._id), 1);
      comment.interest_score -= 1;
      this.authService.update(this.tokenStorageService.getUser().id, this.profil).subscribe();
      this.commentService.update(comment._id, comment).subscribe(() => {
      });
    } else {
      this.profil.comment_liked.push(comment._id);
      comment.interest_score += 1;
      this.authService.update(this.tokenStorageService.getUser().id, this.profil).subscribe();
      this.commentService.update(comment._id, comment).subscribe(() => {
      });
    }
  }

  post() {
    const debate = {
      user_id: this.tokenStorageService.getUser().id,
      user: {
        username: this.profil.username,
        profilPicture: this.profil.profilPicture,
      },
      politicalParti: this.profil.politicalParti,
      interest_score: 0,
      message: this.newPost,
      comment: [],
      dateTime: new Date()
    }
    this.debateService.create(debate).subscribe((data) => {
      this.newPost = "";
      this.getAllDebate();
    }, error => {
      console.log(error);
    });
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
        interest_score: 0,
        comment: form.value.comment,
        side: this.commentSide,
        dateTime: new Date(),
      }
      this.commentService.create(comment).subscribe(() => {
        this.getAllDebate();
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

  getVoteResult() {
    this.voteService.getFinishedVote().subscribe(data => {
      if (data.data.length < 3) {
        this.voteEnded = data.data;
      } else {
        this.voteEnded = [ data.data[0], data.data[1], data.data[2]];
      }
      this.voteEnded.forEach((vote, index) => {
        this.widthBar[index].for = this.percentage(vote.for_vote, vote.against_vote).toString() + '%';
        this.widthBar[index].against = this.percentage(vote.for_vote, vote.against_vote).toString() + '%';
      });
    })
  }

  percentage(num: number, den: number) {
    return ((num / (den + num) * 100).toFixed(2));
  }

  isMyComment(comment: IComment) {
    if (comment.user_id === this.tokenStorageService.getUser().id){
      return true;
    } else {
      return false;
    }
  }

  deleteComment(debate: IDebate, comment: IComment) {
    this.commentService.delete(comment._id).subscribe();
    debate.comment.splice(debate.comment.indexOf(comment), 1);
  }
}


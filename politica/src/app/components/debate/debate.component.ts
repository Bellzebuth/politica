import { Component, OnInit } from '@angular/core';
import { IDebate } from 'src/app/interfaces/debate';
import { INews } from 'src/app/interfaces/news';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DebateService } from 'src/app/services/debate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.scss']
})
export class DebateComponent implements OnInit {

  debateList: Array<IDebate> = [];
  mainNews: Array<any> = [];
  profil!: IUser;
  imageName: string = "";

  newPost: String | undefined;
  commentSide: Boolean = false;

  isLoggedIn = false;

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private debateService: DebateService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    ) {}

  ngOnInit(): void {
    this.mainNews.push({
      _id: "1",
      title: "Titre de la news",
      content: "Contenu de l'info",
      source: "Le Monde",
      image: "../../../assets/exempleNews.jpeg",
      id_journalist: "1",
      dateTime: this.formatDate(new Date()),
    });
    this.getAllDebate();
    this.getUser(this.tokenStorageService.getUser().id);
    this.isLiked();
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
      this.imageName = data.data.profilPicture;
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

  getAllDebate() {
    this.debateService.getAll().subscribe((data) => {
      this.debateList = data.data;
      data.data.forEach((debate: IDebate, index: number) => {
        this.imageService.get(debate.user.profilPicture).subscribe(image => {
          this.debateList[index].user.profilPicture = this.arrayBufferToBase64(image);
        });
        debate.comment.forEach((comment, indexComment) => {
          this.imageService.get(comment.user.profilPicture).subscribe(image => {
            this.debateList[index].comment[indexComment].user.profilPicture = this.arrayBufferToBase64(image);
          });
        });
      });
      this.sortByDate(this.debateList);
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
    
  }

  interest(debate_id: String){
    //TODO Modifier liste debat_liked de l'utilisateur
  }

  onLike(debate_id: String, comment_id: String){
    if (this.profil.comment_liked.filter((e: { debate: String; comment: String; }) => e.debate === debate_id && e.comment === comment_id).length > 0) {
      this.dislike(debate_id, comment_id);
    } else {
      this.like(debate_id, comment_id);
    }
  }

  like(debate_id: String, comment_id: String){
    this.profil.comment_liked.push(
      {
        debate: debate_id,
        comment: comment_id,
      }
    )
    this.debateList.forEach((debate, debate_index) => {
      if (debate._id === debate_id) {
        debate.comment.forEach((debate_comment, comment_index) => {
          if (debate_comment.id === comment_id){
            this.debateList[debate_index].comment[comment_index].score += 1;
            this.debateList[debate_index].comment[comment_index].liked = true;
          }
        })
      }
    })
  }

  dislike(debate_id: String, comment_id: String){
    this.profil.comment_liked.forEach((comment_liked: { debate: String; comment: String; }, index: number) => {
      if (comment_liked.debate === debate_id && comment_liked.comment === comment_id) {
        this.profil.comment_liked.splice( this.profil.comment_liked.indexOf(comment_liked, 1));
        this.debateList.forEach((debate, debate_index) => {
          if (debate._id === debate_id) {
            debate.comment.forEach((debate_comment, comment_index) => {
              if (debate_comment.id === comment_id){
                this.debateList[debate_index].comment[comment_index].score -= 1;
                this.debateList[debate_index].comment[comment_index].liked = false;
              }
            })
          }
        })
      }
    })
  }

  post() {
    const debate = {
      user: {
        id: this.tokenStorageService.getUser().id,
        username: this.profil.username,
        profilPicture: this.imageName,
      },
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
      this.debateService.get(debate_id).subscribe((data) => {
        data.data.comment.push({
          user: {
            id: this.tokenStorageService.getUser().id,
            username: this.profil.username,
            profilPicture: this.imageName,
          },
          comment: form.value.comment,
          side: this.commentSide,
          score: 0,
          dateTime: new Date(),
        });
        this.sortByScore(data.data.comment);
        this.debateService.update(data.data._id, data.data).subscribe((data: any) => {
          this.getAllDebate();
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


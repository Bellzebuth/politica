import { Component, OnInit } from '@angular/core';
import { IDebate } from 'src/app/interfaces/debate';
import { INews } from 'src/app/interfaces/news';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DebateService } from 'src/app/services/debate.service';

@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.scss']
})
export class DebateComponent implements OnInit {

  debateList: Array<IDebate> = [];
  mainNews: Array<any> = [];
  profil!: IUser;

  newPost: String | undefined;
  commentSide: Boolean = true;
  sideOptions: Array<any> = [{icon: 'pi pi-thumbs-up', colorClass: "green", jusitfy: true}, {icon: 'pi pi-thumbs-down', colorClass: "red", justify: false}];

  isLoggedIn = false;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private debateServie: DebateService) { }

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
      this.profil = data.data;
      this.isLoggedIn = !!this.tokenStorageService.getToken();
    }, error => {
      console.log(error);
    });
  }

  getAllDebate() {
    this.debateServie.getAll().subscribe((data) => {
      this.debateList = data.data;
      this.sortByDate(this.debateList);
    }, error => {
      console.log(error);
    });
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
    this.profil.debate_liked_id.forEach((debate_liked_id: String) => {
      this.debateList.forEach(debate => {
        if (debate_liked_id === debate._id) {
          debate.liked = true;
        }
      })
    });
    this.profil.comment_liked.forEach((comment_liked: any) => {
      this.debateList.forEach(debate => {
        if (comment_liked.debate === debate._id){
          debate.comment.forEach(element => {
            if (comment_liked.comment === element.id){
              element.liked = true;
            }
          });
        }
      })
    });
  }

  interest(debate_id: String){
    //TODO Modifier liste debat_liked de l'utilisateur
    if (this.profil.debate_liked_id.includes(debate_id)){
      this.profil.debate_liked_id.splice(this.profil.debate_liked_id.indexOf(debate_id), 1);
      this.debateList.forEach( debate => {
        if (debate._id === debate_id) {
          debate.liked = false;
          debate.interest_score -= 1;
        }
      })
    } else {
      this.profil.debate_liked_id.push(debate_id);
      this.debateList.forEach( debate => {
        if (debate._id === debate_id) {
          debate.liked = true;
          debate.interest_score += 1;
        }
      })
    }
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
        profilPicture: this.profil.profilPicture,
      },
      interest_score: 0,
      message: this.newPost,
      comment: [],
      dateTime: new Date()
    }
    this.debateServie.create(debate).subscribe((data) => {
      this.newPost = "";
      this.getAllDebate();
    }, error => {
      console.log(error);
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { IDebate } from 'src/app/interfaces/debate';
import { INews } from 'src/app/interfaces/news';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-debate',
  templateUrl: './debate.component.html',
  styleUrls: ['./debate.component.scss']
})
export class DebateComponent implements OnInit {

  debateList: Array<IDebate> = [];
  mainNews: Array<any> = [];
  profil: any;
  newPost: String | undefined;
  commentSide: Boolean = true;
  sideOptions: Array<any> = [{icon: 'pi pi-thumbs-up', colorClass: "green", jusitfy: true}, {icon: 'pi pi-thumbs-down', colorClass: "red", justify: false}];

  constructor() { }

  ngOnInit(): void {
    this.profil = {
      username: "username",
      lastName: "lastname",
      firstName: "fisrtname",
      genre: "male",
      email: "email",
      password: "pasword",
      politicalParty: "party",
      age: 25,
      profilPicture: "../../../assets/PDP.png",
      debate_liked_id:["1", "7"],
      comment_liked: [{
        debate: "1",
        comment: "1",
      },{
        debate: "2",
        comment: "2",
      }],
      journalist: false,
      image: "we don't care",
      indicator: 3
    };
    this.debateList.push({
      _id: "1",
      id_user: "1",
      message: "Je pense PATATA",
      interest_score: 548,
      comment: [{
        id:"1",
        id_user:"2",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        side: false,
        score:7,
        liked: false,
      },{
        id:"2",
        id_user:"2",
        content:"Tu as raison car ...",
        side: true,
        score:5,
        liked: false,
      }],
      dateTime: new Date(),
      liked: false,
    });
    this.debateList.push({
      _id: "2",
      id_user: "1",
      interest_score: 196,
      message: "Je pense PATATA",
      comment: [{
        id:"1",
        id_user:"2",
        content:"Tu as tort parce que ...",
        side: false,
        score:7,
        liked: false,
      },{
        id:"2",
        id_user:"2",
        content:"Tu as raison car ...",
        side: true,
        score:5,
        liked: false,
      }],
      dateTime: new Date(),
      liked:false,
    });
    this.mainNews.push({
      _id: "1",
      title: "Titre de la news",
      content: "Contenu de l'info",
      source: "Le Monde",
      image: "../../../assets/exempleNews.jpeg",
      id_journalist: "1",
      dateTime: this.formatDate(new Date()),
    });
    this.isLiked();
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
    //TODO: Ajouter post debat
  }
}


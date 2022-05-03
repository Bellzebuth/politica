import { Component, OnInit } from '@angular/core';
import { IDebate } from 'src/app/interfaces/debate';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-debate-details',
  templateUrl: './debate-details.component.html',
  styleUrls: ['./debate-details.component.scss']
})
export class DebateDetailsComponent implements OnInit {

  debate: IDebate;
  profil: any;
  mainNews: Array<any> = [];
  commentSide: Boolean = true;
  sideOptions: Array<any> = [{icon: 'pi pi-thumbs-up', colorClass: "green", jusitfy: true}, {icon: 'pi pi-thumbs-down', colorClass: "red", justify: false}];

  constructor() {
    this.debate = {
      _id: "1",
      id_user: "1",
      message: "Je pense PATATA",
      interest_score: 548,
      comment: [{
        id:"1",
        id_user:"2",
        content:"Tu as tort parce que uehzfoheizjfezjdpjzodokzdhiehdie zohdhezoidheizhdiehzoidhezhdiehdoiezoidhiehzdiezoidheoizhdoizhdoz",
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
    };
   }

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
    this.mainNews.push({
      _id: "1",
      title: "Titre de la news",
      content: "Contenu de l'info",
      source: "Le Monde",
      image: "../../../assets/exempleNews.jpeg",
      id_journalist: "1",
      dateTime: this.formatDate(new Date()),
    });
    /**
     * this.route.params.subscribe((params: Params) => {
      this.route.data.subscribe(async () => {
        await this.cookieServ.get(params['_id']).subscribe(
          data => {
            this.cookie = data.data;
          },
          error => {
            console.log(error);
          });
      })
    })
     */
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
}

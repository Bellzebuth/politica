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
      journalist: true,
      image: "we don't care",
      indicator: 3
    };
    this.debateList.push({
      _id: "1",
      id_user: "1",
      message: "Je pense PATATA",
      comment: [{
        id:1,
        content:"Tu as tort parce que ...",
        score:7,
      },{
        id:2,
        content:"Tu as raison car ...",
        score:5,
      }],
      dateTime: new Date(),
    });
    this.debateList.push({
      _id: "1",
      id_user: "1",
      message: "Je pense PATATA",
      comment: [{
        id:1,
        content:"Tu as tort parce que ...",
        score:7,
      },{
        id:2,
        content:"Tu as raison car ...",
        score:5,
      }],
      dateTime: new Date(),
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
}


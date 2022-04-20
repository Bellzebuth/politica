import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/interfaces/news';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  
  newsList: Array<any> = [];
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
    this.newsList.push({
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

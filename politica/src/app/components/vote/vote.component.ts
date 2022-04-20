import { Component, OnInit } from '@angular/core';
import { IVote } from 'src/app/interfaces/vote';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  voteList: Array<IVote> = [];
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
    this.voteList.push({
      _id: '1',
      subject: 'Le vote à 16 ans',
      for_vote: 16,
      against_vote: 154,
      author: '5',
      dateTime: new Date(),
      closeDate: new Date(),
    });
    this.voteList.push({
      _id: '2',
      subject: 'la retraite a 65 ans',
      for_vote: 168,
      against_vote: 127,
      author: '15',
      dateTime: new Date(),
      closeDate: new Date(),
    });
  }
}

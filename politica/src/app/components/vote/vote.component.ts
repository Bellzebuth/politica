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
  horizontalOptions: any;

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
      votedList: [{
        vote: "1",
        side: true,
      }],
      journalist: false,
      image: "we don't care",
      indicator: 3
    };
    this.voteList.push({
      _id: '1',
      labels: 'Le vote à 16 ans',
      for_vote: 16,
      against_vote: 154,
      percentageFor: Math.round((16 / (16+154)) * 100),
      percentageAgainst: Math.round((154 / (16+154)) * 100),
      author: '5',
      dateTime: new Date(),
      closeDate: new Date(),
      voted: true,
    });
    this.voteList.push({
      _id: '2',
      labels: 'la retraite a 65 ans',
      for_vote: 168,
      against_vote: 127,
      percentageFor: Math.round((168 / (168+127)) * 100),
      percentageAgainst: Math.round((127 / (168+127)) * 100),
      author: '15',
      dateTime: new Date(),
      closeDate: new Date(),
      voted: false,
    });
    
  }
}

import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { IVote } from 'src/app/interfaces/vote';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit {

  voteList: Array<IVote> = [];
  profil!: IUser;
  horizontalOptions: any;

  isLoggedIn = false;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
    this.voteList.push({
      _id: '1',
      label: 'Le vote à 16 ans',
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
      label: 'la retraite a 65 ans',
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

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
      this.profil = data.data;
      this.isLoggedIn = !!this.tokenStorageService.getToken();
    }, error => {
      console.log(error);
    });
  }
}

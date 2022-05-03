import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { DbUser } from 'src/app/services/model/db-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profil: IUser = {
    username: "",
    lastName: "",
    firstName: "",
    genre: "",
    email: "",
    password: "",
    politicalParty: "",
    age: 0,
    profilPicture: "",
    debate_liked_id: [],
    comment_liked: [],
    votedList: [],
    journalist: false,
    image: "",
    indicator: 0
  };

  checked1: boolean = false;
  checked2: boolean = false;
  checked3: boolean = true;
  checked4: boolean = false;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
      this.profil = data.data;
      console.log(this.profil);
      if (this.profil.profilPicture == "") {
        console.log(this.profil);
        this.profil.profilPicture =  '../../assets/PDP.png';
      } 
    }, error => {
      console.log(error);
    });
  }

}

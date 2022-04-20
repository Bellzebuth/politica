import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profil: any;

  checked1: boolean = false;
  checked2: boolean = false;
  checked3: boolean = true;
  checked4: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.profil = {
      username: "username",
      lastName: "lastname",
      firstName: "fisrtname",
      genre: "male",
      email: "email",
      password: "pasword",
      politicalParty: "Les républicains",
      age: 25,
      profilPicture: "../../../assets/PDP.png",
      journalist: false,
      image: "we don't care",
      indicator: 3
    };
  }

}

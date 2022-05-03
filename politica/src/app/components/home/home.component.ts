import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";
import { DbUser } from 'src/app/services/model/db-user';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  displayRegister: boolean = false;
  displayLogin: boolean = false;

  username: string = '';
  firstname : string = '';
  lastname: string = '';
  email : string = '';
  password: string = '';
  genre : string = '';
  age!: number;
  politicalParti : string = '';

  genreOptions: Array<string>;
  partiOptions: Array<string>;

  emailValid: boolean= true;
  passwordValid: boolean= true;

  constructor(private messageService: MessageService,
    private authService: AuthService,
    private readonly router: Router,
    private auth: Auth) { 
    this.genreOptions = [ 'Homme', 'Femme', 'Je m\'abstiens'];
    this.partiOptions = [ 'Je m\'abstiens', 'Indécis', 'Reconquête', 'RN', 'LR', 'LREM', 'MoDem', 'PS', 'EELV', 'LFI', 'PCF'];
  }

  ngOnInit(): void {
  }

  showRegisterDialog() {
    this.displayRegister = true;
  }

  showLoginDialog() {
    this.displayLogin = true;
  }

  showResponse(event: any) {
    this.messageService.add({severity:'info', summary:'Success', detail: 'User Responded', sticky: true});
  }

  login() {
    if (this.checkEmail(this.email) && this.password.length > 6){
      this.authService
      .login(this.email, this.password)
      .then(() => {
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin'])
        } else {
          if (this.auth.currentUser){
            const id = this.auth.currentUser.uid;
            this.router.navigate(['/debate']);
            this.displayLogin = false;
          }
        }
      }
      )
      .catch((e) => console.log(e.message));
    } else if (this.checkEmail(this.email)) {
      this.passwordValid = false;
      this.password = "";
    } else {
      this.emailValid = false;
      this.password = "";
    }
  }

  register() {
    if (this.checkEmail(this.email) && this.password.length > 6){
      this.authService
      .register({
        username: this.username,
        lastName: this.lastname,
        firstName: this.firstname,
        genre: this.genre,
        email: this.email,
        password: this.password,
        politicalParty: this.politicalParti,
        age: this.age,
        profilPicture: "",
        debate_liked_id: [],
        comment_liked: [],
        votedList: [],
        journalist: false,
        image: "",
        indicator: 5,
      })
      .then(() => {
        this.displayRegister = false;
        this.router.navigate(['/profil']);
      })
      .catch((e) => console.log(e.message));
    } else if (this.checkEmail(this.email)) {
      this.passwordValid = false;
      this.password = "";
    } else {
      this.emailValid = false;
      this.password = "";
    }
  }

  checkEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";
import { DbUser } from 'src/app/services/model/db-user';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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

  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private messageService: MessageService,
    private authService: AuthService,
    private readonly router: Router,
    private tokenStorage: TokenStorageService
    ) { 
    this.genreOptions = [ 'Homme', 'Femme', 'Je m\'abstiens'];
    this.partiOptions = [ 'Je m\'abstiens', 'Indécis', 'Reconquête', 'RN', 'LR', 'LREM', 'MoDem', 'PS', 'EELV', 'LFI', 'PCF'];
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
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
    this.authService.login(this.email, this.password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/profil']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  register() {
    const user = {
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
      indicator: 5
    }
    this.authService.register(user).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/profil']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  checkEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
}

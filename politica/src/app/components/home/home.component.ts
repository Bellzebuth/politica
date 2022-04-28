import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  displayRegister: Boolean = false;
  displayLogin: Boolean = false;

  pseudo: String = '';
  firstname : String = '';
  lastname: String = '';
  email : String = '';
  password: String = '';
  genre : String = '';
  age!: number;
  politicalParti : String = '';

  genreOptions: Array<String>;
  partiOptions: Array<String>;

  constructor(private messageService: MessageService) { 
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
    this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
  }

  login() {
    this.displayLogin = false;
    window.location.replace('/debate');
  }

  register() {
    this.displayRegister = false;
    window.location.replace('/profil');
  }
}

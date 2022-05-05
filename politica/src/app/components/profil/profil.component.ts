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

  profil!: IUser;

  isLoggedIn = false;

  darkModeOK = false;

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
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

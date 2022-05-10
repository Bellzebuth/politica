import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  profil!: IUser;

  isLoggedIn = false;

  darkModeOK = false;

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private sanitizer: DomSanitizer,
    private imageServ: ImageService,
    ) {
  }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
      this.imageServ.get(data.data.profilPicture).subscribe( image => {
        data.data.profilPicture = this.arrayBufferToBase64(image);
        this.profil = data.data;
        this.isLoggedIn = !!this.tokenStorageService.getToken();
      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    });
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }  

  arrayBufferToBase64( buffer: Iterable<number> ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }
}

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from "@angular/router";
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ImageService } from 'src/app/services/image.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  profilPicture: string = '';

  genreOptions: Array<string>;
  partiOptions: Array<string>;

  emailValid: boolean= true;
  passwordValid: boolean= true;

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  isLoggedIn = false;
  isLoginFailed = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private messageService: MessageService,
    private authService: AuthService,
    private readonly router: Router,
    private tokenStorage: TokenStorageService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer,
    ) { 
    this.genreOptions = [ 'Homme', 'Femme'];
    this.partiOptions = [ 'Sans parti', 'Indécis', 'Reconquête', 'RN', 'LR', 'LREM', 'MoDem', 'PS', 'EELV', 'LFI', 'PCF'];
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
        if (this.tokenStorage.getUser().roles == 'ROLE_ADMIN'){
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/debate']);
        }
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
      politicalParti: this.politicalParti,
      age: this.age,
      profilPicture: "",
      debate_liked_id: [],
      comment_liked: [],
      votedList: [],
      journalist: false,
      image: "",
      indicator: 5,
      shareOne: true,
      shareAll: true,
      shareApp: true,
      darkMode: false,
    }
    this.imageService.get(this.currentFile?.name).subscribe(image => {
      user.profilPicture = this.arrayBufferToBase64(image);
      this.authService.register(user).subscribe({
        next: data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.login();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    })
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

  checkEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.imageService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.fileInfos = this.imageService.getFiles();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }
          });
      }
    }
  }
}

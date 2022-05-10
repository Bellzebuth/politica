import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { IVote } from 'src/app/interfaces/vote';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VoteService } from 'src/app/services/vote.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';

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

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private voteService: VoteService,
    private sanitizer: DomSanitizer,
    private imageServ: ImageService,
  ) {}

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
    this.getVote();
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

  getVote() {
    this.voteService.getAll().subscribe((data) => {
      this.voteList = data.data;
    }, error => {
      console.log(error);
    });
  }

  post() {
    const vote = {
      label: "Vote test",
      for_vote: 0,
      against_vote: 0,
      author: "amaterasu",
      dateTime: new Date(),
      closeDate: new Date(),
    }
    this.voteService.create(vote).subscribe((data) => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  updateVote(bool: boolean, vote_id: string){
    this.voteService.get(vote_id).subscribe((data) => {
      if (bool) {
        data.data.for_vote +=1;
      } else {
        data.data.against_vote +=1;
      }
      this.voteService.update(vote_id, data.data).subscribe(() => {
        this.getVote()
      }, error => {
        console.log(error);
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
}

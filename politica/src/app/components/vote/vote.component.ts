import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { IVote } from 'src/app/interfaces/vote';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { VoteService } from 'src/app/services/vote.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  providers: [MessageService]
})
export class VoteComponent implements OnInit {

  voteList: Array<IVote> = [];
  profil!: IUser;
  horizontalOptions: any;

  isLoggedIn = false;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private voteService: VoteService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
        this.profil = data.data;
        this.isLoggedIn = !!this.tokenStorageService.getToken();
        this.getVote();
      }, error => {
      console.log(error);
    });
  }

  getVote() {
    this.voteList = [];
    this.voteService.getAll().subscribe((data) => {
      data.data.forEach((vote: IVote) => {
        if (!this.profil.votedList.includes(vote._id)){
          this.voteList.push(vote);
        }
      });
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
        this.profil.votedList.push(vote_id);
        this.authService.update(this.tokenStorageService.getUser().id, this.profil).subscribe(() => {
          this.addSingle(true, " Vous avez voté avec succès");
          this.getVote();
        }, error => {
          this.addSingle(false, "Une erreur s'est produite");
        });
      }, error => {
        this.addSingle(false, "Une erreur s'est produite");
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

  addSingle(bool: Boolean, message: string) {
    if (bool) {
      this.messageService.add({severity:'success', summary:'A voté !', detail:message});
    } else {
      this.messageService.add({severity:'error', summary:'Error Message', detail: message});
    }
  }

  clear() {
    this.messageService.clear();
  }
}

import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';
import { IDebate } from 'src/app/interfaces/debate';
import { DebateService } from 'src/app/services/debate.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ProfilComponent implements OnInit {

  profil!: IUser;
  debateList: Array<IDebate> = [];

  journalistImage: string ="";
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  
  isLoggedIn = false;

  darkModeOK = false;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private debateService: DebateService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private commentService: CommentService,
    ) {
  }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
    this.getAllUserDebate();
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
        this.profil = data.data;
        this.isLoggedIn = !!this.tokenStorageService.getToken();
      }, error => {
      console.log(error);
    });
  }

  getAllUserDebate() {
    this.debateService.getUserDebate(this.tokenStorageService.getUser().id).subscribe(data => {
      this.debateList = data.data;
      this.debateList.forEach(debate => {
        this.commentService.getCommentDebate(debate._id).subscribe(data => {
          debate.comment = data.data;
        })
      })
    }, error => {
      console.log(error);
    })
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  isDebateLiked(debate_id: string) {
    if (this.profil.debate_liked_id.includes(debate_id)){
      return true;
    } else {
      return false;
    }
  }

  likeDebate(debate_id: string){
    if (this.isDebateLiked(debate_id)) {
      this.profil.debate_liked_id.splice( this.profil.debate_liked_id.indexOf(debate_id), 1);
      this.updateUser();
      this.debateService.get(debate_id).subscribe(data => {
        data.data.interest_score -= 1;
        this.debateService.update(debate_id, data.data).subscribe( data => {
          this.getAllUserDebate();
        }, error => {
          console.log(error);
        })
      })
    } else {
      this.profil.debate_liked_id.push(debate_id);
      this.updateUser();
      this.debateService.get(debate_id).subscribe(data => {
        data.data.interest_score += 1;
        this.debateService.update(debate_id, data.data).subscribe( data => {
          this.getAllUserDebate();
        }, error => {
          console.log(error);
        })
      })
    }
  }

  updateUser() {
    this.authService.update(this.tokenStorageService.getUser().id, this.profil).subscribe();
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir devenir journaliste ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.upload();
          this.messageService.add({severity:'success', summary:'Bravo', detail:'Vous êtes désormais journaliste'});
        },
        reject: (type: any) => {
          this.messageService.add({severity:'warn', summary:'Refus', detail:'Vous avez annulé la demande'});
        }
    });
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
              this.profil.journalist = true;
              this.updateUser();
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
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.replace('');
  }
}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { NgForm } from '@angular/forms';
import { VoteService } from 'src/app/services/vote.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit {

  userList!: Array<IUser>;
  closeDate!: Date;
  msgs: Array<any> = [];
  voteLabel: string = "";

  constructor(
    private authService: AuthService,
    private voteService: VoteService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAll().subscribe( data => {
      this.userList = data.data;
    }, (error: any) => {
      console.log(error);
    });
  }

  submit(form: NgForm) {
    if (form.value.vote != undefined && this.closeDate != undefined){
      const vote= {
        label: form.value.vote,
        for_vote: 0,
        against_vote: 0,
        author: this.tokenStorage.getUser().id,
        dateTime: new Date(),
        closeDate: new Date(this.closeDate),
      }
      this.voteService.create(vote).subscribe( data => {
        console.log(data);
        this.addSingle(true);
      }, error => {
        console.log(error);
      });
    } else if (this.closeDate === undefined || form.value.vote === undefined) {
      this.addSingle(false);
    }
  }

  addSingle(bool: Boolean) {
    if (bool) {
      this.messageService.add({severity:'success', summary:'Success Message', detail:'Vote ajoutée avec succès'});
    } else {
      this.messageService.add({severity:'error', summary:'Error Message', detail:'Champs manquants'});
    }
  }

  clear() {
    this.messageService.clear();
  }
}

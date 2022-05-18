import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { VoteService } from 'src/app/services/vote.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MessageService } from 'primeng/api';
import { NewsService } from 'src/app/services/news.service';
import { INews } from 'src/app/interfaces/news';

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
  newsList: Array<any> = [];
  display: boolean = false;
  showNews: INews = {
    _id: "",
    title: "",
    content: "",
    source: "",
    sourceName: "",
    image: "",
    journalist: {
      id: "",
      username: ""
    },
    dateTime: new Date(),
  };

  constructor(
    private authService: AuthService,
    private voteService: VoteService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,
    private newsService: NewsService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getNews();
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

  getNews() {
    this.newsService.getAll().subscribe((data) => {
      this.newsList = data.data;
      this.formatDate(data.data[0].dateTime);
      this.sortByDate(this.newsList);
    }, error => {
      console.log(error);
    });
  }

  showDialog(id: any) {
    this.newsService.get(id).subscribe((data) => {
      this.showNews = data.data;
      this.display = true;
    }, error => {
      console.log(error);
    });
  }

  sortByDate(list: Array<any>) {
    list.sort(function (a, b) {
      var key1 = a.dateTime;
      var key2 = b.dateTime;
  
      if (key1 > key2) {
          return -1;
      } else if (key1 == key2) {
          return 0;
      } else {
          return 1;
      }
    });
  }

  formatDate(date: any) {
    const frenchDate = date.toString().split('T')[0].split('-');
    return [
      frenchDate[2],
      frenchDate[1],
      frenchDate[0]
    ].join('/');
  }

  sanitize( url:string ) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  deleteNews(news: INews) {
    this.newsList.splice(this.newsList.indexOf(news), 1);
    this.authService.getUser(news.journalist.id).subscribe(data => {
      data.data.fakeNewsPosted += 1;
      data.data.indicator = 5 - Math.round((data.data.fakeNewsPosted / data.data.newsPosted) * 5);
      this.authService.update(data.data._id, data.data).subscribe();
      this.newsService.delete(news._id).subscribe();
    })
  }
}

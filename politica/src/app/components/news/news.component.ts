import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/interfaces/news';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  
  newsList: Array<any> = [];
  profil!: IUser;
  display: boolean = false;
  showNews: INews = {
    _id: "",
    title: "",
    content: "",
    source: "",
    image: "",
    journalist: {
      id: "",
      username: ""
    },
    dateTime: new Date(),
  };
  isLoggedIn = false;
  newPost = {
    title: "",
    content: "",
    source: "",
  };

  constructor(private authService: AuthService, private tokenStorageService: TokenStorageService, private newsService: NewsService) { }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
    this.getNews();
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
      this.profil = data.data;
      this.isLoggedIn = !!this.tokenStorageService.getToken();
    }, error => {
      console.log(error);
    });
  }

  getNews() {
    this.newsService.getAll().subscribe((data) => {
      this.newsList = data.data;
      this.sortByDate(this.newsList);
      this.formatDate(data.data[0].dateTime);
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

  formatDate(date: string) {
    const frenchDate = date.split('T')[0].split('-');
    return [
      frenchDate[2],
      frenchDate[1],
      frenchDate[0]
    ].join('/');
  }

  showDialog(id: any) {
    //TODO Récupérer la news avec son id
    this.newsList.forEach( news => {
      if (news._id = id) {
        this.showNews = news;
        this.display = true;
      } 
    })
  }

  post(){
    const service = {
      title: this.newPost.title,
      content: this.newPost.content,
      source: this.newPost.source,
      image: "",
      journalist: {
        id: this.tokenStorageService.getUser().id,
        username: this.profil.username,
      },
      dateTime: new Date(),
    }
    this.newsService.create(service).subscribe((data) => {
      this.newPost = {
        title: "",
        content: "",
        source: "",
      };
      this.getNews();
    }, error => {
      console.log(error);
    });
  }
}

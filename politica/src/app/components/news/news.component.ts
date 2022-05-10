import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/interfaces/news';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from 'src/app/services/image.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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
    image: "",
  };

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  imagePreview: any;

  constructor(private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private newsService: NewsService,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.getUser(this.tokenStorageService.getUser().id);
    this.getNews();
  }

  getUser(userId: string) {
    this.authService.getUser(userId).subscribe((data) => {
      this.imageService.get(data.data.profilPicture).subscribe( image => {
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

  getNews() {
    this.newsService.getAll().subscribe((data) => {
      this.newsList = data.data;
      data.data.forEach((news: INews, index: number) => {
        this.imageService.get(news.image).subscribe(image => {
          this.newsList[index].image = this.arrayBufferToBase64(image);
        })
      });
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

  formatDate(date: any) {
    const frenchDate = date.toString().split('T')[0].split('-');
    return [
      frenchDate[2],
      frenchDate[1],
      frenchDate[0]
    ].join('/');
  }
  

  showDialog(id: any) {
    this.newsService.get(id).subscribe((data) => {
      this.showNews = data.data;
      this.display = true;
    }, error => {
      console.log(error);
    });
  }

  post(){
    const service = {
      title: this.newPost.title,
      content: this.newPost.content,
      source: this.newPost.source,
      image: this.currentFile?.name,
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
        image: "",
      };
      this.getNews();
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

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log(this.currentFile);
        this.imageService.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.fileInfos = this.imageService.getFiles();
              if (this.currentFile != undefined){
                this.imageService.get(this.currentFile.name).subscribe(image => {
                  this.imagePreview = this.arrayBufferToBase64(image);
                })
              }
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
}

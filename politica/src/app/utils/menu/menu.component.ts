import { Component, OnInit, HostListener } from '@angular/core';
import { SelectItemGroup } from 'primeng/api/selectitemgroup';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  searchInput!: string;
  texts: string[] = [];
  results: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }


  search(event: { query: any; }) { /*
    this.dnv.title.getResults(event.query).then((data: string[]) => {
      this.results = data;
    }); */
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
     if (window.pageYOffset > 300) {
       let element = document.getElementById('navbar');
       if (element != null) {
        element.classList.add('sticky');
       }
     } else {
      let element = document.getElementById('navbar');
      if (element != null) {
        element.classList.remove('sticky'); 
      }
     }
  }
}

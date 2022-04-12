import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

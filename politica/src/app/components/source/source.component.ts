import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDebate } from 'src/app/interfaces/debate';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  @Input() debate?: any;
  @Input() visible?: boolean;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

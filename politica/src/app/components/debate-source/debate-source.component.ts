import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IVote } from 'src/app/interfaces/vote';

@Component({
  selector: 'app-debate-source',
  templateUrl: './debate-source.component.html',
  styleUrls: ['./debate-source.component.scss']
})
export class DebateSourceComponent implements OnInit {

  @Input() vote?: IVote;
  @Input() visible?: boolean;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

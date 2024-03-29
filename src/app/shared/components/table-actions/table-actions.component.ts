import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
})
export class TableActionsComponent implements OnInit {
  @Input() actions: any[];
  @Output() actionTrigged = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}

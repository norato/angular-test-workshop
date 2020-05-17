import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  matTable: MatTableDataSource<Element>;
  displayedColumns: string[];
  actions = [
    {
      icon: 'clear',
      name: 'delete',
    },
    {
      icon: 'edit',
      name: 'edit',
    },
    {
      icon: 'visibility',
      name: 'view',
    },
  ];

  @Input()
  set dataSource(value: any[]) {
    if (value) {
      this.matTable = new MatTableDataSource<Element>(value);
    }
  }

  @Input()
  set columns(value: string[]) {
    this.displayedColumns = [...value, 'actions'];
  }

  @Output() actionDispatch = new EventEmitter();

  actionTrigged(event, row) {
    this.actionDispatch.emit({
      ...event,
      row,
    });
  }
}

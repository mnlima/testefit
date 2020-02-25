import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  @Input() data = [];
  @Input() tittle = 'Tabela'
  @Input() displayedColumns: DisplayedColumnsModel[];
  @Input() action = false;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  isDelete;

  constructor() { }

  ngOnInit() { }

  selectRow(row) {
    if (this.isDelete) {
      this.isDelete = false;
      return;
    }
    this.onSelect.emit(row);
  }

  delete(row) {
    this.onDelete.emit(row);
    this.isDelete = true;
  }

}

export interface DisplayedColumnsModel {
  label: string;
  field: string;
}

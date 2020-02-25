import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
  @Input() data = [];
  @Input() title = 'Tabela'
  @Input() displayedColumns: DisplayedColumnsModel[];
  @Input() action = false;

  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() onView: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
  
  isAction;

  constructor() { }

  ngOnInit() { }

  selectRow(row) {
    if (this.isAction ) {
      this.isAction = false;
      return;
    }
    this.onSelect.emit(row);
  }

  delete(row) {
    this.onDelete.emit(row);
    this.isAction = true;
  }

  view(row) {
    this.onView.emit(row);
    this.isAction = true;
  }

}

export interface DisplayedColumnsModel {
  label: string;
  field: string;
}

import { Component, OnInit, Input } from '@angular/core';

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


  constructor() { }

  ngOnInit() {
    console.log(this.displayedColumns);
    console.log(this.data);
  }

  onDelete(row) {
    console.log('dele row:',row);
  }

}

export interface DisplayedColumnsModel {
  label: string;
  field: string;
}

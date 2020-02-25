import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() name;
  @Input() title;
  @Input() keys;
  @Input() data;

  constructor(public activeModal: NgbActiveModal) {}

}

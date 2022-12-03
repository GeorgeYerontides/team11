import { Component, Input, OnInit } from '@angular/core';
import { medicalEventModel } from 'src/app/global/models/medicalEvents/medeve.model';
import { ModalService } from 'src/app/global/services/modals/modal.service';

@Component({
  selector: 'app-medical-event-box',
  templateUrl: './medical-event-box.component.html',
  styleUrls: ['./medical-event-box.component.scss']
})
export class MedicalEventBoxComponent implements OnInit {
  @Input() self!:medicalEventModel;
  constructor(private modalService:ModalService) { }

  ngOnInit(): void {
  }
  fillReport(){
    this.modalService.openFill(this.self._id);
  }
}

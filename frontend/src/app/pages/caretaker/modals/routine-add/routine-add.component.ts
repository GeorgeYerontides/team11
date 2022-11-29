import { Component, Input, OnInit } from '@angular/core';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { ModalService } from 'src/app/global/services/modals/notification-modal.service';

@Component({
  selector: 'app-routine-add',
  templateUrl: './routine-add.component.html',
  styleUrls: ['./routine-add.component.scss']
})
export class RoutineAddComponent implements OnInit {
  @Input() self!: RoutineModel;
  constructor(private modalService:ModalService) { }

  ngOnInit(): void {
  }
  close(){
    this.modalService.closeRoutine();
  }
}

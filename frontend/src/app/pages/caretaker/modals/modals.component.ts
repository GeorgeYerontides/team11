import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/global/services/modals/notification-modal.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  title!:string;
  desc!:string;
  type!:number;
  timeSent!:Date;
  constructor(private modalService:ModalService) {
    
   }

  ngOnInit(): void {

    this.title = this.modalService.name;
    this.desc = this.modalService.desc;
    this.type = this.modalService.type;
    this.timeSent = this.modalService.timeSent;
  }

  close(){
    this.modalService.closeDialog();
  }

}

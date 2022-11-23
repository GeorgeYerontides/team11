import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/global/services/modals/notification-modal.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  name!:string;
  desc!:string;
  type!:number;
  constructor(private modalService:ModalService,private socketService:SocketsService) {
    
   }

  ngOnInit(): void {
    console.log('in the jungle');
    this.name = this.modalService.name;
    this.desc = this.modalService.desc;
    this.type = this.modalService.type;
  }

  close(){
    this.modalService.closeDialog();
  }

}

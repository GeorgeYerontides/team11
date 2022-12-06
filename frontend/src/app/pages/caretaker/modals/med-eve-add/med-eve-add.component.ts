import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { medicalEventModel } from 'src/app/global/models/medicalEvents/medeve.model';
import { MedicalEventService } from 'src/app/global/services/medicalEvents/medeve.service';
import { ModalService } from 'src/app/global/services/modals/modal.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-med-eve-add',
  templateUrl: './med-eve-add.component.html',
  styleUrls: ['./med-eve-add.component.scss']
})
export class MedEveAddComponent implements OnInit {
  @Input() eventID!:string;
  public medicalEvent!:medicalEventModel;
  public report:string ='';
  public patientName:string ='';
  public patientSurname:string ='';
  public room:string ='';
  public cause:string ='';
  public date:Date = new Date();
  constructor(private modalService:ModalService, private medicalEventService:MedicalEventService, private socketService:SocketsService) { }

  ngOnInit(): void {
    this.medicalEventService.getById(this.eventID).subscribe((result) => {
      console.log(result);
      this.patientName = result.patientName;
      this.patientSurname = result.patientSurname;
      this.date = result.date;
      this.cause = result.cause;
      this.room = result.room;
      this.medicalEvent = result;
    });
  }
  updateReport(form:NgForm){
    if(!form.touched)
    {
      return;
    }
    console.log(form.form.value['description']);
    console.log(this.medicalEvent._id);
    
    this.medicalEvent.report = form.form.value['description'];
   
    this.medicalEvent.filled = true;
    this.medicalEventService.update(this.medicalEvent).subscribe((result)=>{
      this.socketService.publish("medicalEvent",{});
    });
    this.close();
  }
  close(){
    this.modalService.closeFill();
  }
}

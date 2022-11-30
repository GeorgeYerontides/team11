import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { ModalService } from 'src/app/global/services/modals/notification-modal.service';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-routine-add',
  templateUrl: './routine-add.component.html',
  styleUrls: ['./routine-add.component.scss']
})
export class RoutineAddComponent implements OnInit {
  @Input() user!: PatientModel;
  constructor(private modalService:ModalService,private routineService:RoutineService, private socketService:SocketsService) { }

  ngOnInit(): void {
  }
  close(form:NgForm){
    this.modalService.closeRoutine();
  }

  getForm(form:NgForm){
    console.log(form);
    console.log(this.user);
    if (form.valid === false)
    {
      alert('Form is invalid');
      return;
    }
    const newRoutine = new RoutineModel();
    newRoutine.patient = this.user.name + ' ' + this.user.surname;
    newRoutine.title = form.form.value['title'];
    newRoutine.startTime = new Date();
    newRoutine.startTime.setHours(form.form.value['fromTime'].split(":",2)[0]);
    newRoutine.startTime.setMinutes(form.form.value['fromTime'].split(":",2)[1]);
    newRoutine.startTime.setMonth(10);
    newRoutine.startTime.setFullYear(2022);
    newRoutine.startTime.setDate(24);
    newRoutine.type = form.form.value['type'];

    if(form.form.value['toTime'] === "--:--")
    {
      newRoutine.endTime = newRoutine.startTime;
    }
    else
    {
      newRoutine.endTime = new Date();
      newRoutine.endTime.setMonth(10);
      newRoutine.endTime.setFullYear(2022);
      newRoutine.endTime.setDate(24);
      newRoutine.endTime.setHours(form.form.value['fromTime'].split(":",2)[0]);
      newRoutine.endTime.setMinutes(form.form.value['fromTime'].split(":",2)[1]);
    }
    if(form.form.value['requiresCaretaker'] === "")
    {
      newRoutine.reqiresCaretaker =false ;

    }
    else{
      newRoutine.reqiresCaretaker = true;

    }
    newRoutine.completed = false;
    newRoutine.description = form.form.value["description"];

    this.routineService.create(newRoutine).subscribe((result) => {
     
      this.socketService.publish("routine_update", {});
    });
   
    
  }

  

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { medicalEventModel } from 'src/app/global/models/medicalEvents/medeve.model';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { MedicalEventService } from 'src/app/global/services/medicalEvents/medeve.service';
import { ModalService } from 'src/app/global/services/modals/modal.service';

import { PatientService } from 'src/app/global/services/patient/patients.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {
  public currUser!:PatientModel ;
  public medicalEvents:medicalEventModel[]=[];
  public modal:boolean = false;
  public name:string = "";
  public surname:string = "";
  public eventID:string ='';
  constructor(private patientService: PatientService, private route:ActivatedRoute, private medicalService:MedicalEventService,
    private socketService:SocketsService,private modalService:ModalService) { 
    let snapshot = this.route.snapshot;
    console.log("child ",snapshot.parent?.params['name']);
    console.log( snapshot.params['name']);
    let name = snapshot.parent?.params['name'];
    //this.currUser = this.patientService.getUser(name);
  }

  ngOnInit(): void {
    let snapshot = this.route.snapshot;
    let name = snapshot.parent?.params['name'];
    this.patientService.getUser(name.split(' ',2)[0],name.split(' ',2)[1]).subscribe((result) => {
      console.log('the user is ' , result,);
        this.currUser = result[0];



      this.name = this.currUser.name;
      this.surname = this.currUser.surname;
    });
    this.getAllTasks();
    this.socketService.subscribe("medicalEvent", (data: any) => {
      this.getAllTasks();
    });

    this.socketService.subscribe('fillModal',(data:any) =>{
      console.log("received open")
      if (data != undefined)
      {
        this.eventID = data.id;
      }
      this.modal = this.modalService.showFill;
; 


    })
    //this.currUser = this.patientService.getUser(name);
  }


  private async getAllTasks(){
    await this.medicalService.getNotifications().subscribe((result) => {
     result.sort((objA,objB) => { 
       if (objA.date < objB.date)
       {
         return 1;
       }
       else
       {
         return -1;
       }
       return 0;
     }
     )
     this.medicalEvents = result.filter(data => (data.patientName === this.currUser.name) && (data.patientSurname === this.currUser.surname) );
     console.log('what is routine events: ',this.medicalEvents);

    });

   
 }

 async onSubmit(form: NgForm){

  if(form.touched === false)
  {
    return;
  }

  console.log(form);
  console.log('test ' + form.form.value['fromTime']);
  console.log('test ' + form.form.value['toTime']);


  let tempFrom = new Date();
  let tempDate = new Date();
  let tempTo = new Date();

  let flagTo =0;
  let flagFrom =0;
  let flagDate =0;
  console.log('date ',form.form.value['dateEvent']);
  if (form.form.value['dateEvent'] != '')
  {
    let  tempDay= form.form.value['dateEvent'].split('-',3)[2];
    let  tempMonth= form.form.value['dateEvent'].split('-',3)[1];
    let  tempYear= form.form.value['dateEvent'].split('-',3)[0];
    console.log( 'form reading ',tempDay,' ',tempMonth,' ',tempYear)
    tempDate.setDate(tempDay);
    tempDate.setMonth(tempMonth-1);
    tempDate.setFullYear(tempYear);
    tempDate.setHours(0);
    tempDate.setMinutes(0);
    flagDate = 1;
  }

  if (form.form.value['fromTime'] != '')
  {
    let  tempFromHours= form.form.value['fromTime'].split(':',2)[0];
    let  tempFromMinutes= form.form.value['fromTime'].split(':',2)[1];
    tempFrom.setHours(tempFromHours);
    tempFrom.setMinutes(tempFromMinutes);
    flagFrom = 1;
    console.log("will filter for from time");

  }

  if (form.form.value['toTime'] != '')
  {
    let  tempToHours= form.form.value['toTime'].split(':',2)[0];
    let tempToMinutes = form.form.value['toTime'].split(':',2)[1];
    tempTo.setHours(tempToHours);
    tempTo.setMinutes(tempToMinutes);
    flagTo = 1;
    console.log("will filter for to time");

  }
  console.log('tempFrom ' + tempFrom);
  console.log('tempTo ' + tempTo);
  if((tempFrom > tempTo) && (flagFrom!=0) && (flagTo!=0))
  {
    console.log("test");
    alert('Start time must be smalller than end time');
    return;
  }

  this.medicalService.getNotifications().subscribe((result) => {
    result.sort((objA,objB) => { 
      if (objA.date > objB.date)
      {
        return 1;
      }
      else
      {
        return -1;
      }
      return 0;
    }
    )
    let username = this.currUser.name + " "+ this.currUser.surname;
    this.medicalEvents = result.filter(data => (data.patientName ===  this.currUser.name) && (data.patientSurname === this.currUser.surname));
    console.log('routines ',this.medicalEvents);
    console.log('times ',result[0].date);
    
    console.log('times ',new Date(result[0].date).getHours());
 

    if(flagFrom === 1)
    {
      this.medicalEvents = this.medicalEvents.filter(data => (new Date(data.date).getHours() > tempFrom.getHours()) || ((new Date(data.date).getHours() === tempFrom.getHours()) && (new Date(data.date).getMinutes() >= tempFrom.getMinutes()) ));
      console.log('filter hours ',this.medicalEvents);

    }
    if(flagTo === 1)
    {
      this.medicalEvents = this.medicalEvents.filter(data => (new Date(data.date.getTime()).getHours() < tempFrom.getHours()) || ((new Date(data.date).getHours() === tempFrom.getHours()) && (new Date(data.date).getMinutes() <= tempFrom.getMinutes()) ));
      console.log('filter hours ',this.medicalEvents);
    }


    if(flagDate === 1)
    {
      console.log( 'days ', new Date(this.medicalEvents[0].date).getDate() , tempDate.getDate()  );
      console.log( 'month ', new Date(this.medicalEvents[0].date).getMonth() , tempDate.getMonth()  );
      console.log( 'year ', new Date(this.medicalEvents[0].date).getFullYear() , tempDate.getFullYear()  );
      this.medicalEvents = this.medicalEvents.filter(data => (new Date(data.date).getDate() === tempDate.getDate()) && (new Date(data.date).getMonth() === tempDate.getMonth()) && (new Date(data.date).getFullYear() === tempDate.getFullYear())   );

    }
    console.log('what is routine events last: ',this.medicalEvents);

    this.medicalEvents = result.filter(data => data.filled ===  form.form.value['flexCheckDefault']);


  
    flagTo =0;
    flagFrom =0;
    flagDate =0;
   });
 
}
  resetFilters(form:NgForm){
    form.controls['dateEvent'].setValue('');
    form.controls['fromTime'].setValue('--:--');
    form.controls['toTime'].setValue('--:--');
    form.controls['flexCheckDefault'].setValue(false);


    this.getAllTasks();
  }
  
}

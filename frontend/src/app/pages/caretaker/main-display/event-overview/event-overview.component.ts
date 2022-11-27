import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { result } from 'lodash';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { PatientService } from 'src/app/global/services/patient/patients.service';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-event-overview',
  templateUrl: './event-overview.component.html',
  styleUrls: ['./event-overview.component.scss']
})
export class EventOverviewComponent implements OnInit {
  public currUser!:PatientModel ;
  public name:string = "";
  public surname:string = "";
  protected routineEvents:RoutineModel[]=[];
  
  constructor(private patientService: PatientService, private route:ActivatedRoute,private routineService:RoutineService,
    private socketService:SocketsService) { 
    let snapshot = this.route.snapshot;
    console.log("child ",snapshot.parent?.params['name']);
    console.log( snapshot.params['name']);
    let name = snapshot.parent?.params['name'];
    //this.currUser = this.patientService.getUser(name);
  }

  ngOnInit(): void {
    let snapshot = this.route.snapshot;
    let name = snapshot.parent?.params['name'];
    console.log(name);
    this.patientService.getUser(name.split(' ',2)[0],name.split(' ',2)[1]).subscribe((result) => {
      console.log('the user is ' , result,);
        this.currUser = result[0];



      this.name = this.currUser.name;
      this.surname = this.currUser.surname;
    });

    this.getAllTasks();
    this.socketService.subscribe("routine_update", (data: any) => {
      this.getAllTasks();
    });
    //this.currUser = this.patientService.getUser(name);
  }

  private async getAllTasks(){
    this.routineService.getAll().subscribe((result) => {
     result.sort((objA,objB) => { 
       if (objA.startTime > objB.startTime)
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
     this.routineEvents = result.filter(data => data.patient === username);
     console.log('what is routine events: ',this.routineEvents);

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
   
    let tempTo = new Date();


    let flagTo =0;
    let flagFrom =0;

    

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
    if((tempFrom > tempTo) && (flagFrom!=0))
    {
      console.log("test");
      alert('Start time must be smalller than end time');
      return;
    }

    this.routineService.getAll().subscribe((result) => {
      result.sort((objA,objB) => { 
        if (objA.startTime > objB.startTime)
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
      this.routineEvents = result.filter(data => data.patient === username);
      console.log('routines ',this.routineEvents);
      
      console.log('times ',new Date(result[1].startTime.toString()).getTime(), "",  tempFrom.getTime());
      if(flagFrom === 1)
      {
        this.routineEvents = this.routineEvents.filter(data => (new Date(data.startTime.toString()).getHours() > tempFrom.getHours()) || ((new Date(data.startTime.toString()).getHours() === tempFrom.getHours()) && (new Date(data.startTime.toString()).getMinutes() >= tempFrom.getMinutes()) ));
        console.log('filter hours ',this.routineEvents);

      }
      
      if(flagTo === 1)
      {
        this.routineEvents = this.routineEvents.filter(data =>  (data.endTime !== undefined) && (data.endTime !== null)  && ( (new Date(data.endTime.toString()).getHours() < tempTo.getHours()) || ((new Date(data.endTime.toString()).getHours() === tempTo.getHours()) && (new Date(data.endTime.toString()).getMinutes() <= tempTo.getMinutes()) ) ) );
      }
      console.log('what is routine events last: ',this.routineEvents);

      if(form.form.value['exampleRadios'] != ''){
        this.routineEvents = this.routineEvents.filter(data => data.type === form.form.value['exampleRadios']);
      }


      flagTo =0;
      flagFrom =0;
     });
   
  }

  resetFilters(form:NgForm){
    form.controls['fromTime'].setValue('--:--');
    form.controls['toTime'].setValue('--:--');
    form.controls['exampleRadios'].setValue('');
  }



}

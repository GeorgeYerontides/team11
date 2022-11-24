import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientModel } from 'src/app/global/models/patient/patient.model';

import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { PatientService } from 'src/app/global/services/patient/patients.service';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  public name: string ='';
  public surname: string ='';

  heartRate:string = '98';
  SpO2:string = '98';
  stress:string ='Normal';
  location:string = 'Living Room';
  Age: string = '75';
  Weight: string = '68';
  Height: string = '1.63';
  emergencyName:string ='Giorgos Lamprou';
  emergencyPhone:string ='6982841943';
  emergencyMail:string ='glamprou@gmail.com';
  public maxEvents:number = 10;
  public completedEvents:number = 3;

  public currUser!:PatientModel;
  protected routineEvents:RoutineModel[]=[];

  constructor(private patientService: PatientService, private route:ActivatedRoute,
    private router:Router, private routineService:RoutineService,private socketService:SocketsService) { 
    //let snapshot = this.route.snapshot;
    //console.log("child ",snapshot.parent?.params['name']);
    //console.log( snapshot.params['name']);
    //let name = snapshot.parent?.params['name'];
    //this.currUser = this.patientService.getUser(name);
    // 


  }

  async ngOnInit() {
    let snapshot = this.route.snapshot;
    let nameTemp = snapshot.parent?.params['name'];
    let usernameTemp = nameTemp.split(" ",2);

    this.patientService.getUser(usernameTemp[0],usernameTemp[1]).subscribe((result) => {
      console.log('the user is ' , result,);
        this.currUser = result[0];


      console.log('the user is ' , this.currUser,this.currUser.name);
      this.name = this.currUser.name;
      this.surname = this.currUser.surname;
    });

    this.getAllTasks();
    this.socketService.subscribe("routine_update", (data: any) => {
      this.getAllTasks();
    });
    
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
       console.log( this.routineEvents);
       this.completedEvents = this.routineEvents .filter(data => data.completed === true).length;
       this.maxEvents = this.routineEvents .length;
     });

    
  }

  navigateMed(){
    this.router.navigate(["../medical_history"],);
  }

}

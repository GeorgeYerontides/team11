import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/global/models/patient/patient.model';
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
  public currUser:User ;
  protected routineEvents:RoutineModel[]=[];

  constructor(private patientService: PatientService, private route:ActivatedRoute,
    private router:Router, private routineService:RoutineService,private socketService:SocketsService) { 
    let snapshot = this.route.snapshot;
    console.log("child ",snapshot.parent?.params['name']);
    console.log( snapshot.params['name']);
    let name = snapshot.parent?.params['name'];
    this.currUser = this.patientService.getUser(name);


  }

  async ngOnInit() {
    let snapshot = this.route.snapshot;
    let name = snapshot.parent?.params['name'];
    this.currUser = this.patientService.getUser(name);

    this.getAllTasks();
    this.socketService.subscribe("routine_update", (data: any) => {
      this.getAllTasks();
    });
    
  }

  private async getAllTasks(){
    // this.routineService.getAll().subscribe((result) => {
    //   this.routineEvents = result;
    //   console.log( this.routineEvents);
    //   this.completedEvents = result.filter(data => data.completed === true).length;
    //   this.maxEvents = result.length;
    // });
    const result:any = await this.routineService.getAll().toPromise();
    this.routineEvents = result;
      console.log( this.routineEvents);
      this.completedEvents = result.filter((data: { completed: boolean; }) => data.completed === true).length;
      this.maxEvents = result.length;
    
  }

  navigateMed(){
    this.router.navigate(["../medical_history"],);
  }

}

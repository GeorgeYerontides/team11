import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/global/models/patient/patient.model';
import { PatientService } from 'src/app/global/services/patient/patients.service';

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
  maxEvents:number = 10;
  completedEvents:number = 3;
  public currUser:User ;
  constructor(private patientService: PatientService, private route:ActivatedRoute) { 
    let snapshot = this.route.snapshot;
    console.log("child ",snapshot.parent?.params['name']);
    console.log( snapshot.params['name']);
    let name = snapshot.parent?.params['name'];
    this.currUser = this.patientService.getUser(name);
  }

  ngOnInit(): void {
    let snapshot = this.route.snapshot;
    let name = snapshot.parent?.params['name'];
    this.currUser = this.patientService.getUser(name);
  }


}

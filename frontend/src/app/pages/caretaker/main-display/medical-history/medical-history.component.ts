import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientModel } from 'src/app/global/models/patient/patient.model';

import { PatientService } from 'src/app/global/services/patient/patients.service';

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent implements OnInit {
  public currUser!:PatientModel ;
  constructor(private patientService: PatientService, private route:ActivatedRoute) { 
    let snapshot = this.route.snapshot;
    console.log("child ",snapshot.parent?.params['name']);
    console.log( snapshot.params['name']);
    let name = snapshot.parent?.params['name'];
    //this.currUser = this.patientService.getUser(name);
  }

  ngOnInit(): void {
    let snapshot = this.route.snapshot;
    let name = snapshot.parent?.params['name'];
    //this.currUser = this.patientService.getUser(name);
  }

}

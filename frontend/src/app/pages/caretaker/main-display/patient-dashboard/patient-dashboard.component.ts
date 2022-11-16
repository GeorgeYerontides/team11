import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/global/models/patient/patient.model';
import { PatientService } from 'src/app/global/services/patient/patients.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  currUser:User | undefined;
  constructor(private patientService: PatientService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    var name = this.route.snapshot.params['name']
    this.currUser = this.patientService.getUser(name);
    console.log(this.currUser);
  }

}

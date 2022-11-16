import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/global/models/patient/patient.model';
import { PatientService } from 'src/app/global/services/patient/patients.service';

@Component({
  selector: 'app-patient-observe-screen',
  templateUrl: './patient-observe-screen.component.html',
  styleUrls: ['./patient-observe-screen.component.scss']
})
export class PatientObserveScreenComponent implements OnInit {
  users: User[] = [  ]
  constructor(patientService:PatientService) {
      this.users = patientService.getUsers();
   }

  ngOnInit(): void {
  }

}

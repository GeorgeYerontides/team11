import { Component, OnInit } from '@angular/core';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { PatientService } from 'src/app/global/services/patient/patients.service';

@Component({
  selector: 'app-home-display',
  templateUrl: './home-display.component.html',
  styleUrls: ['./home-display.component.scss']
})
export class HomeDisplayComponent implements OnInit {

  protected users: PatientModel[] = [  ]
  constructor(private patientService:PatientService) {
      
   }


  
  async ngOnInit() {
    this.patientService.getUsers().subscribe((result) => {
      this.users = result;
      console.log("these are the users"+this.users);
    });

  }

  navigateUser(){
    
  }

}

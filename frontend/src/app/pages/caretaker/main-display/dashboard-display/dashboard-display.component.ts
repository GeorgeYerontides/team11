import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/global/services/patient/patients.service';

@Component({
  selector: 'app-dashboard-display',
  templateUrl: './dashboard-display.component.html',
  styleUrls: ['./dashboard-display.component.scss']
})
export class DashboardDisplayComponent implements OnInit {

  constructor(private patientService: PatientService, private route:ActivatedRoute) { 
   console.log( "parent ",this.route.snapshot.params['name'] );
  
  }
  ngOnInit(): void {
  }

}

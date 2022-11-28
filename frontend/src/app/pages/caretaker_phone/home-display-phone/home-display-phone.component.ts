import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientModel } from 'src/app/global/models/patient/patient.model';

@Component({
  selector: 'app-home-display-phone',
  templateUrl: './home-display-phone.component.html',
  styleUrls: ['./home-display-phone.component.scss']
})
export class HomeDisplayPhoneComponent implements OnInit {

  @Input() patient!: PatientModel;

  urlSafe!: SafeResourceUrl;
  users!: PatientModel[];
  patientService: any;

  constructor(private router:Router, private route:ActivatedRoute,) { 

  }

  async ngOnInit() {
    this.patientService.getUsers().subscribe((result: PatientModel[]) => {
      this.users = result;
      console.log("these are the users"+this.users);
    });
  }

  navigateToPatient(){
    var path = "/"+ this.patient.name + ' '+ this.patient.surname;
    console.log(path);
    console.log(this.route);
    this.router.navigate([path], {relativeTo: this.route});
  }

}

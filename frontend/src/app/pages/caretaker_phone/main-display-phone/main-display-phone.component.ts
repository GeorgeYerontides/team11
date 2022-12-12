import { Component, Input, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientModel } from 'src/app/global/models/patient/patient.model';

@Component({
  selector: 'app-main-display-phone',
  templateUrl: './main-display-phone.component.html',
  styleUrls: ['./main-display-phone.component.scss'] 
})
export class MainDisplayPhoneComponent implements OnInit {
  @Input() patient!: PatientModel;

  urlSafe!: SafeResourceUrl;

  constructor(private router:Router, private route:ActivatedRoute,
    public sanitzer:DomSanitizer
    ) { }

  ngOnInit(): void {

    console.log(this.patient);
    this.urlSafe = this.sanitzer.bypassSecurityTrustResourceUrl(this.patient.cameraUrl);
  }

  navigateToPatient(){
    var path= this.patient.name + ' '+ this.patient.surname;
    console.log(path);
    this.router.navigate([path], {relativeTo: this.route});
  }

}

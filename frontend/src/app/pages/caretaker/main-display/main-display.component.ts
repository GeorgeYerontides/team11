import { Component, Input,OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { MonitorDisplayComponent } from '../monitor-display/monitor-display.component';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.scss']
})
export class MainDisplayComponent implements OnInit {
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
    var path= "../"+ this.patient.name + ' '+ this.patient.surname + "/main";
    console.log(path);
    this.router.navigate([path], {relativeTo: this.route});
  }
}

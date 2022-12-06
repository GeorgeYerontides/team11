import { Component, Input,OnInit } from '@angular/core';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { LocationService } from 'src/app/global/services/location/location.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { VitalsService } from 'src/app/global/services/vitals/vitals.service';

@Component({
  selector: 'app-monitor-display',
  templateUrl: './monitor-display.component.html',
  styleUrls: ['./monitor-display.component.scss']
})
export class MonitorDisplayComponent implements OnInit {
  @Input() typeMon: any;
  @Input() patient!: PatientModel;
  location:string ='';
  vitalStatus:string ='';
  constructor(private locationService:LocationService,private socketService:SocketsService, private vitalsService:VitalsService) { }
  ngOnInit(): void {
    this.getLocation();
    this.getVitals();
  
    this.socketService.subscribe("locationChange", (data: any) => {
    
      this.getLocation();
    });
    this.socketService.subscribe("vitalChange", (data: any) => {
    
      this.getVitals();
    });
  }

  private async getLocation(){
    this.locationService.getUserLocation(this.patient.name, this.patient.surname).subscribe((result) => {
      this.location = result[0].location;

    });

   
 }  
 private async getVitals(){
  this.vitalsService.getUserVitals(this.patient.name, this.patient.surname).subscribe((result) => {
    this.vitalStatus = result[0].status;

  });

 
}
}

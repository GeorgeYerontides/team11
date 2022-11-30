import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/global/models/alert/alert.model';
import { LocationModel } from 'src/app/global/models/location/location.model';
import { LocationService } from 'src/app/global/services/location/location.service';
import { alertService } from 'src/app/global/services/patient/alert.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-magical-controller',
  templateUrl: './magical-controller.component.html',
  styleUrls: ['./magical-controller.component.scss']
})
export class MagicalControllerComponent implements OnInit {
  locations:LocationModel[] =[]
  constructor(private alert:alertService, private socketService: SocketsService, private locationService:LocationService) { 

    
  }

  

  async ngOnInit() {
    this.locationService.getLocations().subscribe((result) => {
      this.locations = result;
      console.log("these are the users"+this.locations);
    });
  }
  createAlertYellow(){
    // this.alert.setValue(true);
    let alert:Alert = new Alert("Kostas Lamprou","yellow","Check blood pressure","in 15 mins.");
    this.socketService.publish("alert_event",alert);
  }
  createAlertRed(){
    // this.alert.setValue(true);
    let alert:Alert = new Alert("Kostas Lamprou","red");
    this.socketService.publish("alert_event",alert);
  }
  createAlertOrange(){
    // this.alert.setValue(true);
    let alert:Alert = new Alert("Kostas Lamprou","orange");
    this.socketService.publish("alert_event",alert);
  }

  changeLivingRoom(){
    console.log('change kit');

    let location = this.locations.filter( data => (data.name === "Kostas") && (data.surname === "Lamprou"))[0] ;
    location.location = 'Living Room';
    this.locationService.update(location).subscribe((result)=>{
      this.socketService.publish("locationChange",{});
    });
  }
  changeKitchen(){
    console.log('change kit');

    let location = this.locations.filter( data => (data.name === "Kostas") && (data.surname === "Lamprou"))[0] ;
    location.location = 'Kitchen';
    this.locationService.update(location).subscribe((result)=>{
      this.socketService.publish("locationChange",{});
    });
  }

  changeBedroom(){
    console.log('change kit');

    let location = this.locations.filter( data => (data.name === "Kostas") && (data.surname === "Lamprou"))[0] ;
    location.location = 'Bedroom';
    this.locationService.update(location).subscribe((result)=>{
      this.socketService.publish("locationChange",{});
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/global/models/alert/alert.model';
import { CaretakerModel } from 'src/app/global/models/caretaker/caretaker.model';
import { LocationModel } from 'src/app/global/models/location/location.model';
import { medicalEventModel } from 'src/app/global/models/medicalEvents/medeve.model';
import { VitalsModel } from 'src/app/global/models/vitals/vitals.model';
import { CaretakerService } from 'src/app/global/services/caretaker/caretaker.service';
import { LocationService } from 'src/app/global/services/location/location.service';
import { MedicalEventService } from 'src/app/global/services/medicalEvents/medeve.service';
import { alertService } from 'src/app/global/services/patient/alert.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { VitalsService } from 'src/app/global/services/vitals/vitals.service';

@Component({
  selector: 'app-magical-controller',
  templateUrl: './magical-controller.component.html',
  styleUrls: ['./magical-controller.component.scss']
})
export class MagicalControllerComponent implements OnInit {
  locations:LocationModel[] =[];
  vitals:VitalsModel[] =[];
  careakers:CaretakerModel[] =[];
  constructor(private alert:alertService, private socketService: SocketsService, private locationService:LocationService,private vitalsService:VitalsService,
    private caretakerService:CaretakerService,private medeveService:MedicalEventService) { 

    
  }

  

  async ngOnInit() {
    this.locationService.getLocations().subscribe((result) => {
      this.locations = result;
      console.log("these are the users"+this.locations);
    });

    this.vitalsService.getVitals().subscribe((result)=>{
      this.vitals = result;
    });

    this.caretakerService.getCaretakers().subscribe((result)=>{
      this.careakers = result;
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

  changeVitalsDanger(){
 
    let vitals = this.vitals.filter( data => (data.name === "Kostas") && (data.surname === "Lamprou"))[0] ;
    vitals.status = 'Danger';
    vitals.stress = 'High';
    vitals.heartRate = 120;
    this.vitalsService.update(vitals).subscribe((result)=>{
      this.socketService.publish("vitalChange",{});
    });
    let currCaretaker = this.careakers.filter( data => (data.name === "Kostas") && (data.surname === "Kosta"))[0] ;
    currCaretaker.status = true;
    this.caretakerService.update(currCaretaker).subscribe((result)=>{
      this.socketService.publish("emergencyMode",{value:true});
    });

    let newMedEve = new medicalEventModel();
    newMedEve.patientName = "Kostas";
    newMedEve.patientSurname = "Lamprou";
    newMedEve.date = new Date();
    newMedEve.report = "";
    newMedEve.caretakerName = "Kostas";
    newMedEve.caretakerSurame = "Kosta";
    newMedEve.cause = "Fall detected";
    newMedEve.filled = false;
    this.locationService.getUserLocation('Kostas', 'Lamprou').subscribe((result) => {
      newMedEve.room  = result[0].location;
      console.log(newMedEve.room,  result[0].location);
    });

    setTimeout( () => {
      this.medeveService.create(newMedEve).subscribe((result) => {
     
        this.socketService.publish("medicalEvent", {});
      });
      this.socketService.publish("medicalEvent2", {data: newMedEve})} ,1000);  

    

  }

  changeVitalsNormal(){
    console.log('change kit');

    let vitals = this.vitals.filter( data => (data.name === "Kostas") && (data.surname === "Lamprou"))[0] ;
    vitals.status = 'Normal';
    vitals.stress = 'Normal';
    vitals.heartRate = 98;
    this.vitalsService.update(vitals).subscribe((result)=>{
      this.socketService.publish("vitalChange",{});
    });

    let currCaretaker = this.careakers.filter( data => (data.name === "Kostas") && (data.surname === "Kosta"))[0] ;
    currCaretaker.status = false;
    this.caretakerService.update(currCaretaker).subscribe((result)=>{
      this.socketService.publish("emergencyMode",{value:false});
    });
  }
}

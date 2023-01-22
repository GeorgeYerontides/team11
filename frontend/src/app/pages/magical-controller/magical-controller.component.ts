import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Alert } from 'src/app/global/models/alert/alert.model';
import { CaretakerModel } from 'src/app/global/models/caretaker/caretaker.model';
import { ChatModel } from 'src/app/global/models/chat/chat.model';
import { LocationModel } from 'src/app/global/models/location/location.model';
import { medicalEventModel } from 'src/app/global/models/medicalEvents/medeve.model';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { VitalsModel } from 'src/app/global/models/vitals/vitals.model';
import { CaretakerService } from 'src/app/global/services/caretaker/caretaker.service';
import { ChatService } from 'src/app/global/services/chat/chat.service';
import { LocationService } from 'src/app/global/services/location/location.service';
import { MedicalEventService } from 'src/app/global/services/medicalEvents/medeve.service';
import { NotificationService } from 'src/app/global/services/notifications/notification.service';
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
  chatMessages:ChatModel[] =[];
  constructor(private alert:alertService, private socketService: SocketsService, private locationService:LocationService,private vitalsService:VitalsService,
    private caretakerService:CaretakerService,private medeveService:MedicalEventService, private chatService:ChatService,
    private notificationService:NotificationService) { 

    
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
    this.getChatMessages();

    this.socketService.subscribe('chat_update',(data: any) =>{
      this.getChatMessages();
    })
    
  }

  getChatMessages(){
    this.chatService.getNotifications().subscribe((result)=>{
      result.sort((objA,objB) => { 
        if (objA.time < objB.time)
        {
          return 1;
        }
        else
        {
          return -1;
        }
        return 0;
      }
      )
      this.chatMessages = result;
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

    let tempRoutine = new RoutineModel();
    tempRoutine.title = 'Danger.';
    tempRoutine.description = 'Your caretaker is coming to help you.'
    this.notificationService.openTV(tempRoutine);

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

      this.socketService.publish('speakerEvent',{message: 'Kostas Lamprou is in danger'});
    

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

  chat(form:NgForm){
    console.log(form);

    let chatMessage = new ChatModel();
    chatMessage.receiverName =  'Kostas';
    chatMessage.receiverSurame= 'Kosta';
    chatMessage.senderName = 'Kostas';
    chatMessage.senderSurname = 'Lamprou';
    chatMessage.time = new Date();
    chatMessage.message = form.form.value['chat'];

    this.chatService.create(chatMessage).subscribe((result) => {
     
      this.socketService.publish("chat_update", {});
    });
    //form.controls['chat'].setValue('');
  }

  openWall(){
    let tempRoutine = new RoutineModel();
    tempRoutine.title = 'Take insulin shot.';
    tempRoutine.description = 'If you need any help please contact your caretaker.'
    this.notificationService.openWall(tempRoutine);
    console.log('hello');
  }
  closeWall(){

    this.notificationService.closeWall();
  }

  
  openTV(){
    let tempRoutine = new RoutineModel();
    tempRoutine.title = 'Check blood pressure.';
    tempRoutine.description = 'Your caretaker will be with you shortly to take your blood pressure.'
    this.notificationService.openTV(tempRoutine);
  }

  openTV2(){
    let tempRoutine = new RoutineModel();
    tempRoutine.title = 'Routine approved.';
    tempRoutine.description = 'Your caretaker approved your trip to the mall.'
    this.notificationService.openTV(tempRoutine);
  }

  closeTV(){

    this.notificationService.closeTV();
  }
}

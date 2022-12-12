import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Alert } from 'src/app/global/models/alert/alert.model';
import { Message } from 'src/app/global/models/messages/message.model';
import { NotificationModel } from 'src/app/global/models/messages/notification.model';
import { CaretakerService } from 'src/app/global/services/caretaker/caretaker.service';
import { ModalService } from 'src/app/global/services/modals/modal.service';
import { NotificationService } from 'src/app/global/services/notifications/notification.service';
import { alertService } from 'src/app/global/services/patient/alert.service';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';
import { VitalsService } from 'src/app/global/services/vitals/vitals.service';


@Component({
  selector: 'app-home-caretaker',
  templateUrl: './home-caretaker.component.html',
  styleUrls: ['./home-caretaker.component.scss']
})
export class HomeCaretakerComponent implements OnInit {
  public subroute:string = "";  
  public route: string = "/observe/"
  public alertDecoration: string ="";
  public alertMessage:string="";
  public alert:boolean = true; //toggle alert
  public alertPatientName:string = '';
  public isClicked:boolean = true;
  public modal:boolean = false;
  public emergency:boolean = false;
  public currentAlert:number = -1;
  constructor(private router: Router, private alertService:alertService, 
    private socketService: SocketsService,private notificationService:NotificationService,
    private modalService:ModalService,private vitalsService:VitalsService, private caretakerService:CaretakerService,
    private speakerService:SmartSpeakerService) { 
  
    this.subroute = this.router.url; 
    this.router.events.subscribe((event:Event) =>
    {
      if (event instanceof NavigationStart) {
      
  
        this.subroute = this.router.url; 
    
      }
      if (event instanceof NavigationEnd) {
      

        this.subroute = this.router.url; 
      
      }
      
    })
   

  }
  ngOnInit(): void {
    this.socketService.subscribe('modalEvent',() =>{
      this.modal = this.modalService.showDialog;
    })

    this.alertService.getValue().subscribe((value) => {
      this.alert = value;
    });

    this.socketService.subscribe("emergencyMode", (data:any) => {

      this.emergency = data.value;
    });
    /*
    * Event Hierarchy
    *
    * Events will be accompanied by a level.
    * Collision among high level alerts aka in danger and requires assistant will not be permited and thus redirected to a standby stuff.
    * 
    */
    this.socketService.subscribe("alert_event", (data: Alert) => {
      
      if(this.currentAlert === 1)
      {
        let firstName = this.alertPatientName.split(" ",2)[0];
        
       // this.notificationService.addNewNotification(firstName,"test",4);
      
        this.isClicked = false;
        return;
      }

      if (this.isClicked === false)
      {
        let firstName = this.alertPatientName.split(" ",2)[0];
        //this.notificationService.addNewNotification(firstName,"test",4);
      }

      this.caretakerService.getCaretakers().subscribe((result)=>{
        let currCaretaker = result.filter( data => (data.name === "Kostas") && (data.surname === "Kosta"))[0] ;
        
        if(!currCaretaker.status)
        {
          this.alert = true;
          console.log('emergnce is true');
        }
      });




      if (data.level === "yellow")
      {
        this.currentAlert = 0;
        this.alertMessage = "New Alert: " +  data.message + " for "+ data.patient +" "+ data.time;
      }
      if (data.level === "red")
      {
        this.currentAlert = 1;
        this.alertMessage = "Danger: " +   data.patient  + " has medical emergency!";
    
      }
      if (data.level === "orange")
      {
        this.currentAlert = 0;
        this.alertMessage = "New Alert: Patient " +   data.patient  + " requires assistant.";
      }

      
      const newNotification = new NotificationModel();
      newNotification.senderName = data.patient.split(' ',2)[0];
      newNotification.senderSurname = data.patient.split(' ',2)[1];
      newNotification.timeSent = new Date();
      newNotification.typeNotification = 4;
      newNotification.title = "Missed Notification";
      this.notificationService.create(newNotification).subscribe((result) => {
       
        this.socketService.publish("notificationUpdate", newNotification);
      });
     

      this.alertPatientName = data.patient;
      this.alertDecoration = data.level;
      this.isClicked = false;


    });
    this.socketService.subscribe('speakerEvent', (data:any)=>{
      this.speakerService.speak(data.message, ()=>{
        console.log('speech ended');
      })
    });

    this.speakerService.initialize();
    this.speakerService.start();
  }



  navigateToUser(username:string){
    this.alert = false;
    this.isClicked = true;
    let path:string = "/observe/" + username + "/main";
  
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([path]);
  }); 
  }

  navigateHome(){
    this.router.navigate(["/observe/users"],);
  }



}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Alert } from 'src/app/global/models/alert/alert.model';
import { Message } from 'src/app/global/models/messages/message.model';
import { ModalService } from 'src/app/global/services/modals/notification-modal.service';
import { NotificationService } from 'src/app/global/services/notifications/notification.service';
import { alertService } from 'src/app/global/services/patient/alert.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';


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
  
  constructor(private router: Router, private alertService:alertService, 
    private socketService: SocketsService,private notificationService:NotificationService,
    private modalService:ModalService) { 
  
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
      console.log('socket ',this.modalService.showDialog);
      this.modal = this.modalService.showDialog;
    })

    this.alertService.getValue().subscribe((value) => {
      this.alert = value;
      console.log('caretaker comp' + this.alert);
    });
    /*
    * Event Hierarchy
    *
    * Events will be accompanied by a level.
    * Collision among high level alerts aka in danger and requires assistant will not be permited and thus redirected to a standby stuff.
    * 
    */
    this.socketService.subscribe("alert_event", (data: Alert) => {

      if (this.isClicked === false)
      {
        let firstName = this.alertPatientName.split(" ",2)[0];
        this.notificationService.addNewNotification(firstName,"test",4);
      }
      console.log("Event arrived");
      this.alert = true;
      console.log(data, data.level);

      if (data.level === "yellow")
      {
        this.alertMessage = "New Alert: " +  data.message + " for "+ data.patient +" "+ data.time;
      }
      if (data.level === "red")
      {
        this.alertMessage = "Danger: " +   data.patient  + " has medical emergency!";
      }
      if (data.level === "orange")
      {
        this.alertMessage = "New Alert: Patient " +   data.patient  + " requires assistant.";
      }
      this.alertPatientName = data.patient;
      this.alertDecoration = data.level;
      this.isClicked = false;
    });
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

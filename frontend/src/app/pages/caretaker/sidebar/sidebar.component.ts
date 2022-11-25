import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NotificationModel } from 'src/app/global/models/messages/notification.model';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { ModalService } from 'src/app/global/services/modals/notification-modal.service';
import { NotificationService } from 'src/app/global/services/notifications/notification.service';
import { PatientService } from 'src/app/global/services/patient/patients.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public subroute:string = "";
  public route: string = "/observe/users"
  public patients: PatientModel[] = [];
  public notifications:NotificationModel[] =[];



  constructor(private router: Router, private patientService: PatientService,private notificationService:NotificationService, 
    private socketService:SocketsService, public modalService:ModalService) { 
/*    this.socketService.subscribe('newNotification',(data:any) => {
      this.notifications = this.notificationService.getNotifications();
    })
    this.notifications = this.notificationService.getNotifications();
  */ this.subroute = this.router.url; 
    this.router.events.subscribe((event:Event) =>
    {
      if (event instanceof NavigationStart) {

        this.subroute = this.router.url; 

      }
      if (event instanceof NavigationEnd) {

        this.subroute = this.router.url; 

      }

    });

    this.patientService.getUsers().subscribe((result) => {
      this.patients = result;
    });

  }

  ngOnInit(): void {
    this.getNotifications()
    this.socketService.subscribe("notificationUpdate", (data:any) => {
      this.getNotifications()
  
    });
  

  }

  private getNotifications(): void {
    this.notificationService.getNotifications().subscribe((result) => {
      result.sort((objA,objB) => { 
        if (objA.timeSent < objB.timeSent)
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
      this.notifications = result;
    });
  }


  chatOpen(){
      console.log("chat open");
  }

  // this is kind of a temp fix until i find a better way to do this 
  // however if i navigate on the same component but different user the component's ngOnInit is not triggered
  // this way values are not updated. With this if i navigate to an empty path and imediately to the path i originaly wanted
  // thus triggereing the an initialization of the component with a "hack"
  navigateToUser(username:string){
    let path:string = "/observe/" + username + "/main";
  
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([path]);
  }); 
  }

  openNotification(name:string,type:number,timestamp:Date,id:string,notificationData:NotificationModel){
    
    let desc:string = '';
    let title:string ='';
    if (type === 3)
    {
      //todo implement open chat.
      return;
    }
    // call
    if(type === 1)
    {
      title = 'Missed call'
      desc = 'You have a missed call from ' + name +' at ';
    }
    // video call
    if(type === 2)
    {
      title = 'Missed video call'
      desc = 'You have a missed video call from ' + name +' at ' ;
    }
    if (type === 4)
    {
      title = 'Missed notification'
      desc = 'You have a missed notification from ' + name +' at ' ;
    }
    // message do nothing we 
    this.modalService.openDialog(title,desc,type,timestamp); 

    
    this.deleteNotification(notificationData);

  }

  public deleteNotification(notification: NotificationModel): void {
       
    this.notificationService.delete(notification._id).subscribe(() => {
      this.getNotifications();
      this.socketService.publish("notificationUpdate", {});
    });
  
}
}

import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Message } from 'src/app/global/models/messages/message.model';
import { User } from 'src/app/global/models/patient/patient.model';
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
  public patients: User[] = [];
  public notifications:Message[] =[];


  
  constructor(private router: Router, patientService: PatientService,private notificationService:NotificationService, 
    private socketService:SocketsService, public modalService:ModalService) { 
    this.socketService.subscribe('newNotification',(data:any) => {
      this.notifications = this.notificationService.getNotifications();
    })
    this.notifications = this.notificationService.getNotifications();
    this.subroute = this.router.url; 
    this.router.events.subscribe((event:Event) =>
    {
      if (event instanceof NavigationStart) {
      
        console.log('start');
        this.subroute = this.router.url; 
  
      }
      if (event instanceof NavigationEnd) {
      
        console.log('end');
        this.subroute = this.router.url; 
        console.log(this.router.url);

      }
      
    });

    this.patients = patientService.getUsers();
    
  }

  ngOnInit(): void {
 
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

  openNotification(name:string,type:number,timestamp:string,index:number){
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
      desc = 'You have a missed call from ' + name +' at ' +timestamp+ '.'  
    }
    // video call
    if(type === 2)
    {
      title = 'Missed video call'
      desc = 'You have a missed video call from ' + name +' at ' +timestamp+ '.'  
    }
    if (type === 4)
    {
      title = 'Missed notification'
      desc = 'You have a missed notification from ' + name +' at ' +timestamp+ '.'  
    }
    // message do nothing we 
    this.modalService.openDialog(title,desc,type); 
    this.notificationService.deleteNotification(index);
    console.log('testing');

  }
}

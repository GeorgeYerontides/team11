import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ChatModel } from 'src/app/global/models/chat/chat.model';
import { NotificationModel } from 'src/app/global/models/messages/notification.model';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { ChatService } from 'src/app/global/services/chat/chat.service';
import { ModalService } from 'src/app/global/services/modals/modal.service';
import { NotificationService } from 'src/app/global/services/notifications/notification.service';
import { PatientService } from 'src/app/global/services/patient/patients.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('scrollBottom') scrollBottom:any;
  public subroute:string = "";
  public route: string = "/observe/users"
  public patients: PatientModel[] = [];
  public notifications:NotificationModel[] =[];
  public chatMessages:ChatModel[]=[];
  public chat:boolean = false;
  selectedOption!: string;
  currChatName: string = 'Andreas';
  currChatSurname: string = 'Mixahl';

  constructor(private router: Router, private patientService: PatientService,private notificationService:NotificationService, 
    private socketService:SocketsService, public modalService:ModalService, private chatService:ChatService) { 
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
    this.getChatMessages();
    this.socketService.subscribe('chat_update',(data: any) =>{
      this.getChatMessages();

    });
    
    
 
   
  }
  scrolTolBottom(){
    this.scrollBottom.nativeElement.scrollTop= this.scrollBottom.nativeElement.scrollHeight;
  }
  getChatMessages(){
    this.chatService.getNotifications().subscribe((result)=>{
      result.sort((objA,objB) => { 
        if (objA.time > objB.time)
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

      
      
      this.chatMessages = result.filter
      (data => ((data.senderName === this.currChatName) && (data.senderSurname === this.currChatSurname) && (data.receiverName === "Kostas") && (data.receiverSurame === "Kosta")) 
      ||       ((data.receiverName === this.currChatName) && (data.receiverSurame === this.currChatSurname) && (data.senderName === "Kostas") && (data.senderSurname === "Kosta"))
      );
    
    });

    setTimeout( () => {this.scrolTolBottom()} ,1000);  

  }

  chatSend(form:NgForm){

    if(form.valid === false)
    {
      return;
    }
    console.log(form);

    let chatMessage = new ChatModel();
    chatMessage.receiverName = this.currChatName;
    chatMessage.receiverSurame= this.currChatSurname;
    chatMessage.senderName = 'Kostas';
    chatMessage.senderSurname = 'Kosta';
    chatMessage.time = new Date();
    chatMessage.message = form.form.value['chat'];

    this.chatService.create(chatMessage).subscribe((result) => {
     
      this.socketService.publish("chat_update", {});
    });
    form.controls['chat'].setValue('');
  }

  private getNotifications(): void {
    this.notificationService.getNotifications().subscribe((result) => {
      result.sort((objA,objB) => { 
        if (objA.timeSent > objB.timeSent)
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
  updateChatUser(user:string) {
    this.currChatName = user.split(' ',2)[0].replace(/\s/g, "");
    this.currChatSurname = user.split(' ',2)[1].replace(/\s/g, "");
    this.socketService.publish("chat_update", {});
  }
  chatOpen(){
      console.log("chat open");
      this.chat = true;
  }

  chatClose(){
    this.chat = false;
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

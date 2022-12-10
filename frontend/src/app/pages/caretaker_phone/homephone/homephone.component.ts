import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs';
import { ChatModel } from 'src/app/global/models/chat/chat.model';
import { PatientModel } from 'src/app/global/models/patient/patient.model';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { ChatService } from 'src/app/global/services/chat/chat.service';
import { ModalService } from 'src/app/global/services/modals/modal.service';
import { NotificationService } from 'src/app/global/services/notifications/notification.service';
import { PatientService } from 'src/app/global/services/patient/patients.service';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-homephone',
  templateUrl: './homephone.component.html',
  styleUrls: ['./homephone.component.scss']
})
export class HomephoneComponent implements OnInit {
  
  public patients: PatientModel[] = [];
  public chatMessages:ChatModel[]=[];
  public chat:boolean = false;
  selectedOption!: string;
  currChatName: string = 'Andreas';
  currChatSurname: string = 'Mixahl';


  public name: string ='';
  public surname: string ='';
  public currUser!:PatientModel;
  protected routineEvents:RoutineModel[]=[];
  urlSafe!: SafeResourceUrl;

  constructor(private sanitizer:DomSanitizer,private routineService:RoutineService,private route:ActivatedRoute,private router: Router,
    private patientService: PatientService,private notificationService:NotificationService,private socketService:SocketsService, 
    private chatService:ChatService) { 
    this.patientService.getUsers().subscribe((result) => {
      this.patients = result;
    });
  }

   ngOnInit(): void {
/*
    let snapshot = this.route.snapshot;
    let nameTemp = snapshot.params['name'];
    let usernameTemp = nameTemp.split(" ",2);
*/
    let usernameTemp = '';  
    
    usernameTemp = this.route.snapshot.params['name'].split(" ",2);
    console.log(usernameTemp);

    timeout(1);

    this.patientService.getUser(usernameTemp[0],usernameTemp[1]).subscribe((result) => {
      console.log('the user is ' , result,);
        this.currUser = result[0];
      console.log('the user is ' , this.currUser,this.currUser.name);
      this.name = this.currUser.name;
      this.surname = this.currUser.surname;
    });

    this.getAllTasks();
    this.socketService.subscribe("routine_update", (data: any) => {
      this.getAllTasks();
    });

    this.getAllTasks();

    
    this.socketService.subscribe('chat_update',(data: any) =>{
      console.log("lalalalaa");
      this.getChatMessages();

    });

    this.getChatMessages();

  }



  private async getAllTasks(){
    await this.routineService.getAll().subscribe((result) => {
     result.sort((objA,objB) => { 
       if (objA.startTime > objB.startTime)
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
     
     let username = this.currUser.name + " "+ this.currUser.surname;
     this.routineEvents = result.filter(data => data.patient === username);
     console.log( this.routineEvents);
    });


 }






  getChatMessages(){
    console.log("lalalalala");
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


  information_div_btn:boolean = true;
  expand_details_div:boolean = false;
  detailed_vitals_div:boolean = false;
  back_to_menu_btn:boolean = true;
  elder_personal_information_div:boolean = false;
  medication_div:boolean = false;
  message_div:boolean = false;
  events_div:boolean = true;
  top_bar_of_messages:boolean = false;
  notifications_div:boolean = false;
  top_bar_of_notifications:boolean = false;
  vital_status_div:boolean = true;
  top_bar_general:boolean = true;
  readed_flag_1:boolean = true;
  readed_flag_2:boolean = true;
  missed_notifications:number = 2;
  check_if_0_notifications:boolean = true;
  video_call_live:boolean = false;
  app_routine_phonect_add:boolean = false;
  close_chat:boolean = true;


  Information_btn(){
    this.information_div_btn = false;
    this.expand_details_div = true; 
  }

  Detailed_menu_information(){
    this.information_div_btn = true;
    this.expand_details_div = false;    
  }

  Detailed_vitals_information(){
    this.detailed_vitals_div = true;
    this.expand_details_div = false;
  }

  /* Back button actions(what hide or show) */
  Back_to_Menu(){
    this.expand_details_div = true;
    this.detailed_vitals_div = false;
    this.elder_personal_information_div = false;
    this.medication_div = false;
  }

  Personal_information(){
    this.elder_personal_information_div = true;
    this.expand_details_div = false;
  }

  Medical_information(){
    this.medication_div = true;
    this.expand_details_div = false;
  }

  show_message_section(){
    this.notifications_div = false;
    this.top_bar_of_notifications = false;
    this.message_div = true;
    this.top_bar_of_messages = true;
    this.vital_status_div = false;
    this.events_div = false;
    this.video_call_live = false;
    this.medication_div = false;
    this.close_chat = true;
  }

  back_to_HS(){
    this.message_div = false;
    this.top_bar_of_messages = false;
    this.events_div = true;
    this.vital_status_div = true;
    this.top_bar_general = true;
    this.notifications_div = false;
    this.top_bar_of_notifications = false;
    this.information_div_btn = true;
    this.video_call_live = false;
  }

  show_notification_section(){
    this.message_div = false;
    this.top_bar_of_messages = false;
    this.notifications_div = true;
    this.top_bar_of_notifications = true;
    this.events_div = false;
    this.vital_status_div = false;
    this.top_bar_general = false;
    this.information_div_btn = false;
    this.video_call_live = false;
    this.medication_div = false;
  
  }

  hide_message(){
    this.readed_flag_1 = false;
    this.missed_notifications = this.missed_notifications - 1;
    if(this.missed_notifications === 0){
      this.check_if_0_notifications = false;
    }
  }

  hide_message_2(){
    this.readed_flag_2 = false;
    this.missed_notifications = this.missed_notifications - 1;
    if(this.missed_notifications === 0){
      this.check_if_0_notifications = false;
    }
  }

  open_video_call(){
    this.top_bar_of_messages = false;
    this.top_bar_of_notifications= false;
    this.video_call_live = true;
    this.top_bar_general = true;
    this.events_div = false;
  }

  end_video_call(){
    this.video_call_live = false;
    this.events_div = true;
    this.top_bar_of_messages = false;
    this.top_bar_of_notifications= false;
    this.medication_div = false;
    this.notifications_div = false;
  }

  open_add_event(){
    this.app_routine_phonect_add = true;
  }


  navigateHome(){
    this.router.navigate(["/phonect"],);
  }

}

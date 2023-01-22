import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/global/models/alert/alert.model';
import { ChatModel } from 'src/app/global/models/chat/chat.model';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { ChatService } from 'src/app/global/services/chat/chat.service';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-elder-phone',
  templateUrl: './elder-phone.component.html',
  styleUrls: ['./elder-phone.component.scss']
})
export class ElderPhoneComponent implements OnInit {
  @ViewChild('scrollBottom') scrollBottom:any;
  @Input() self!:RoutineModel;
  currChatName: string = 'Kostas';
  currChatSurname: string = 'Kosta';

  public chatMessages:ChatModel[]=[];
  yellow_alert:boolean = false;
  red_alert:boolean = false;
  message:string = "";

  activity_suggestions:boolean = true;
  expand_activity_suggestions:boolean = false;
  visit_neighboor_div:boolean = false;
  go_for_walk_div:boolean = false;
  other_activity_div:boolean = false;
  messages_div:boolean = false; 
  messages_top_bar_div:boolean = false;
  welcome_message_div:boolean = true;
  to_do_events_div:boolean = true;
  done_events_div:boolean = false;
  done_events:boolean = true;


  constructor(private socketService:SocketsService,private smartSpeaker:SmartSpeakerService,private chatService:ChatService
    ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      console.log("aaaaaaaaa",params); // { orderby: "price" }

    }
  );

    this.socketService.subscribe("alert_event",(data:any)=>{
      console.log(data);
      if(data.level === "yellow"){
        this.welcome_message_div = false;
        this.yellow_alert = true;
        this.message = data.message + " " + data.time;
      }
    })
    this.getChatMessages();
    this.socketService.subscribe('chat_update',(data: any) =>{
      this.getChatMessages();

    });
    
    this.smartSpeaker.addCommand(['close','complete','finish','done','close reminder'],()=>{
      this.yellow_alert = false;
      this.welcome_message_div = true;
    });

    this.smartSpeaker.initialize();
    this.smartSpeaker.start();
    
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
      (data => ((data.senderName === this.currChatName) && (data.senderSurname === this.currChatSurname) && (data.receiverName === "Kostas") && (data.receiverSurame === "Lamprou")) 
      ||       ((data.receiverName === this.currChatName) && (data.receiverSurame === this.currChatSurname) && (data.senderName === "Kostas") && (data.senderSurname === "Lamprou"))
      );
      setTimeout( () => {this.scrolTolBottom()} ,1000);  
    
    });

    

  }

  scrolTolBottom(){
    this.scrollBottom.nativeElement.scrollTop= this.scrollBottom.nativeElement.scrollHeight;
  }
  open_suggest_activities(){
    this.expand_activity_suggestions = true;
    this.activity_suggestions = false;
  }

  back_to_main(){
    this.activity_suggestions = false;
    this.expand_activity_suggestions = true;
    this.visit_neighboor_div = false;
    this.go_for_walk_div = false;
    this.other_activity_div = false;
    this.messages_div = false;
    this.messages_top_bar_div = false;
    this.welcome_message_div = true;
    this.to_do_events_div = true;
    this.done_events_div = false;
  }

  back_to_home(){
    this.activity_suggestions = true;
    this.expand_activity_suggestions = false;
  }

  visit_neighboor_func(){
    this.visit_neighboor_div = true;
    this.expand_activity_suggestions = false;
  }

  go_for_walk_func(){
    this.go_for_walk_div = true;
    this.expand_activity_suggestions = false;
  }

  other_activity_func(){
    this.other_activity_div = true;
    this.expand_activity_suggestions = false;
  }

  open_messages_func(){
    this.messages_div =  !this.messages_div;
    this.messages_top_bar_div = !this.messages_top_bar_div;
    this.welcome_message_div = !this.welcome_message_div;
    this.to_do_events_div = !this.to_do_events_div ;
    this.done_events_div = !this.done_events_div;
  }

  to_do_events_func(){
    this.done_events_div = false;
    this.to_do_events_div = true;
  }

  done_events_func(){
    this.to_do_events_div = false;
    this.done_events_div = true;
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
    chatMessage.senderSurname = 'Lamprou';
    chatMessage.time = new Date();
    chatMessage.message = form.form.value['chat'];

    this.chatService.create(chatMessage).subscribe((result) => {
     
      this.socketService.publish("chat_update", {});
    });
    form.controls['chat'].setValue('');
  }
}

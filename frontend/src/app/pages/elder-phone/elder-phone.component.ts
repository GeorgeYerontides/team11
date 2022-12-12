import { Component, Input, OnInit } from '@angular/core';
import { Alert } from 'src/app/global/models/alert/alert.model';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-elder-phone',
  templateUrl: './elder-phone.component.html',
  styleUrls: ['./elder-phone.component.scss']
})
export class ElderPhoneComponent implements OnInit {
  @Input() self!:RoutineModel;
  constructor(private socketService:SocketsService) { }

  yellow_alert:boolean = false;
  red_alert:boolean = false;
  message:string = "";

  ngOnInit(): void {

    this.socketService.subscribe("alert_event",(data:any)=>{
      console.log(data);
      if(data.level === "yellow"){
        this.welcome_message_div = false;
        this.yellow_alert = true;
        this.message = data.message + " " + data.time;
      }
    })

    


  }

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
    this.messages_div = true;
    this.messages_top_bar_div = true;
    this.welcome_message_div = false;
    this.to_do_events_div = false;
    this.done_events_div = false;
  }

  to_do_events_func(){
    this.done_events_div = false;
    this.to_do_events_div = true;
  }

  done_events_func(){
    this.to_do_events_div = false;
    this.done_events_div = true;
  }

  
}

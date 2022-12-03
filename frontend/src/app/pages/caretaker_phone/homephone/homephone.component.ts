import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homephone',
  templateUrl: './homephone.component.html',
  styleUrls: ['./homephone.component.scss']
})
export class HomephoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
  }

}

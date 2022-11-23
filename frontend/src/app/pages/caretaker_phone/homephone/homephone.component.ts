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
    this.message_div = true;
    this.top_bar_of_messages = true;
    this.vital_status_div = false;
    this.events_div = false;
  }

  back_to_HS(){
    this.message_div = false;
    this.top_bar_of_messages = false;
    this.events_div = true;
    this.vital_status_div = true;
    this.notifications_div = false;
    this.top_bar_of_notifications = false;
  }

  show_notification_section(){
    this.notifications_div = true;
    this.top_bar_of_notifications = true;
    this.events_div = false;
    this.vital_status_div = false;
  
  }

}

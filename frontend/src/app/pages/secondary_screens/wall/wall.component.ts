import { Component, OnInit } from '@angular/core';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(private socketService:SocketsService, private smartSpeaker:SmartSpeakerService) { }
  public status: boolean = false;
  public title: string = '';
  public description: string = '';
  public danger:boolean = false;
  public yellow_status: boolean = false;
  public yellow_title: string = '';
  public yellow_description: string = '';
  public yellow:boolean = false;


  ngOnInit(): void {
    this.socketService.subscribe("wallNotification", (data: any) => {
      if( data.status){

        this.status = data.status;
        this.title = data.routine.title;
      }
      else
      {
        this.status = data.status;
      }
    });

    this.socketService.subscribe("medicalEvent", (data: any) => {
      if( data.status){

        this.status = data.status;
        this.title = data.routine.title;
      }
      else
      {
        this.status = data.status;
      }
    });
  
  
    this.socketService.subscribe("alert_event", (data: any) => {
      console.log(data);
      
      if( data.level === "yellow"){
        this.yellow_status = true;
        this.yellow_description = data.message + " " + data.time;
        this.smartSpeaker.speak(this.yellow_description);
      }
      
    });

    this.smartSpeaker.addCommand(['close','complete','finish','done'],()=>{
      this.yellow_status = false;
    });

    this.smartSpeaker.initialize();
    this.smartSpeaker.start();
  }
  


  

}

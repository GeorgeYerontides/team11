import { Component, OnInit } from '@angular/core';
import { SmartSpeakerService } from 'src/app/global/services/smart-speaker/smart-speaker.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {
  public status:boolean = false;
  public title:string= '';
  public description:string= '';
  constructor(private socketService:SocketsService, private smartSpeaker:SmartSpeakerService) { }

  ngOnInit(): void {
    this.socketService.subscribe("tvNotification", (data: any) => {
      if( data.status){

        this.status = data.status;
        this.title = data.routine.title;
        this.description = data.routine.description;
      }
      else
      {
        this.status = data.status;
      }
    });

   
  

    this.smartSpeaker.addCommand(['close','complete','finish','done'],()=>{
      this.status = false;
    });

    this.smartSpeaker.initialize();
    this.smartSpeaker.start();
  }

}

import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  constructor(private socketService:SocketsService) { }
  public status: boolean = false;
  public title: string = '';
  public description: string = '';
  ngOnInit(): void {
    this.socketService.subscribe("wallNotification", (data: any) => {
      if( data.status === true){

        this.status = data.status;
        this.title = data.routine.title;
      }
      else
      {
        this.status = data.status;
      }
    });
  }

}

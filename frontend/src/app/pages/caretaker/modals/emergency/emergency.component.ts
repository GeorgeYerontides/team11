import { Component, OnInit } from '@angular/core';
import { medicalEventModel } from 'src/app/global/models/medicalEvents/medeve.model';
import { MedicalEventService } from 'src/app/global/services/medicalEvents/medeve.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-emergency',
  templateUrl: './emergency.component.html',
  styleUrls: ['./emergency.component.scss']
})
export class EmergencyComponent implements OnInit {
  public name:string ='';
  public surname:string ='';
  public date:Date = new Date();
  public cause:string = '';
  public room:string = '';
  constructor(private socketService:SocketsService, private emergencyService:MedicalEventService) { }

  async ngOnInit() {
    this.socketService.subscribe('medicalEvent2', (data:any) =>{
      console.log('pop up baby');
      console.log('event' , data);
      
      this.name = data.data.patientName;
      this.surname = data.data.patientSurname;
      this.cause = data.data.cause;
      this.date = data.data.date;
      this.room = data.data.room;
      console.log('name', data.data.patientName );
    });

    console.log('hello');
  }


  close(){
    this.socketService.publish("emergencyMode",{value:false});
  }
}

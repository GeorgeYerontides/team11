import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/global/models/alert/alert.model';
import { alertService } from 'src/app/global/services/patient/alert.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-magical-controller',
  templateUrl: './magical-controller.component.html',
  styleUrls: ['./magical-controller.component.scss']
})
export class MagicalControllerComponent implements OnInit {

  constructor(private alert:alertService, private socketService: SocketsService) { 

    
  }

  

  ngOnInit(): void {
  }
  createAlertYellow(){
    // this.alert.setValue(true);
    let alert:Alert = new Alert("Kostas Lamprou","yellow","Check blood pressure","in 15 mins.");
    this.socketService.publish("alert_event",alert);
  }
  createAlertRed(){
    // this.alert.setValue(true);
    let alert:Alert = new Alert("Kostas Lamprou","red");
    this.socketService.publish("alert_event",alert);
  }
  createAlertOrange(){
    // this.alert.setValue(true);
    let alert:Alert = new Alert("Kostas Lamprou","orange");
    this.socketService.publish("alert_event",alert);
  }

}

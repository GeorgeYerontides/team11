import { Component, OnInit } from '@angular/core';
import { alertService } from 'src/app/global/services/patient/alert.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-magical-controller',
  templateUrl: './magical-controller.component.html',
  styleUrls: ['./magical-controller.component.scss']
})
export class MagicalControllerComponent implements OnInit {

  constructor(private alert:alertService, private socketService: SocketsService) { }

  ngOnInit(): void {
  }
  createAlert(){
    // this.alert.setValue(true);
    this.socketService.publish("alert_event", {name: "john", level: "yellow"});
  }

}

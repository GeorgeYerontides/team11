import { Component, OnInit } from '@angular/core';
import { alertService } from 'src/app/global/services/patient/alert.service';

@Component({
  selector: 'app-magical-controller',
  templateUrl: './magical-controller.component.html',
  styleUrls: ['./magical-controller.component.scss']
})
export class MagicalControllerComponent implements OnInit {

  constructor(private alert:alertService) { }

  ngOnInit(): void {
  }
  createAlert(){
    this.alert.setValue(true);
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-display-phone',
  templateUrl: './monitor-display-phone.component.html',
  styleUrls: ['./monitor-display-phone.component.scss']
})
export class MonitorDisplayPhoneComponent implements OnInit {
  @Input() typeMon: any;
  constructor() { }

  ngOnInit(): void {
  }

}

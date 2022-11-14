import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() name: string | undefined;
  @Input() messageType: number | undefined;
  @Input() time: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}

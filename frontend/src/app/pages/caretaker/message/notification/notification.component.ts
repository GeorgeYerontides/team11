import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  
  @Input() name: string | undefined;
  @Input() messageType: number | undefined;
  @Input() time!: Date | null;
  constructor() { }

  ngOnInit(): void {
  }

  goToUser(){
    console.log("testing");
  }
}

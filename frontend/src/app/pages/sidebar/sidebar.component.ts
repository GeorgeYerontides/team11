import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/global/models/messages/message.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public notifications:Message[] = [
    new Message( 'Kostas', 'test', 'test',1,'09:15'),
    new Message( 'Kostas', 'test', 'test', 2,'09:00')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  addMessage(){
    this.notifications.push(new Message('test', 'test', 'test',3,'test'));
  }
}

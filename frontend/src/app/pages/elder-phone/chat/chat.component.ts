import { Component, OnInit,Input } from '@angular/core';
import { ChatModel } from 'src/app/global/models/chat/chat.model';

@Component({
  selector: 'app-chat-phone',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatPhoneComponent implements OnInit {
  @Input() self!:ChatModel
  @Input() userName!:string;
  @Input() userSurname!:string;
  constructor() { }

  ngOnInit(): void {
  }

}

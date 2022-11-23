import { Injectable } from "@angular/core";
import { Message } from "../../models/messages/message.model";
import { SocketsService } from "../sockets/sockets.service";




@Injectable({
    providedIn: 'root'
  })
export class NotificationService {

    constructor(private socketService:SocketsService){

    }
    private notifications:Message[] = [
        new Message( 'Kostas',  'test',1,'09:15'),
        new Message( 'Kostas',  'test', 2,'09:00'),
        new Message( 'Kostas',  'test', 2,'09:00'),
        new Message( 'Kostas',  'test', 2,'09:00'),
        new Message( 'Kostas',  'test', 2,'09:00'),

      ];

      public getNotifications(){
        return this.notifications.slice(0,this.notifications.length);
      }

      public addNewNotification(name:string, desc: string, type:number){
        this.notifications.unshift(new Message(name, desc,type,'test'));
        console.log('testing');
        this.socketService.publish("newNotification",{});

      }
 
}
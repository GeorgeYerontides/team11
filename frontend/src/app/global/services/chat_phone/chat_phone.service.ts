import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { ChatModel } from "../../models/chat/chat.model";

import { SocketsService } from "../sockets/sockets.service";



@Injectable({
    providedIn: 'root'
  })
export class ChatService {
  private hostURl: string;
  constructor(private http: HttpClient,private socketService:SocketsService) {
      this.hostURl = environment.host;
      // remove comment to delete all items
      // this.deleteAll();
    }
  


      public getNotifications(): Observable<ChatModel[]> {
        console.log('get notification called');
        return this.http
          .get<ChatModel[]>(`${this.hostURl}/api/chat/`)
          .pipe(map(result => _.map(result, (t) => new ChatModel(t))));
    }



      public create(resource: ChatModel): Observable<ChatModel> {
        return this.http
          .post<ChatModel>(`${this.hostURl}/api/chat/`, resource)
          .pipe(map(result => new ChatModel(result)));
      }


 
}
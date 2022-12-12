import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { NotificationModel } from "../../models/messages/notification.model";
import { PatientModel } from "../../models/patient/patient.model";
import { RoutineModel } from "../../models/routine/routine.model";
import { SocketsService } from "../sockets/sockets.service";



@Injectable({
    providedIn: 'root'
  })
export class NotificationService {
  private hostURl: string;

  private wallNotification: boolean = false;
  constructor(private http: HttpClient,private socketService:SocketsService) {
      this.hostURl = environment.host;
      // remove comment to delete all items
      // this.deleteAll();
    }
  


      public getNotifications(): Observable<NotificationModel[]> {
        console.log('get notification called');
        return this.http
          .get<NotificationModel[]>(`${this.hostURl}/api/notification/`)
          .pipe(map(result => _.map(result, (t) => new NotificationModel(t))));
    }



      public openWall(routine:RoutineModel){
        console.log('open');
        this.wallNotification = true;
        this.socketService.publish('wallNotification',{ status: this.wallNotification, routine: routine});
      }

      public closeWall(){
        console.log('close');

        this.wallNotification = false;
        this.socketService.publish('wallNotification',{ status: this.wallNotification });
      }

      public create(resource: NotificationModel): Observable<NotificationModel> {
        return this.http
          .post<NotificationModel>(`${this.hostURl}/api/notification`, resource)
          .pipe(map(result => new NotificationModel(result)));
      }

      public delete(id: string): Observable<void> {
        console.log("delete ",id);
        return this.http.delete<void>(`${this.hostURl}/api/notification/${id}`);
      }
 
}
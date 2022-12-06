import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { medicalEventModel } from "../../models/medicalEvents/medeve.model";
import { SocketsService } from "../sockets/sockets.service";



@Injectable({
    providedIn: 'root'
  })
export class MedicalEventService {
  private hostURl: string;
  constructor(private http: HttpClient,private socketService:SocketsService) {
      this.hostURl = environment.host;
      // remove comment to delete all items
      // this.deleteAll();
    }
  


      public getNotifications(): Observable<medicalEventModel[]> {
        console.log('get notification called');
        return this.http
          .get<medicalEventModel[]>(`${this.hostURl}/api/medicalEvents/`)
          .pipe(map(result => _.map(result, (t) => new medicalEventModel(t))));
    }

  

      public addNewNotification(name:string, desc: string, type:number){
    

      }

      public update(resource: medicalEventModel): Observable<medicalEventModel> {
        console.log( 'resource is',resource);

        return this.http
          .put<medicalEventModel>(`${this.hostURl}/api/medicalEvents/${resource._id}`, resource)
          .pipe(map(result => new medicalEventModel(result)));
      }


      public create(resource: medicalEventModel): Observable<medicalEventModel> {
        return this.http
          .post<medicalEventModel>(`${this.hostURl}/api/medicalEvents`, resource)
          .pipe(map(result => new medicalEventModel(result)));
      }

      public getById(id: string): Observable<medicalEventModel> {
        return this.http
          .get<medicalEventModel>(`${this.hostURl}/api/medicalEvents/${id}`)
          .pipe(map(result => new medicalEventModel(result)));
      }
 
}
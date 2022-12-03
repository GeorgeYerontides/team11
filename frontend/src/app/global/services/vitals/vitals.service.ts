import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { VitalsModel } from "../../models/vitals/vitals.model";
import { SocketsService } from '../sockets/sockets.service';

@Injectable({
    providedIn: 'root',
})
export class VitalsService {
    private caretakerBusy = false;

    private hostURl: string;
    constructor(private http: HttpClient,private socketService:SocketsService) {
        this.hostURl = environment.host;
        // remove comment to delete all items
        // this.deleteAll();
      }

    public getVitals(): Observable<VitalsModel[]> {
        console.log('get vitals called');
        return this.http
          .get<VitalsModel[]>(`${this.hostURl}/api/vitals/`)
          .pipe(map(result => _.map(result, (t) => new VitalsModel(t))));
    }

    public getUserVitals(name: string,surname:string): Observable<VitalsModel[]> {
        console.log('getting vitals from db');
        return this.http
          .get<VitalsModel[]>(`${this.hostURl}/api/vitals/${name}/${surname}`)
          .pipe(map(result => _.map(result, (t) => new VitalsModel(t))));
    }

    public update(resource: VitalsModel): Observable<VitalsModel> {
        console.log( 'resource is',resource);

        return this.http
          .put<VitalsModel>(`${this.hostURl}/api/vitals/${resource._id}`, resource)
          .pipe(map(result => new VitalsModel(result)));
      }

      public setCaretakerStatus(status:boolean){
        this.caretakerBusy = status;
        console.log(this.caretakerBusy);
      }
      public getCaretakerStatus(){
        return this.caretakerBusy;
      }
   
}
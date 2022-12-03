import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { CaretakerModel } from "../../models/caretaker/caretaker.model";
import { SocketsService } from '../sockets/sockets.service';

@Injectable({
    providedIn: 'root',
})
export class CaretakerService {

    private hostURl: string;
    constructor(private http: HttpClient,private socketService:SocketsService) {
        this.hostURl = environment.host;
        // remove comment to delete all items
        // this.deleteAll();
      }

    public getCaretakers(): Observable<CaretakerModel[]> {
        console.log('get notification called');
        return this.http
          .get<CaretakerModel[]>(`${this.hostURl}/api/caretaker/`)
          .pipe(map(result => _.map(result, (t) => new CaretakerModel(t))));
    }

    public getUserCaretaker(name: string,surname:string): Observable<CaretakerModel[]> {
        console.log('getting location from db');
        return this.http
          .get<CaretakerModel[]>(`${this.hostURl}/api/caretaker/${name}/${surname}`)
          .pipe(map(result => _.map(result, (t) => new CaretakerModel(t))));
    }

    public update(resource: CaretakerModel): Observable<CaretakerModel> {
        console.log( 'resource is',resource);
      
        return this.http
          .put<CaretakerModel>(`${this.hostURl}/api/caretaker/${resource._id}`, resource)
          .pipe(map(result => new CaretakerModel(result)));
      }

   
}
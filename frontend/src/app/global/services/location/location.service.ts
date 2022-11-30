import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { LocationModel } from '../../models/location/location.model';
import { SocketsService } from '../sockets/sockets.service';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    private hostURl: string;
    constructor(private http: HttpClient,private socketService:SocketsService) {
        this.hostURl = environment.host;
        // remove comment to delete all items
        // this.deleteAll();
      }

    public getLocations(): Observable<LocationModel[]> {
        console.log('get notification called');
        return this.http
          .get<LocationModel[]>(`${this.hostURl}/api/location/`)
          .pipe(map(result => _.map(result, (t) => new LocationModel(t))));
    }

    public getUserLocation(name: string,surname:string): Observable<LocationModel[]> {
        console.log('getting location from db');
        return this.http
          .get<LocationModel[]>(`${this.hostURl}/api/location/${name}/${surname}`)
          .pipe(map(result => _.map(result, (t) => new LocationModel(t))));
    }

    public update(resource: LocationModel): Observable<LocationModel> {
        console.log( 'resource is',resource);

        return this.http
          .put<LocationModel>(`${this.hostURl}/api/location/${resource._id}`, resource)
          .pipe(map(result => new LocationModel(result)));
      }
   
}
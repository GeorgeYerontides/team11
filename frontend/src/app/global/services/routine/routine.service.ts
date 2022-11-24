import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, map } from "rxjs";
import { RoutineModel } from "../../models/routine/routine.model";
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
  })
  export class RoutineService {
    private hostURl: string;
    constructor(private http: HttpClient) {
        this.hostURl = environment.host;
        // remove comment to delete all items
        // this.deleteAll();
      }
    public getAll(): Observable<RoutineModel[]> {
        return this.http
          .get<RoutineModel[]>(`${this.hostURl}/api/routine/`)
          .pipe(map(result => _.map(result, (t) => new RoutineModel(t))));
    }

    public update(resource: RoutineModel): Observable<RoutineModel> {
        console.log( 'resource is',resource);

        return this.http
          .put<RoutineModel>(`${this.hostURl}/api/routine/${resource._id}`, resource)
          .pipe(map(result => new RoutineModel(result)));
      }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { PatientModel } from "../../models/patient/patient.model";


@Injectable({
    providedIn: 'root'
  })
export class PatientService {
  private hostURl: string;
  constructor(private http: HttpClient) {
      this.hostURl = environment.host;
      // remove comment to delete all items
      // this.deleteAll();
    }

  public getUsers(): Observable<PatientModel[]> {
    return this.http
      .get<PatientModel[]>(`${this.hostURl}/api/patient/`)
      .pipe(map(result => _.map(result, (t) => new PatientModel(t))));
}



  public getUser(name: string,surname:string): Observable<PatientModel[]> {
    return this.http
      .get<PatientModel[]>(`${this.hostURl}/api/patient/${name}/${surname}`)
      .pipe(map(result => _.map(result, (t) => new PatientModel(t))));
}
}
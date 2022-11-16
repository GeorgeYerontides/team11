import { Injectable } from "@angular/core";
import { User } from "../../models/patient/patient.model";

@Injectable({
    providedIn: 'root'
  })
export class PatientService {
private users: User[] = [
    new User("Andread Mixahl", 1000),
    new User("Dimitris Papa", 2000),
    new User("Giorgos Trifonos", 3000),
    new User("Kostas Lamprou", 4000)

  ]

  public getUsers(){
    return this.users.slice(0,this.users.length);
  }

  public getUser(name: string){
    return this.users.find(obj => {
        return obj.Name === name;
    })
    
  }
}
import { Injectable } from "@angular/core";
import { User } from "../../models/patient/patient.model";


@Injectable({
    providedIn: 'root'
  })
export class PatientService {
  private users: User[] = [
    new User("Andreas Mixahl", 1000),
    new User("Dimitris Papa", 2000),
    new User("Giorgos Trifonos", 3000),
    new User("Kostas Lamprou", 4000)

  ]

  public getUsers(){
    return this.users.slice(0,this.users.length);
  }

  // have to be explicit about return type because there is a chance that undefined is return as far as find is concerned
  // hover logically our find will never return that because we are using a specific string we know exists
  // to do change string to id possibly for name duplication
  public getUser(name: string):User{
    return <User>this.users.find(obj => {
        return obj.Name === name;
    })
    

    
  }
 
}
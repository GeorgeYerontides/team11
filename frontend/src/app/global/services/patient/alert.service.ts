import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
  })
export class alertService {
 
    private alertStatus: BehaviorSubject<boolean>;
    private currentLevel!:number;
    constructor() {
      this.alertStatus = new BehaviorSubject<boolean>(false);
    }
    
    getValue(): Observable<boolean> {
        return this.alertStatus.asObservable();
    }
    
    setValue(newValue: boolean): void {
        this.alertStatus.next(newValue);
        console.log('alert ' + newValue);
    }

 
}
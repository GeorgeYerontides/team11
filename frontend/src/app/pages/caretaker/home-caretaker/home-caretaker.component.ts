import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { alertService } from 'src/app/global/services/patient/alert.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';


@Component({
  selector: 'app-home-caretaker',
  templateUrl: './home-caretaker.component.html',
  styleUrls: ['./home-caretaker.component.scss']
})
export class HomeCaretakerComponent implements OnInit {
  public subroute:string = "";  
  public route: string = "/observe/"
  
  public alert:boolean = true; //toggle alert

  constructor(private router: Router, private alertService:alertService, private socketService: SocketsService) { 
    this.subroute = this.router.url; 
    this.router.events.subscribe((event:Event) =>
    {
      if (event instanceof NavigationStart) {
      
  
        this.subroute = this.router.url; 
    
      }
      if (event instanceof NavigationEnd) {
      

        this.subroute = this.router.url; 
      
      }
      
    })
   

  }
  ngOnInit(): void {
    this.alertService.getValue().subscribe((value) => {
      this.alert = value;
      console.log('caretaker comp' + this.alert);
    });
    
    this.socketService.subscribe("alert_event", (data: any) => {
      console.log("Event arrived");
      this.alert = true;
      console.log(data);
    });
  }

  navigateHome(){
    this.router.navigate(["/observe/users"],);
  }

}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-home-caretaker',
  templateUrl: './home-caretaker.component.html',
  styleUrls: ['./home-caretaker.component.scss']
})
export class HomeCaretakerComponent implements OnInit {
  public subroute:string = "";  
  public route: string = "/observe/"
  
  public alert:boolean = false; //toggle alert

  constructor(private router: Router) { 
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
    
  }

  navigateHome(){
    this.router.navigate(["/observe/users"],);
  }

}

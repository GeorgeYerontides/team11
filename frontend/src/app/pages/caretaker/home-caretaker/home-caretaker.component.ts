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
  public alert:boolean = false;
  constructor(private router: Router) { 
    this.subroute = this.router.url; 
    this.router.events.subscribe((event:Event) =>
    {
      if (event instanceof NavigationStart) {
      
        console.log('start');
        this.subroute = this.router.url; 
        console.log(this.router.url);
        console.log(this.route.includes(this.subroute));
      }
      if (event instanceof NavigationEnd) {
      
        console.log('end');
        this.subroute = this.router.url; 
        console.log(this.router.url);
        console.log(this.route);
        console.log(this.route.includes(this.subroute));
      }
      
    })
   
  }
  ngOnInit(): void {
    
  }

  navigateHome(){
    this.router.navigate(["/observe"],);
  }

}

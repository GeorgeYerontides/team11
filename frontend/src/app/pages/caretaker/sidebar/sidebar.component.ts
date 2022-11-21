import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Message } from 'src/app/global/models/messages/message.model';
import { User } from 'src/app/global/models/patient/patient.model';
import { PatientService } from 'src/app/global/services/patient/patients.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public subroute:string = "";
  public route: string = "/observe/users"
  public patients: User[] = [];

  public notifications:Message[] = [
    new Message( 'Kostas', 'test', 'test',1,'09:15'),
    new Message( 'Kostas', 'test', 'test', 2,'09:00'),
    new Message( 'Kostas', 'test', 'test', 2,'09:00'),

    new Message( 'Kostas', 'test', 'test', 2,'09:00'),
    new Message( 'Kostas', 'test', 'test', 2,'09:00')

  ];

  
  constructor(private router: Router, patientService: PatientService) { 

    this.subroute = this.router.url; 
    this.router.events.subscribe((event:Event) =>
    {
      if (event instanceof NavigationStart) {
      
        console.log('start');
        this.subroute = this.router.url; 
  
      }
      if (event instanceof NavigationEnd) {
      
        console.log('end');
        this.subroute = this.router.url; 
        console.log(this.router.url);

      }
      
    });

    this.patients = patientService.getUsers();
  }

  ngOnInit(): void {
  }

  addMessage(){
    this.notifications.push(new Message('test', 'test', 'test',3,'test'));
  }

  chatOpen(){
      console.log("chat open");
  }

  // this is kind of a temp fix until i find a better way to do this 
  // however if i navigate on the same component but different user the component's ngOnInit is not triggered
  // this way values are not updated. With this if i navigate to an empty path and imediately to the path i originaly wanted
  // thus triggereing the an initialization of the component with a "hack"
  navigateToUser(username:string){
    let path:string = "/observe/" + username;
  
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([path]);
  }); 
  }
}

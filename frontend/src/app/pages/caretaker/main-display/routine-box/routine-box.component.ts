import { Component, Input, OnInit } from '@angular/core';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-routine-box',
  templateUrl: './routine-box.component.html',
  styleUrls: ['./routine-box.component.scss']
})

export class RoutineBoxComponent implements OnInit {
  @Input() self!: RoutineModel;
  @Input() reqiresCaretaker:boolean = false;
  public start:string ='';
  public end:string ='';
  public time:string ='';


  constructor(private routineService:RoutineService,private socketService:SocketsService) {
    
  }
  async ngOnInit() {
   

    // console.log('test ', this.self.createdAt.getHours());
   /* if ( this.self.endTime != null)
    {
      this.end = this.self.endTime.getHours().toString().padStart(2, '0') + ":" + this.self.endTime.getMinutes().toString().padStart(2, '0');
    }
    else
    {
      this.end = "-"
    }
    this.time = this.start + ' - ' + this.end; 
    console.log(this.time);
 this.start = this.self.startTime.getHours().toString().padStart(2, '0') + ":" + this.self.startTime.getMinutes().toString().padStart(2, '0');
    */
  }

  changeCompleted(){
    console.log(this.self);
    this.self.completed = !this.self.completed; 
    console.log('data\n'+new RoutineModel(this.self));
    this.routineService.update(this.self).subscribe((result)=>{
      this.socketService.publish("routine_update",{});
    });

  }
}

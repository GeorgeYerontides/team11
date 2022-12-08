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


  constructor(private routineService:RoutineService,private socketService:SocketsService) { }

  ngOnInit(): void {
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

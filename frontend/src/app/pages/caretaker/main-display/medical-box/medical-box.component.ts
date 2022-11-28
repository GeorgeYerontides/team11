import { Component, Input, OnInit } from '@angular/core';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-medical-box',
  templateUrl: './medical-box.component.html',
  styleUrls: ['./medical-box.component.scss']
})
export class MedicalBoxComponent implements OnInit {
  @Input() self!:RoutineModel;
  constructor(private routineService:RoutineService,private socketService:SocketsService) { }

  async ngOnInit() {
    console.log(this.self);
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

import { Component, Input, OnInit } from '@angular/core';
import { RoutineModel } from 'src/app/global/models/routine/routine.model';
import { RoutineService } from 'src/app/global/services/routine/routine.service';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-event-box',
  templateUrl: './event-box.component.html',
  styleUrls: ['./event-box.component.scss']
})
export class EventBoxComponent implements OnInit {
  @Input() self!:RoutineModel;
  constructor(private routineService:RoutineService,private socketService:SocketsService) { }

  ngOnInit(): void {
  }

  public deleteRoutine(): void {
    const response = confirm("Are you sure you want to delete this task?");
    if (response) {
      this.routineService.delete(this.self._id).subscribe(() => {
        this.socketService.publish("routine_update", {});
      });
    }
  }

}

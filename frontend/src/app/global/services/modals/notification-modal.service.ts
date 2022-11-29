import { Injectable } from '@angular/core';
import { RoutineModel } from '../../models/routine/routine.model';
import { SocketsService } from '../sockets/sockets.service';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    showAdd = false;
    showDialog = false;
    name:string = '';
    desc:string = "";
    type:number = -1;
    timeSent:Date = new Date();
    constructor (private socketService:SocketsService){}

    openDialog(name:string,desc:string, type:number, timeSent:Date){
        this.showDialog = true;
        this.name = name;
        this.desc = desc;
        this.type = type;
        this.timeSent = timeSent;
        this.socketService.publish('modalEvent',{});
    }

    closeDialog(){
        this.showDialog = false;
        this.socketService.publish('modalEvent',{});
    }

    openRoutine(){
        this.showAdd = true;
        this.socketService.publish('routineModal',{});
    }

    closeRoutine(){
        this.showAdd = false;
        this.socketService.publish('routineModal',{});
    }
}
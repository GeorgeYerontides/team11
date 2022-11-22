import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-routine-box',
  templateUrl: './routine-box.component.html',
  styleUrls: ['./routine-box.component.scss']
})
export class RoutineBoxComponent implements OnInit {
  @Input() requiresCaretaker:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}

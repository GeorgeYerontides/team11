import { Component, Input,OnInit } from '@angular/core';
import { MonitorDisplayComponent } from '../monitor-display/monitor-display.component';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.scss']
})
export class MainDisplayComponent implements OnInit {
  @Input() patientName: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}

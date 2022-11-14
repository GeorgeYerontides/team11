import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-display',
  templateUrl: './monitor-display.component.html',
  styleUrls: ['./monitor-display.component.scss']
})
export class MonitorDisplayComponent implements OnInit {
  @Input() typeMon: any;
  constructor() { }
  test: string = "aa";
  ngOnInit(): void {
    console.log(this.typeMon);
    this.test = this.typeMon;
  }

}

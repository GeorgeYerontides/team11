import { Component, Input,OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MonitorDisplayComponent } from '../monitor-display/monitor-display.component';

@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.scss']
})
export class MainDisplayComponent implements OnInit {
  @Input() patientName: string | undefined;
  constructor(private router:Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

  navigateToPatient(){
    var path= "../"+ this.patientName + "/main";
    console.log(path);
    this.router.navigate([path], {relativeTo: this.route});
  }
}

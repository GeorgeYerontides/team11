import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-display-phone',
  templateUrl: './home-display-phone.component.html',
  styleUrls: ['./home-display-phone.component.scss']
})
export class HomeDisplayPhoneComponent implements OnInit {
  @Input() typeMon:any;  
  constructor() { }

  ngOnInit(): void {
  }

}

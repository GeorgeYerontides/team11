import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homephone',
  templateUrl: './homephone.component.html',
  styleUrls: ['./homephone.component.scss']
})
export class HomephoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  information_div_btn:boolean = true;
  expand_details_div:boolean = false;

    Information_btn(){
        this.information_div_btn = false;
        this.expand_details_div = true; 
        
    }
    Detailed_menu_information(){
      this.information_div_btn = true;
      this.expand_details_div = false; 
      
  }

}

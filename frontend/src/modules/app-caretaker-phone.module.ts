import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CaretakerPhoneRoutingModule } from './app-caretaker-phone-routing.module';
import { HomephoneComponent } from 'src/app/pages/caretaker_phone/homephone/homephone.component';
import { MainDipslayPhoneComponent } from 'src/app/pages/caretaker_phone/main-dipslay-phone/main-dipslay-phone.component';
import { MonitorDisplayPhoneComponent } from 'src/app/pages/caretaker_phone/monitor-display-phone/monitor-display-phone.component';
import { HomeDisplayPhoneComponent } from 'src/app/pages/caretaker_phone/home-display-phone/home-display-phone.component';


@NgModule({
    declarations: [
        HomephoneComponent,
        MainDipslayPhoneComponent,
        MonitorDisplayPhoneComponent,
        HomeDisplayPhoneComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        CaretakerPhoneRoutingModule],
    exports: [
        HomephoneComponent,
        MainDipslayPhoneComponent,
        MonitorDisplayPhoneComponent,
        HomeDisplayPhoneComponent,
    ]
  })

  export class CaretakerPhoneModule { };
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CaretakerPhoneRoutingModule } from './app-caretaker-phone-routing.module';
import { HomephoneComponent } from 'src/app/pages/caretaker_phone/homephone/homephone.component';
import { PatientObservePhoneComponent } from 'src/app/pages/caretaker_phone/patient-observe-phone/patient-observe-phone.component';
import { MainDisplayPhoneComponent } from 'src/app/pages/caretaker_phone/main-display-phone/main-display-phone.component';



@NgModule({
    declarations: [
        HomephoneComponent,
        PatientObservePhoneComponent,
        MainDisplayPhoneComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        CaretakerPhoneRoutingModule],
    exports: [
        HomephoneComponent,
        PatientObservePhoneComponent,
        MainDisplayPhoneComponent
    ]
  })

  export class CaretakerPhoneModule { };
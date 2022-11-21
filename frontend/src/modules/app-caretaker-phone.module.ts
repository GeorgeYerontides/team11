import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CaretakerPhoneRoutingModule } from './app-caretaker-phone-routing.module';
import { HomephoneComponent } from 'src/app/pages/caretaker_phone/homephone/homephone.component';



@NgModule({
    declarations: [
        HomephoneComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        CaretakerPhoneRoutingModule],
    exports: [
        HomephoneComponent,
    ]
  })

  export class CaretakerPhoneModule { };
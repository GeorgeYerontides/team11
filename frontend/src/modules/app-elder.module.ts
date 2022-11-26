import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ElderRoutingModule } from './app-elder-routing.module';
import { ElderPhoneComponent } from 'src/app/pages/elder-phone/elder-phone.component';



@NgModule({
    declarations: [
        ElderPhoneComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        ElderRoutingModule],
    exports: [
        ElderPhoneComponent,
    ]
  })

  export class ElderModule { };
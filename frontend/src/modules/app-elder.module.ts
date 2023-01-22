import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ElderRoutingModule } from './app-elder-routing.module';
import { ElderPhoneComponent } from 'src/app/pages/elder-phone/elder-phone.component';
import { ChatPhoneComponent } from 'src/app/pages/elder-phone/chat/chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [
        ElderPhoneComponent,
        ChatPhoneComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ElderRoutingModule],
    exports: [
        ElderPhoneComponent,
        ChatPhoneComponent,
    ]
  })

  export class ElderModule { };
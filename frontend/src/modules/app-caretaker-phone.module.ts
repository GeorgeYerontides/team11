import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CaretakerPhoneRoutingModule } from './app-caretaker-phone-routing.module';
import { HomephoneComponent } from 'src/app/pages/caretaker_phone/homephone/homephone.component';
import { PatientObservePhoneComponent } from 'src/app/pages/caretaker_phone/patient-observe-phone/patient-observe-phone.component';
import { MainDisplayPhoneComponent } from 'src/app/pages/caretaker_phone/main-display-phone/main-display-phone.component';
import { HomeDisplayPhoneComponent } from 'src/app/pages/caretaker_phone/home-display-phone/home-display-phone.component';
import { RoutinePhonectAddComponent } from 'src/app/pages/caretaker_phone/modals/routine-phonect-add/routine-phonect-add.component';
import { FormsModule } from '@angular/forms';
import { ChatPhoneComponent } from 'src/app/pages/caretaker_phone/modals/chat-phone/chat-phone.component';
import { RoutineBoxComponent } from 'src/app/pages/caretaker_phone/modals/routine-box/routine-box.component';




@NgModule({
    declarations: [
        HomephoneComponent,
        PatientObservePhoneComponent,
        MainDisplayPhoneComponent,
        HomeDisplayPhoneComponent,
        RoutinePhonectAddComponent, 
        ChatPhoneComponent, 
        RoutineBoxComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        CaretakerPhoneRoutingModule,
        FormsModule,
    ],
    exports: [
        HomephoneComponent,
        PatientObservePhoneComponent,
        MainDisplayPhoneComponent,
        HomeDisplayPhoneComponent,
        RoutinePhonectAddComponent, 
        ChatPhoneComponent, 
        RoutineBoxComponent,
    ]
  })

  export class CaretakerPhoneModule { };
import { NgModule } from '@angular/core';

import { MainDisplayComponent } from '../app/pages/main-display/main-display.component';
import { MonitorDisplayComponent } from '../app/pages/monitor-display/monitor-display.component';
import { PatientComponent } from '../app/pages/patient/patient.component';
import { SidebarComponent } from '../app/pages/sidebar/sidebar.component';
import { NotificationComponent } from '../app/pages/message/notification/notification.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        
        MainDisplayComponent,
        MonitorDisplayComponent,
        PatientComponent,
        SidebarComponent,
        NotificationComponent
    ],
    imports: [RouterModule,CommonModule],
    exports: [
        MainDisplayComponent,
        MonitorDisplayComponent,
        PatientComponent,
        SidebarComponent,
        NotificationComponent
    ]
  })

  export class CaretakerModule { };
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainDisplayComponent } from '../app/pages/main-display/main-display.component';
import { MonitorDisplayComponent } from '../app/pages/monitor-display/monitor-display.component';
import { PatientComponent } from '../app/pages/patient/patient.component';
import { SidebarComponent } from '../app/pages/sidebar/sidebar.component';
import { NotificationComponent } from '../app/pages/message/notification/notification.component';

import { PatientDashboardComponent } from 'src/app/pages/main-display/patient-dashboard/patient-dashboard.component';
import { CaretakerRoutingModule } from './app-caretaker-routing.module';
import { HomeCaretakerComponent } from 'src/app/pages/home-caretaker/home-caretaker/home-caretaker.component';

@NgModule({
    declarations: [
        HomeCaretakerComponent,
        MainDisplayComponent,
        MonitorDisplayComponent,
        PatientComponent,
        SidebarComponent,
        NotificationComponent,
        PatientDashboardComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        CaretakerRoutingModule],
    exports: [
        HomeCaretakerComponent,
        MainDisplayComponent,
        MonitorDisplayComponent,
        PatientComponent,
        SidebarComponent,
        NotificationComponent,
        PatientDashboardComponent
    ]
  })

  export class CaretakerModule { };
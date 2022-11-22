import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MainDisplayComponent } from '../app/pages/caretaker/main-display/main-display.component';
import { MonitorDisplayComponent } from '../app/pages/caretaker/monitor-display/monitor-display.component';
import { SidebarComponent } from '../app/pages/caretaker/sidebar/sidebar.component';
import { NotificationComponent } from '../app/pages/caretaker/message/notification/notification.component';

import { PatientDashboardComponent } from 'src/app/pages/caretaker/main-display/patient-dashboard/patient-dashboard.component';
import { CaretakerRoutingModule } from './app-caretaker-routing.module';
import { HomeCaretakerComponent } from 'src/app/pages/caretaker/home-caretaker/home-caretaker.component';
import { PatientObserveScreenComponent } from 'src/app/pages/caretaker/patient-observe-screen/patient-observe-screen.component';
import { MedicalBoxComponent } from 'src/app/pages/caretaker/main-display/medical-box/medical-box.component';
import { RoutineBoxComponent } from 'src/app/pages/caretaker/main-display/routine-box/routine-box.component';
import { DashboardDisplayComponent } from 'src/app/pages/caretaker/main-display/dashboard-display/dashboard-display.component';
import { EventOverviewComponent } from 'src/app/pages/caretaker/main-display/event-overview/event-overview.component';
import { MedicalHistoryComponent } from 'src/app/pages/caretaker/main-display/medical-history/medical-history.component';



@NgModule({
    declarations: [
        HomeCaretakerComponent,
        MainDisplayComponent,
        MonitorDisplayComponent,
        SidebarComponent,
        NotificationComponent,
        PatientDashboardComponent,
        PatientObserveScreenComponent,
        MedicalBoxComponent,
        RoutineBoxComponent,
        DashboardDisplayComponent,
        MedicalHistoryComponent,
        EventOverviewComponent,
    
    ],
    imports: [
        RouterModule,
        CommonModule,
        CaretakerRoutingModule],
    exports: [
        HomeCaretakerComponent,
        MainDisplayComponent,
        MonitorDisplayComponent,
    
        SidebarComponent,
        NotificationComponent,
        PatientDashboardComponent,
        PatientObserveScreenComponent,
        MedicalBoxComponent,
        RoutineBoxComponent,
        DashboardDisplayComponent,
        MedicalHistoryComponent,
        EventOverviewComponent,
    
    ]
  })

  export class CaretakerModule { };
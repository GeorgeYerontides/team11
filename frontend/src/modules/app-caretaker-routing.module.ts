import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeCaretakerComponent } from "src/app/pages/caretaker/home-caretaker/home-caretaker.component";
import { PatientObserveScreenComponent } from "src/app/pages/caretaker/patient-observe-screen/patient-observe-screen.component";
import { PatientDashboardComponent } from "src/app/pages/caretaker/main-display/patient-dashboard/patient-dashboard.component";
import { DashboardDisplayComponent } from "src/app/pages/caretaker/main-display/dashboard-display/dashboard-display.component";
// :id allows us to pass a variable to our route without the : the route is
// would be navigating to literaly /patient/id
const routes: Routes = [
    { path: '', redirectTo: '/observe/users', pathMatch: 'full' },
    { path: 'observe', component: HomeCaretakerComponent,children:
        [
            { path: 'users', component: PatientObserveScreenComponent},
            { path: ':name', component: DashboardDisplayComponent ,
                children: [
                    { path: 'main', component: PatientDashboardComponent},
                ]
            }
        ]
    },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CaretakerRoutingModule {
}
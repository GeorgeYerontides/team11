import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeCaretakerComponent } from "src/app/pages/caretaker/home-caretaker/home-caretaker.component";
import { PatientObserveScreenComponent } from "src/app/pages/caretaker/patient-observe-screen/patient-observe-screen.component";
import { PatientDashboardComponent } from "src/app/pages/caretaker/main-display/patient-dashboard/patient-dashboard.component";
// :id allows us to pass a variable to our route without the : the route is
// would be navigating to literaly /patient/id
const routes: Routes = [
    { path: '', redirectTo: '/observe', pathMatch: 'full' },
    { path: 'observe', component: PatientObserveScreenComponent},
    { path: 'observe/:name', component: PatientDashboardComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CaretakerRoutingModule {
}
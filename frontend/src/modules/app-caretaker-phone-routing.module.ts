import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeDisplayComponent } from "src/app/pages/caretaker_phone/home-display/home-display.component";
import { HomephoneComponent } from "src/app/pages/caretaker_phone/homephone/homephone.component";
// :id allows us to pass a variable to our route without the : the route is
// would be navigating to literaly /patient/id
const routes: Routes = [
    {path:"phonect",component:HomeDisplayComponent},
    {path:"phonect/:id",component:HomephoneComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CaretakerPhoneRoutingModule {
}
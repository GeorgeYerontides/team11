import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ElderPhoneComponent } from "src/app/pages/elder-phone/elder-phone.component";
// :id allows us to pass a variable to our route without the : the route is
// would be navigating to literaly /patient/id
const routes: Routes = [
    {path:"elder/:id",component:ElderPhoneComponent},
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ElderRoutingModule {
}
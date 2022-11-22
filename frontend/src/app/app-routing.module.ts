import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { MagicalControllerComponent } from './pages/magical-controller/magical-controller.component';

const routes: Routes = [
  // { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  //{ path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  //{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  //{ path: 'item-shop', component: ItemShopComponent},
  //{ path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'controller', component: MagicalControllerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

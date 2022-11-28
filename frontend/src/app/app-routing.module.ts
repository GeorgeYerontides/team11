import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { MagicalControllerComponent } from './pages/magical-controller/magical-controller.component';
import { TvComponent } from './pages/secondary_screens/tv/tv.component';
import { WallComponent } from './pages/secondary_screens/wall/wall.component';

const routes: Routes = [
  // { path: 'socket-events', loadChildren: () => import('./pages/socket-events/socket-events.module').then(m => m.SocketEventsModule) },
  //{ path: 'tasks', loadChildren: () => import('./pages/tasks/tasks.module').then(m => m.TasksModule) },
  //{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  //{ path: 'item-shop', component: ItemShopComponent},
  //{ path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: 'controller', component: MagicalControllerComponent},
  { path: 'wall', component: WallComponent},
  { path: 'tv', component: TvComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

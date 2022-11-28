import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ItemShopComponent } from './pages/item-shop/item-shop.component';
import { ItemPreviewComponent } from './pages/item-shop/item-preview/item-preview.component';
import { CaretakerModule } from '../modules/app-caretaker.module';
import { CaretakerPhoneModule } from 'src/modules/app-caretaker-phone.module';
import { MagicalControllerComponent } from './pages/magical-controller/magical-controller.component';
import { ElderModule } from 'src/modules/app-elder.module';
import { EventBoxComponent } from './pages/caretaker/main-display/event-overview/event-box/event-box.component';
import { WallComponent } from './pages/secondary_screens/wall/wall.component';
import { TvComponent } from './pages/secondary_screens/tv/tv.component';


const socketIoConfig: SocketIoConfig = { url: environment.host, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    ItemShopComponent,
    ItemPreviewComponent,
    MagicalControllerComponent,
    WallComponent,
    TvComponent,


  ],
  imports: [
    SocketIoModule.forRoot(socketIoConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CaretakerModule,
    CaretakerPhoneModule,
    ElderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

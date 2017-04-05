import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapComponent } from '../components/map/map';
import { PickupComponent } from '../components/pickup/pickup';
import { AvailableCarsComponent } from '../components/available-cars/available-cars';
import { PickupCarComponent } from '../components/pickup-car/pickup-car';
import { CarService } from '../providers/car';
import { SimulateService } from '../providers/simulate';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapComponent,
    PickupComponent,
    AvailableCarsComponent,
    PickupCarComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarService,
    SimulateService
  ]
})
export class AppModule {}

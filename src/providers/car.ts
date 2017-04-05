import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { SimulateService } from './simulate';

@Injectable()
export class CarService {

  public simulate: SimulateService;

  constructor(public simulateService: SimulateService) { 
    this.simulate = new SimulateService();
  }

  getPickupCar(){
    return this.simulate.getPickupCar();
  }


  findPickupCar(pickupLocation){
    return this.simulate.findPickupCar(pickupLocation);
  }

  getCars(lat, lng){
    return Observable
      .interval(2000)
      .switchMap(() => this.simulate.getCars(lat, lng))
      .share();
  }
}

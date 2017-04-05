import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class SimulateService {

  public directionsService: google.maps.DirectionsService;
  public myRoute: any;
  public myRouteIndex: number;

  constructor() {
    this.directionsService = new google.maps.DirectionsService();
  }
  
  findPickupCar(pickupLocation){

    this.myRouteIndex = 0;
    let car = this.cars1.cars[0]; // pick one of the cars to simulate pickupLocation
    let start = new google.maps.LatLng(car.coord.lat, car.coord.lng);
    let end = pickupLocation;

    return this.simulateRoute(start, end);
  }

  simulateRoute(start, end){
    return Observable.create(observable => {
      this.calculateRoute(start, end).subscribe(directions => {
        // get route path
        this.myRoute = this.getSegmentedDirections(directions);
        // return pickup car
        this.getPickupCar().subscribe(car => {
          observable.next(car); // First increment in car path
        })
      })
    });
  }

  getPickupCar(){
    return Observable.create(observable => {
      let car = this.myRoute[this.myRouteIndex];

      observable.next(car);
      this.myRouteIndex++;
    })
  }

  getSegmentedDirections(directions){
    let route = directions.routes[0];
    let legs = route.legs;
    let path = [];
    let increments = [];
    let duration = 0;

    let numOfLegs = legs.length;

    while(numOfLegs--){
      let leg = legs[numOfLegs];
      let steps = leg.steps;
      let numOfSteps = steps.length;

      while(numOfSteps--){
        let step = steps[numOfSteps];
        let points = step.path;
        let numOfPoints = points.length;

        duration += step.duration.value;

        while(numOfPoints--){
          let point = points[numOfPoints];
          path.push(point);
          increments.unshift({
            position: point,
            time: duration,
            path: path.slice(0)
          })
        }
      }
    }

    return increments;
  }

  calculateRoute(start, end){
    return Observable.create(observable => {
      this.directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if(status === google.maps.DirectionsStatus.OK){
          observable.next(response);
        }else {
          observable.error(status);
        }
      })
    })
  }

  getCars(lat, lng){
    let carData = this.cars[this.carIndex];
    this.carIndex++;

    if(this.carIndex > this.cars.length-1){
      this.carIndex = 0;
    }

    return Observable.create(
      observer => observer.next(carData)
    );
  }

  private carIndex: number = 0;

  private cars1 = {
    cars: [{
      id: 1,
      coord: {
        lat: 14.857936,
        lng: -90.070832
      }
    },
    {
      id: 2,
      coord: {
        lat: 14.857708,
        lng: -90.069630
      }
    }]
  };

  private cars2 = {
    cars: [{
      id: 1,
      coord: {
        lat: 14.851714,
        lng: -90.070574
      }
    },
    {
      id: 2,
      coord: {
        lat: 14.854452,
        lng: -90.068665
      }
    }]
  };

  private cars3 = {
    cars: [{
      id: 1,
      coord: {
        lat: 14.855738,
        lng: -90.071604
      }
    },
    {
      id: 2,
      coord: {
        lat: 14.854265,
        lng: -90.070338
      }
    }]
  };

  private cars4 = {
    cars: [{
      id: 1,
      coord: {
        lat: 14.855323,
        lng: -90.066948
      }
    },
    {
      id: 2,
      coord: {
        lat: 14.856568,
        lng: -90.071175
      }
    }]
  };

  private cars5 = {
    cars: [{
      id: 1,
      coord: {
        lat: 14.853871,
        lng: -90.070918
      }
    },
    {
      id: 2,
      coord: {
        lat: 14.854645,
        lng: -90.069652
      }
    }]
  };

  private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];
}

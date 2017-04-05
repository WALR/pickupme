import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CarService } from '../../providers/car';

@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html'
})
export class AvailableCarsComponent implements OnInit{

  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;

  public carMarkers: Array<google.maps.Marker>;

  constructor(public carService: CarService) {
    this.carMarkers = [];
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.fetchAndRefreshCars();
    
  }

  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    if(this.isPickupRequested){
      this.removeCarMarkers();
    }
  }

  // ngAfterViewInit(){
  //   console.log("After init view CARS");
  //   this.fetchAndRefreshCars();
  // }

  removeCarMarkers(){
    let numOfCars = this.carMarkers.length;
    while(numOfCars--){
      let car = this.carMarkers.pop();
      car.setMap(null);
    }
  }
  
  addCarMarker(car){
    // let carMarker = new google.maps.Marker({
    let carMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: 'img/car2-icon.png'
    });

    carMarker.setDuration(2000);
    // carMarker.setEasing('linear');

    carMarker.set('id', car.id); // MVCObject()
    this.carMarkers.push(carMarker);
  }

  updateCarMarker(car){
    for(var i=0, numOfCars=this.carMarkers.length; i < numOfCars; i++){
      // find car and update it
      if(this.carMarkers[i]["id"] === car.id){
        this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
        return;
      }
    }
    // car does not exist in carMarkers
    this.addCarMarker(car);
  }

  fetchAndRefreshCars(){
    this.carService.getCars(9, 9)
      .subscribe(carsData => {
        if(!this.isPickupRequested){
          (<any>carsData).cars.forEach( car => {
            this.updateCarMarker(car);
          })
        }
      })
  }

}

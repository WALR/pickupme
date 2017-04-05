import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CarService } from '../../providers/car';

@Component({
  selector: 'pickup-car',
  templateUrl: 'pickup-car.html'
})
export class PickupCarComponent implements OnInit, OnChanges {

  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Input() pickupLocation: google.maps.LatLng;

  public pickupCarMarker: SlidingMarker;
  public polylinePath: google.maps.Polyline;

  constructor(public carService: CarService) {

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  ngOnChanges() {
    if(this.isPickupRequested){
      // request car
      this.requestCar();

    }else{
      // cancel car
      this.cancelCar();
      this.removeDirections();
    }
    
  }

  requestCar(){
    console.log("Request Car: " + this.pickupLocation)
    this.carService.findPickupCar(this.pickupLocation)
      .subscribe(car => {
        // show car marker
        this.addCarMarker(car.position);
        // show car path/directions to you
        this.showDirections(car.path);
        // update car
        this.updateCar();
      });
  }

  cancelCar(){
    if(this.pickupCarMarker){
      this.pickupCarMarker.setMap(null);
      this.pickupCarMarker = null;
    }
  }

  removeDirections(){
    if(this.polylinePath){
      this.polylinePath.setMap(null);
      this.polylinePath = null;
    }
  }

  addCarMarker(position){
    this.pickupCarMarker = new SlidingMarker({
      map: this.map,
      position: position,
      icon: 'img/car2-icon.png'
    });

    this.pickupCarMarker.setDuration(1000);
    // this.pickupCarMarker.setEasing('linear');
  }

  showDirections(path){
    this.polylinePath = new google.maps.Polyline({
      path: path, 
      strokeColor: '#FF0000',
      strokeWeight: 3
    });
    this.polylinePath.setMap(this.map);
  }

  updateCar(){
    this.carService.getPickupCar()
      .subscribe(car => {
        // animate cat to next point
        this.pickupCarMarker.setPosition(car.position);
        // set direction path for car
        this.polylinePath.setPath(car.path);

        // keep update car
        if(car.path.length > 1){
          setTimeout(() => {
            this.updateCar();
          }, 1000);
        }else {
          // arrive car
        }
      })
  }

}

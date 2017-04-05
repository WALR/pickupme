import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CarService } from '../../providers/car';

declare var google;

@Component({
  selector: 'pickup',
  templateUrl: 'pickup.html'
})
export class PickupComponent implements OnChanges{
  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Output() updatePickupLocation: EventEmitter<google.maps.LatLng> = new EventEmitter();

  private pickupMarker: google.maps.Marker;
  private popup: google.maps.InfoWindow;

  constructor() { }

  ngOnChanges(changes) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    console.log("Algo cambio" + this.isPinSet);
    // console.log("Dato" + this.firstMarker);
    if(!this.isPickupRequested){
      if(this.isPinSet){
        this.showPickupMarker();
      }else{
        // console.log("Elimino Marker");
        this.removePickupMarker();
      }  
    }
  }

  ngAfterViewInit(){
    console.log("After init view PICKUP");
  }

  showPickupMarker(){
    this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: this.map.getCenter(),
      icon: 'img/user-icon2.png'
    });

    setTimeout(() => {
      this.pickupMarker.setAnimation(null);
    }, 750);

    this.showPickupTime();

    // send pickup location
    this.updatePickupLocation.next(this.pickupMarker.getPosition());

  }
  removePickupMarker(){
    if(this.pickupMarker){
      this.pickupMarker.setMap(null);
      this.pickupMarker = null;
    }
  }

  showPickupTime(){
    this.popup = new google.maps.InfoWindow({
      content: '<h5>You Are Here</h5>'
    });

    this.popup.open(this.map, this.pickupMarker);
    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker);
    })
  }

  checkShowMarker(): boolean{
    if(typeof this.isPinSet == "undefined"){
      // console.log("Undefinide")
      return false;
    }else if(this.isPinSet == true){
      // console.log("Es Falso")
      return false;
    }
    else{
      return true;
    }
  }

}

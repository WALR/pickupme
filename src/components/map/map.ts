import { Component, Input, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

declare var google;

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent implements OnInit {
  @Input() isPickupRequested: boolean;
  public map: google.maps.Map;
  public isMapIdle: boolean;
  public currentLocation: google.maps.LatLng;

  constructor(public navCtrl: NavController, public platform: Platform, public loadingCtrl: LoadingController) { 
    // platform.ready().then(() => {
    //         this.map = this.loadMap();
    //         this.addMapEventListeners();
    //         this.getCurrentLocation().subscribe(location => {
    //           this.centerLocation(location);
    //         })
    //     });
   }
  ngOnInit() {
    this.map = this.loadMap();
    this.addMapEventListeners();
    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    })
  }

  updatePickupLocation(location){
    this.currentLocation = location;
    this.centerLocation(location);
  }

   addMapEventListeners(){
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    });
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    });
   }

   getCurrentLocation(){
      let loader = this.loadingCtrl.create({
        content: "Locating..."
      });
      loader.present();
      let options = {timeout: 10000, enableHighAccuracy: true};

      let locationObs = Observable.create(observable => {
          Geolocation.getCurrentPosition(options)
            .then(resp => {
              let lat = resp.coords.latitude;
              let lng = resp.coords.longitude;

              let location = new google.maps.LatLng(lat, lng)
              observable.next(location);
              loader.dismiss();
            },
            (err) => {
              console.log("Geolocation err: "+JSON.stringify(err));
              loader.dismiss();
            })
      })
      return locationObs;
   }

  loadMap(latLng = new google.maps.LatLng(14.8512887,-80.07000540)){
  
    let mapOptions = {
      center: latLng,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);
    return map;
  }

  centerLocation(location){
    if(location){
      this.map.panTo(location);
    }else{
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      });
    }
  }

}

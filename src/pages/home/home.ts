import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public isPickRequested: boolean;

  constructor(public navCtrl: NavController) {
    this.isPickRequested = false;
  }

  confirmPickup(){
    this.isPickRequested = true;
  }

  cancelPickup(){
    this.isPickRequested = false;
  }

  ionViewDidLoad() {
    console.log("I'm alive! Home");
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :( Home");
  }

}

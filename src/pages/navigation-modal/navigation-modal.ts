import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the NavigationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-navigation-modal',
  templateUrl: 'navigation-modal.html',
})
export class NavigationModalPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public destinationLat: any;
  public destinationLng: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadingController: LoadingController,
    public geolocation: Geolocation
  ) {
    this.destinationLat = parseFloat(this.navParams.get('lat'));
    this.destinationLng = parseFloat(this.navParams.get('lng'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NavigationModalPage');
    this.initMap();
    // this.startNavigating();
  }

  initMap() {
    let locationLoadingController = this.loadingController.create({
      content: "Getting your Location"
    });

    locationLoadingController.present();

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: '../assets/img/maps/pin2.png',
        position: this.map.getCenter()
      });

      locationLoadingController.dismiss();

      this.directionsDisplay.setMap(this.map);
      this.calculateAndDisplayRoute(position);

    }, (err) => {
      console.log(err);
    });
  }

  calculateAndDisplayRoute(position) {
    this.directionsService.route({
      origin: {lat: position.coords.latitude, lng: position.coords.longitude},
      destination: {lat: this.destinationLat, lng: this.destinationLng},
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}

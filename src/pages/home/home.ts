import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, private loadingController: LoadingController) {

  }

  ionViewDidLoad(){
    this.initMap();
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
        position: this.map.getCenter()
      });

      let content = '<h4>Information!</h4><p id="details">Contact number: +94777352562</p>'+
      '<button id="tap" onclick="infoWindowTouched()">'+
      'SIGN IN</button>';


      this.addInfoWindow(marker, content);

      locationLoadingController.dismiss();

    }, (err) => {
      console.log(err);
    });


    // this.directionsDisplay.setMap(this.map);
  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

    infoWindow.setContent('<input type="button" value="View" onclick="joinFunction()"><input type="button" value="Join" onclick="alert(\"infoWindow\")">');

    // google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
    //   document.getElementById('tap').addEventListener('click', () => {
    //     //alert('Clicked');
    //     this.infoWindowTouched();
    //   });
    // });
  }

  joinFunction(){
    alert("dgds");
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}

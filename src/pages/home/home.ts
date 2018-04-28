import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { BranchProvider } from '../../providers/branch/branch';


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

  public branches: any = [];

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    private loadingController: LoadingController,
    private navParams: NavParams,
    private branchProvider: BranchProvider) {

  }

  ionViewDidLoad(){
    this.initMap();
    this.getBranches();
  }


  getBranches(){
    this.branchProvider.getBranches()
      .subscribe(data => {
        this.branches = data;
        this.addBranchesToMap();
      }, err => {
        console.log(err);
      });
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

      //add branches to map
      for(let branch of this.branches){
        let lat = parseFloat(branch.lat);
        let lng = parseFloat(branch.lng);
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: {lat: lat, lng: lng}
        });
        let content = '<h4>'+ branch.location +' Branch</h4><p id="details">Contact number: +94777352562>sdg</button> </p>';

        this.addInfoWindow(marker, content);
      }

      locationLoadingController.dismiss();

    }, (err) => {
      console.log(err);
    });


    // this.directionsDisplay.setMap(this.map);
  }

  addBranchesToMap(){

  }

  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

    infoWindow.setContent(content);

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

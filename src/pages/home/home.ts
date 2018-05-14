import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, NavParams, ActionSheetController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { MenuPage } from '../menu/menu';

import { BranchProvider } from '../../providers/branch/branch';
import { MealProvider } from '../../providers/meal/meal';


declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public destinationLat: any;
  public destinationLng: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  public branches: any = [];

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    private loadingController: LoadingController,
    private navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private branchProvider: BranchProvider,
    private mealProvider: MealProvider) {

  }

  ionViewDidLoad(){
    this.initMap();
    this.getBranches();
  }


  getBranches(){
    this.branchProvider.getBranches()
      .subscribe(data => {
        this.branches = data;
        // this.addBranchesToMap();
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

      this.directionsDisplay.setMap(this.map);

      //add branches to map
      for(let branch of this.branches){
        let lat = parseFloat(branch.lat);
        let lng = parseFloat(branch.lng);
        let location = {
          lat: lat,
          lng: lng
        };
        let marker = new google.maps.Marker({
          map: this.map,
          icon: '../assets/img/maps/store.png',
          animation: google.maps.Animation.DROP,
          position: location
        });

        marker.addListener('click', () => {
          this.showActionSheet(branch, position, location);
        });
      }

      locationLoadingController.dismiss();

    }, (err) => {
      console.log(err);
    });
  }

  showActionSheet(branch, userPosition, destination){
    let optionsSheet = this.actionSheetCtrl.create({
      title: branch.location,
      buttons: [
        {
          text: 'Navigate',
          handler: () => {
            this.destinationLat = parseFloat(destination.lat);
            this.destinationLng = parseFloat(destination.lng);
            this.calculateAndDisplayRoute(userPosition, destination);
          }
        },
        {
          text: 'Order',
          handler: () => {
            let meals: any = [];
            let menuLoadingController = this.loadingController.create({
              content: 'Loading Meals'
            });
            menuLoadingController.present();
            this.mealProvider.getMeals(branch.branch_id)
              .subscribe(data => {
                meals = data;
                menuLoadingController.dismiss();
                this.navCtrl.setRoot(MenuPage, {
                  meals: meals
                });
              }, err => {
                menuLoadingController.dismiss();
                console.log(err);
              });;
          }
        },
        {
          text: 'Cancel',
          role: 'destructive'
        }
      ]
    });
    optionsSheet.present();
  }

  calculateAndDisplayRoute(position, destination) {
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

}

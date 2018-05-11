import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { BranchPage } from '../branch/branch';
import { NavigationModalPage } from '../navigation-modal/navigation-modal';

import { BranchProvider } from '../../providers/branch/branch';
import { TravelDetailsProvider } from '../../providers/travel-details/travel-details';
import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the BranchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
var service = new google.maps.DistanceMatrixService();
var self = this;
@IonicPage()
@Component({
  selector: 'page-branches',
  templateUrl: 'branches.html',
})
export class BranchesPage {

  public branches: any = [];
  public allBranches: any = [];

  public travelDetails: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public branchProvider: BranchProvider,
    public travelProvider: TravelDetailsProvider,
    public loadingController: LoadingController,
    public geolocation: Geolocation,
    public modalCtrl: ModalController,
    public orderProvider: OrderProvider
  ){
  }

  ionViewDidLoad() {
    this.getBranches();
    console.log('ionViewDidLoad BranchesPage');
  }



  getBranches(){
    this.travelDetails = [];
    let loadingBranches = this.loadingController.create({
      content: 'Loading branches'
    });
    loadingBranches.present();
    this.branchProvider.getBranches()
      .subscribe(data => {
        this.allBranches = data;
        this.geolocation.getCurrentPosition().then((position) => {
          this.getBranchDistanceAndTime(position);
        });
        loadingBranches.dismiss();
      }, err => {
        console.log(err);
      });
  }

  gotoBranch(branch, travelDetail){
    let hasOrder = true;
    this.orderProvider.getUnpaidOrders().then(data => {
      data.subscribe(data => {
        let orderDetails: any = data;
        hasOrder = orderDetails.message == undefined ? true : false;
        this.navCtrl.push(BranchPage, {
          branch: branch,
          travelDetail: travelDetail,
          hasOrder: hasOrder
        });
      }, err => {
        console.log(err);
      });
    });
  }

  async getBranchDistanceAndTime(position){
    for(let branch of this.allBranches){
      await this.getTravelDetails(branch, position);
    }
  }

  getTravelDetails(branch, position){
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(position.coords.latitude, position.coords.longitude)],
        destinations: [new google.maps.LatLng(branch.lat, branch.lng)],
        travelMode: 'DRIVING'
      }, (response, status) => {
        this.callback(response, status);
      }
    );
  }

  callback = (response, status) => {
    let travelDetailsObject;
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var duration = element.duration.text;
          var from = origins[i];
          var to = destinations[j];
          travelDetailsObject = {
            distance: distance,
            duration: duration
          }
        }
      }
      this.travelDetails.push(travelDetailsObject);
    }
  }

  openNavigationModal(branch){
    let navModal = this.modalCtrl.create(NavigationModalPage, branch);
    navModal.present();
  }

}

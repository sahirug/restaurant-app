import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BranchPage } from '../branch/branch';

import { BranchProvider } from '../../providers/branch/branch';
import { TravelDetailsProvider } from '../../providers/travel-details/travel-details';

/**
 * Generated class for the BranchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-branches',
  templateUrl: 'branches.html',
})
export class BranchesPage {


  public pet: string = "puppies"
  public branches: any = [];
  public allBranches: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public branchProvider: BranchProvider,
    public travelProvider: TravelDetailsProvider
  ){
  }

  ionViewDidLoad() {
    this.getBranches();
    console.log('ionViewDidLoad BranchesPage');
  }

  getBranches(){
    this.branchProvider.getBranches()
      .subscribe(data => {
        this.allBranches = data;
        this.getBranchDistanceAndTime();
      }, err => {
        console.log(err);
      });
  }

  gotoBranch(branch){
    this.navCtrl.push(BranchPage, {
      branch: branch
    });
  }

  getBranchDistanceAndTime(){
    // console.log(this.allBranches);
    for(let branch of this.allBranches){
      this.travelProvider.getTravelDetails(branch)
        .subscribe(data => {
          console.log(data)
        }, err => {
          console.error(err);
        });
    }
  }

}

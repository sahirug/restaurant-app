import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { BranchPage } from '../branch/branch';

import { BranchProvider } from '../../providers/branch/branch';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public branchProvider: BranchProvider
  ){
  }

  ionViewDidLoad() {
    this.getBranches();
    console.log('ionViewDidLoad BranchesPage');
  }

  getBranches(){
    this.branchProvider.getBranches()
      .subscribe(data => {
        this.branches = data;
        console.log(this.branches);
      }, err => {
        console.log(err);
      });
  }

  gotoBranch(branch){
    this.navCtrl.push(BranchPage, {
      branch: branch
    });
  }

}

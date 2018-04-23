import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MenuPage }  from '../menu/menu';

import { MealProvider } from '../../providers/meal/meal';

/**
 * Generated class for the BranchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-branch',
  templateUrl: 'branch.html',
})
export class BranchPage {

  public branch: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mealProvider: MealProvider) {
    this.branch = this.navParams.get('branch');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BranchPage');
  }

  gotoMenu(branchID){
    let meals: any = [];
    this.mealProvider.getMeals(branchID)
      .subscribe(data => {
        meals = data;
        this.navCtrl.setRoot(MenuPage, {
          meals: meals
        });
      }, err => {
        console.log(err);
      });;
    // this.navCtrl.setRoot(MenuPage);
  }

}

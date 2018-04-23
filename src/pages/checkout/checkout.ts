import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DeliveriesPage } from '../deliveries/deliveries';

/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  public selectedMeals: any = [];
  public grandTotal: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedMeals = this.navParams.get('selectedMeals');
  }

  ionViewDidLoad() {
    this.getGrandTotal();
    console.log('ionViewDidLoad CheckoutPage');
  }

  confirm(){
    this.navCtrl.setRoot(DeliveriesPage);
  }

  getGrandTotal(){
    for(let meal of this.selectedMeals){
      this.grandTotal = this.grandTotal + (meal.qty * meal.unit_price);
    }
  }

}

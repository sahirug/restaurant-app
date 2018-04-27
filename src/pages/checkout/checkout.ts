import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { DeliveriesPage } from '../deliveries/deliveries';

import { OrderProvider } from '../../providers/order/order';
import { UsernameProvider } from '../../providers/username/username';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    public usernameProvider: UsernameProvider,
    public loadingCtrl: LoadingController) {
    this.selectedMeals = this.navParams.get('selectedMeals');
  }

  ionViewDidLoad() {
    this.getGrandTotal();
    console.log('ionViewDidLoad CheckoutPage');
  }

  confirm(){
    let saveLoader = this.loadingCtrl.create({
      content: 'Saving order'
    });
    saveLoader.present();
    this.orderProvider.placeOrder(this.selectedMeals, this.grandTotal);
    saveLoader.dismiss();
    this.navCtrl.setRoot(DeliveriesPage, {
      status: 1
    });
  }

  getGrandTotal(){
    for(let meal of this.selectedMeals){
      this.grandTotal = this.grandTotal + (meal.qty * meal.unit_price);
    }
    this.grandTotal = Math.round(this.grandTotal * 100) / 100
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderProvider } from '../../providers/order/order';

/**
 * Generated class for the DeliveriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deliveries',
  templateUrl: 'deliveries.html',
})
export class DeliveriesPage {

  public orders: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderProvider: OrderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveriesPage');
    this.getUnpaidOrders();
  }

  getUnpaidOrders(){
    this.orderProvider.getUnpaidOrders().then(data => {
      data.subscribe(data => {
        console.log(data);
        this.orders.push(data);
        if(this.orders.message !== undefined){
          console.log('dggd')
          this.orders = [];
        }
      });
    });
  }

}

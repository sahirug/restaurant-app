import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

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

  public orders: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public orderProvider: OrderProvider,
    public loadingController: LoadingController,
    public toastController: ToastController) {
      let status = this.navParams.get('status');
      console.log(status);
      if(status !== undefined){
        let confirmToast = this.toastController.create({
          message: 'Order placed succesfully!',
          duration: 3000
        });
        confirmToast.present();
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliveriesPage');
    this.getUnpaidOrders();
  }

  getUnpaidOrders(){
    let loadDeliveriesLoader = this.loadingController.create({
      content: 'Loading orders'
    });
    loadDeliveriesLoader.present();
    this.orderProvider.getUnpaidOrders().then(data => {
      data.subscribe(data => {
        this.orders = data;
        console.log(this.orders);
        // if(this.orders.message !== undefined){
        //   console.log('dggd')
        //   this.orders = [];
        // }
        loadDeliveriesLoader.dismiss();
      }, err => {
        console.error(err);
      });
    });
  }

}

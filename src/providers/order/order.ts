import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';

import { Storage } from '@ionic/storage';
import { isUndefined } from 'ionic-angular/util/util';

/*
  Generated class for the OrderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderProvider {
  constructor(public http: HttpClient, public storage: Storage, public geolocation: Geolocation) {
    console.log('Hello OrderProvider Provider');
  }

  async placeOrder(selectedMeals, grandTotal){

    let userID = await this.getUserIDFromStorage();
    let myPosition = await this.geolocation.getCurrentPosition();
    console.log(myPosition);
    let finalOrder = {
      tot_cost: grandTotal,
      app_user_id: userID,
      branch_id: selectedMeals[0].branch_id,
      lat: myPosition.coords.latitude,
      lng: myPosition.coords.longitude
    }
    let postData = JSON.stringify(finalOrder);
    console.log(postData);
    this.http.post('http://localhost/restaurant/api/order/place_order.php', postData)
      .subscribe(data => {
        let response: any = data;
        if(response.error === undefined){
          for(let meal of selectedMeals){
            this.saveMealOrder(meal, response.order_id);
          }
        }
      }, err => {
        console.log(err);
      });
  }

  storeOrderIntoStorage(val){
    this.storage.set('has_orders', val);
  }

  userHasOrders(): Promise<void>{
    return this.storage.get('has_orders');
  }

  getUserIDFromStorage(): Promise<void>{
    return this.storage.get('id');
  }

  saveMealOrder(meal, orderID){
    let mealDetail = {
      meal_id: meal.meal_id,
      order_id: orderID,
      qty: meal.qty
    };
    let postData = JSON.stringify(mealDetail);
    this.http.post('http://localhost/restaurant/api/order/order_meals.php', postData)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  async getUnpaidOrders(){
    let userID = await this.getUserIDFromStorage();
    return this.http.get('http://localhost/restaurant/api/order/get_user_orders.php?id='+userID);
  }

}

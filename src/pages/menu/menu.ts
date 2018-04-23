import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { CheckoutPage } from '../checkout/checkout';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  public meals: any = [];
  public allMeals: any = [];
  public selectedMeals: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.meals = this.navParams.get('meals');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.fillNullAttributes();
    this.moveObject();
    console.log(this.allMeals);
  }

  fillNullAttributes(){
    let types = ['Breakfast', 'Lunch', 'Dinner'];
    for(let meal of this.meals){
      if(meal.picture === ''){
        meal.picture = 'meals/no_image.png';
      }
      if(meal.type === ''){
        meal.type = types[Math.floor(Math.random() * 3)];
      }
      meal.name = this.capitalizeFirstLetter(meal.name);
      meal.type = this.capitalizeFirstLetter(meal.type);
    }
  }

  capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  moveObject(){
    for(let meal of this.meals){
      let selectedMeal = {
        branch_id: meal.branch_id,
        description: meal.description,
        meal_id: meal.meal_id,
        name: meal.name,
        picture: meal.picture,
        type: meal.type,
        unit_price: meal.unit_price,
        qty: 0,
      };
      this.allMeals.push(selectedMeal);
    }
  }

  incrementQty(meal){
    meal.qty++;
  }

  decrementQty(meal){
    if((meal.qty-1) < 0){
      let negativeAlert = this.alertCtrl.create({
        title: '0 qty',
        message: 'Cannot reduce quantity further!',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      negativeAlert.present();
    }else{
      meal.qty--;
    }
  }

  checkout(){
    this.filterEmpty();
    if(this.selectedMeals.length === 0){
      let emptyListAlert = this.alertCtrl.create({
        title: 'Empty cart!',
        message: 'List of items ordered cannot be empty!',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      emptyListAlert.present();
    }else{
      this.navCtrl.push(CheckoutPage, {
        selectedMeals: this.selectedMeals
      });
    }
  }

  filterEmpty(){
    this.selectedMeals = [];
    for(let meal of this.allMeals){
      if(meal.qty > 0){
        this.selectedMeals.push(meal);
      }
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MealProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MealProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MealProvider Provider');
  }

  public getMeals(branchID){
    return this.http.get('http://localhost/restaurant/api/meals/get_branch_meals.php?branch_id='+branchID);
  }

}

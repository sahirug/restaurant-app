import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/*
  Generated class for the UsernameProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsernameProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello UsernameProvider Provider');
  }

  getName(){
    return this.storage.get('name');
  }

  getID(){
    this.storage.get('id')
      .then(data => {
        return data;
      }, err => {
        console.log(err)
      });
  }

}

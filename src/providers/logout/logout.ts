import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/*
  Generated class for the LogoutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LogoutProvider {

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello LogoutProvider Provider');
  }

  logout(){
    this.storage.clear();
  }

}

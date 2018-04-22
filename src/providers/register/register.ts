import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RegisterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RegisterProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RegisterProvider Provider');
  }

  register(data){
    let myData = JSON.stringify(data);
    return this.http.post('http://localhost/restaurant/api/app_user/register.php', myData);
  }

}

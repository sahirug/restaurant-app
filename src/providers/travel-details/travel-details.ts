import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TravelDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var google;

@Injectable()
export class TravelDetailsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TravelDetailsProvider Provider');
  }

  getTravelDetails(branch){
    return this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        units: 'metric',
        origins: 6.870512 + ',' + 79.880469,
        destinations: branch.lat + ',' + branch.lng,
        key: 'AIzaSyB6WQ6j-UisGnHwOqo9y1-GsSB6hykXGdI'
      }
    });
  }

}

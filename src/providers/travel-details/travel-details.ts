import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TravelDetailsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

declare var google;
var service = new google.maps.DistanceMatrixService();
@Injectable()
export class TravelDetailsProvider {

  private travelDetailsObject: any = {};

  constructor(public http: HttpClient) {
    console.log('Hello TravelDetailsProvider Provider');
  }

  getTravelDetails(branch){
    service.getDistanceMatrix(
      {
        origins: [new google.maps.LatLng(6.870128,79.880340)],
        destinations: [new google.maps.LatLng(branch.lat, branch.lng)],
        travelMode: 'DRIVING'
      }, this.callback);
      // return this.travelDetailsObject;
  }

  callback(response, status) {
    let travelDetailsObject;
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      // console.log(origins);
      // console.log(destinations);

      for (var i = 0; i < origins.length; i++) {
        var results = response.rows[i].elements;
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var duration = element.duration.text;
          var from = origins[i];
          var to = destinations[j];
          travelDetailsObject = {
            distance: distance,
            duration: duration
          }
        }
      }
      console.log(travelDetailsObject);
    }
  }

}

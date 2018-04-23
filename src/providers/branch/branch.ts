import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BranchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BranchProvider {

  public branches = [
    {
      id: 1,
      name: "Copacabana Beach",
    },
    {
      id: 2,
      name: "Copacabana Beach",
    },
    {
      id: 3,
      name: "Copacabana Beach",
    },
  ];


  constructor(public http: HttpClient) {
    console.log('Hello BranchProvider Provider');
  }

  public getAllBranches(){
    return this.branches;
  }

  public getBranches(){
    this.branches = [];
    return this.http.get('http://localhost/restaurant/api/branches/get_branches.php');
  }

}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
  interface ProfileUser{
    status: boolean
  }

@Injectable()
export class ProfileProvider {

  constructor(public http: Http) {
    console.log('Hello ProfileProvider Provider');
  }
  // ProfileUser;


  profile: any;
  statusLog: boolean;
   addProfile(db) {
        this.profile = db;
        return console.log("Service Provider" + this.profile);
    }



}

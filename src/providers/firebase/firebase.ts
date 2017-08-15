import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on prconst itemObservable = db.object('/item');
itemObservable.set({ name: 'new name!'});oviders and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  key = '';

  constructor(public http: Http, public db: AngularFireDatabase) {
    console.log('Hello FirebaseProvider Provider');
  }

   getShoppingItems() {
    return this.db.list('/Items/');
  }

  addItem(name) {
        const items = this.db.list('/items');
        items.push({ name: name });
    }

    updateItem(key: string, name) {
        const items = this.db.list('/items');
        items.update(key , { name: name });
    }

  removeItem(key: string) {
        const items = this.db.list('/items');
        items.remove(key);
  }



}

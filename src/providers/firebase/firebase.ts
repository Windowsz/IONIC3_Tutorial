import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { ProfileProvider } from '../profile/profile';
/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on prconst itemObservable = db.object('/item');
itemObservable.set({ name: 'new name!'});oviders and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  key = '';
  user = '';
  CKuser: FirebaseListObservable<any>;
  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public pf: ProfileProvider
  ) {
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


    saveUser(){
      const user = this.db.list('/users');
      const profile = this.pf.profile;

      user.push({
        email : profile.email,
        photoURL : profile.photoURL,
        name : profile.displayName
      });
    }


    testAddUsers(email : string, name : string){
      const users = this.db.list('/users');
      users.push({
        email:email,
        name:name
      });
    }

  checkUser(CKemail: any){
    this.CKuser = this.db.list('/users', { preserveSnapshot: true });
    // this.user = this.CKuser;
    // user.
    // JSON.stringify(this.CKuser);
    this.CKuser
  .subscribe(snapshots => {
    snapshots.forEach(snapshot => {
      console.log("*******TEST********");
      console.log(snapshot.key);
      console.log(snapshot.val());
    });
  });
    console.log("CKemail : "+ CKemail);
    console.log("CKuser : " + this.CKuser);
    console.log(this.CKuser);
    if(this.CKuser == CKemail){
      this.pf.statusLog = true;
    }else{
      this.pf.statusLog = false;
      console.log(CKemail + " : User not found");
    }

  }

}

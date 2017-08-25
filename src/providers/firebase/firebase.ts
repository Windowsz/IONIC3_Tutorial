import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { ProfileProvider } from '../profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class FirebaseProvider {
  key = '';
  user = '';


  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public pf: ProfileProvider,
    private af: AngularFireAuth
  ) {

  }

   getShoppingItems() {
    return this.db.list('/Items/');
  }

  addItem(name, email, tel) {
        const items = this.db.list('/items');
        items.push({
          name: name,
          email: email,
          telephone: tel
         });
    }

    updateItem(key: string, name, email, tel) {
        const items = this.db.list('/items');
        items.update(key , {
          name: name,
          email: email,
          telephone: tel
         });
    }

  removeItem(key: string) {
        const items = this.db.list('/items');
        items.remove(key);
  }


    saveUser(){
      const user = this.db.list('/users/facebook');
      const profile = this.pf.profile;

      user.push({
        email : profile.email,
        photoURL : profile.photoURL,
        name : profile.displayName
      });
    }


    saveUsersFacrbook(email:any, first_name:string, last_name:string, picture:string, ){
      const users = this.db.list('/users/facebook');
      users.push({
          email: email,
          first_name: first_name,
          last_name: last_name,
          picture: picture
      }).then(res=>{
        console.log("Save Facebook : " + email + " success");
      });
    }

    saveUsersEmail(email: any, first_name:string, last_name:string ){
      const users = this.db.list('/users/email');
      users.push({
          email: email,
          first_name: first_name,
          last_name: last_name,
      }).then(res=>{
        console.log("Save Email : " + email + " success");
      });
    }


    testAddUsers(email : string, name : string){
      const users = this.db.list('/users');
      users.push({
        email:email,
        name:name
      });
    }

  loginWithEmail(credentials) {
    return Observable.create(observer => {
      this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password
      ).then((authData) => {
        console.log(authData);
        observer.next(authData);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  logout() {
    this.af.auth.signOut();
  }

  registerUser(credentials: any) {
    return Observable.create(observer => {
      this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(authData => {
        //this.af.auth.currentUser.updateProfile({displayName: credentials.displayName, photoURL: credentials.photoUrl}); //set name and photo
        observer.next(authData);
      }).catch(error => {
        console.log(error);
        observer.error(error);
      });
    });
  }

  get currentUser():string{
    return this.af.auth.currentUser?this.af.auth.currentUser.email:null;
  }


}

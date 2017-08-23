import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { ProfileProvider } from '../profile/profile';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FirebaseProvider {
  data :any;
  key = '';
  user = '';
  emailUser: string;
  emailRef;
  emailSubject: Subject<any>;
  CKuser: FirebaseListObservable<any[]>;
  profileFacebook;

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    public pf: ProfileProvider,
  ) {
    // console.log('Hello FirebaseProvider Provider');

    this.emailSubject = new Subject();
    this.data =  this.db.list('/users', {
      query: {
        orderByChild: 'email',
        equalTo: this.emailSubject
      }
    }).subscribe(db =>{

      console.log(db.length);
      if(db.length == 0){

      this.saveUsersFacrbook(
        this.profileFacebook.email,
        this.profileFacebook.first_name,
        this.profileFacebook.last_name,
        this.profileFacebook.picture
      );

    }else{
      let a =db[0].email;
      this.emailUser = a;
      if(this.emailUser != this.emailRef || this.emailUser == null || this.emailUser == undefined){
        this.pf.statusLog = false;
        // this.pf.ProfileUser.status = false;
        console.log(this.pf.statusLog + " : this.pf.statusLog");
        console.log(this.emailRef + " : User not found");
        this.saveUsersFacrbook(
          this.profileFacebook.email,
          this.profileFacebook.first_name,
          this.profileFacebook.last_name,
          this.profileFacebook.picture.data.url
        );

      }else{
        this.pf.statusLog = true;
        console.log(this.pf.statusLog + " : this.pf.statusLog");
        console.log(this.emailUser + " : Suscess");
        // return this.pf.statusLog = true;
      }

    }
    });
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
      const user = this.db.list('/users');
      const profile = this.pf.profile;

      user.push({
        email : profile.email,
        photoURL : profile.photoURL,
        name : profile.displayName
      });
    }


    saveUsersFacrbook(email:any, first_name:string, last_name:string, picture:string, ){
      const users = this.db.list('/users');
      users.push({
          email: email,
          first_name: first_name,
          last_name: last_name,
          picture: picture
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


  checkUser( ){
    this.emailSubject.next(this.emailRef);
    console.log("status : " + this.pf.statusLog);
  }
}

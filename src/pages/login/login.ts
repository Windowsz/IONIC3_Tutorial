import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { NgForm } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { ProfileProvider } from './../../providers/profile/profile';
import { FirebaseProvider } from '../../providers/firebase/firebase';

// import { h } from '../home/home';
import{ HomePage } from '../home/home';
import { RegistorPage } from '../registor/registor';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {

  // logoState: any = "in";
  displayName;
  name;
  temp:any
  status;
  logInStatus;
  email = '';
  password = '';
  pushPage: any;
  emailSubject: Subject<any>;
  res;

  constructor(
    private mN: MenuController,
    public pf: ProfileProvider,
    public alertCtrl: AlertController,
    private fb: Facebook,
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private firebase : FirebaseProvider,
    public storage: Storage
  ) {
    // this.mN.enable(true, 'myMenu');
      this.mN.enable(false, 'myMenu');


      this.emailSubject = new Subject();
      this.db.list('/users/facebook', {
        query: {
          orderByChild: 'email',
          equalTo: this.emailSubject
        }
      // });
      }).subscribe(data=>{
        let a = data[0];
        console.log('Variable a : ' + a);
        if(data.length == 0)
        {

        this.firebase.saveUsersFacrbook(
          this.res.additionalUserInfo.profile.email,
          this.res.additionalUserInfo.profile.first_name,
          this.res.additionalUserInfo.profile.last_name,
          this.res.additionalUserInfo.profile.picture
        );

      }
      else
      {
        let a =data[0].email;
        if(a != this.res.user.email || a == null || a == undefined)
          {
          this.logInStatus = false;
          console.log(this.logInStatus);
          this.pf.statusLog = false;
          this.firebase.saveUsersFacrbook(
            this.res.additionalUserInfo.profile.email,
            this.res.additionalUserInfo.profile.first_name,
            this.res.additionalUserInfo.profile.last_name,
            this.res.additionalUserInfo.profile.picture.data.url
          );
          this.status = "false";
          let alert = this.alertCtrl.create({
            title: 'ERROR!!',
            subTitle: 'กรุณาล็อคอินเข้าระบบอีกครั้ง',
            buttons: ['OK']
          });
          alert.present();

        }
        else
        {
          // Login Suscess Go to HomePages
          this.logInStatus = true;
          this.pf.statusLog = true;
          console.log(this.logInStatus);
          this.status = "true";
          this.storage.set('status_login', true);
          this.mN.enable(true, 'myMenu');
          this.navCtrl.setRoot(HomePage);
        }
      }
    });


  afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });

    this.pushPage = RegistorPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


 signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        console.log("ssssssssssssss");
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res);
          this.res = res;
          this.emailSubject.next(res.user.email);
          console.log("*********************************************************************");
      });
  }
}

  signOut() {
    this.pf.profile = '';
    this.afAuth.auth.signOut();
  }

  login(e:any,p:any){
    console.log("E : " + e);
    console.log("P : " + p);
    var credentials = ({email: e, password: p}); //Added next lines
    this.firebase.loginWithEmail(credentials).subscribe(data => {
      console.log(data);
    }, error=>{             //Added next lines for handling unknown users
      console.log(error);
      console.log('error.code : ' + error.code)
      if (error.code == 'auth/user-not-found' || error.code =='auth/invalid-email')
      {
        let alert = this.alertCtrl.create({
          title: 'ERROR!!',
          subTitle: 'Username หรือ Password ผิดพลาด',
          buttons: ['OK']
        });
        alert.present();
        // alert('User not found');
        console.log('User not found OR invalid-email');
      }
      if(error.code == 'auth/wrong-password'){
        console.log('Check password');
      }
    }
  );
  }


}

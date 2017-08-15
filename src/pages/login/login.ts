import { Component } from '@angular/core';
// import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
// import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook'
import { ProfileProvider } from './../../providers/profile/profile';
import{ HomePage } from '../home/home';
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

  constructor(
    private mN: MenuController,
    public pf: ProfileProvider,
    private fb: Facebook,
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth) {

      this.mN.enable(false, 'myMenu');

  afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


 signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => {
          console.log(res)
          this.pf.addProfile(res);
          console.log("-----------------------");
          console.log(this.pf.profile);
          this.navCtrl.setRoot(HomePage);
          this.mN.enable(true, 'myMenu');
        });
    }
  }

  signOut() {
    this.pf.profile = '';
    this.afAuth.auth.signOut();
  }


}

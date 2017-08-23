import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { AlertController } from 'ionic-angular';


import { ProfileProvider } from './../../providers/profile/profile';
import { FirebaseProvider } from '../../providers/firebase/firebase';

// import { h } from '../home/home';
import{ HomePage } from '../home/home';
import { RegistorPage } from '../registor/registor';
import { Storage } from '@ionic/storage';

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
  constructor(
    private mN: MenuController,
    public pf: ProfileProvider,
    public alertCtrl: AlertController,
    private fb: Facebook,
    private platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private firebase : FirebaseProvider,
    public storage: Storage
  ) {

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
          console.log(res);
          this.pf.addProfile(res);
          // console.log("-----------------------");
          console.log(this.pf.profile);
          // console.log(this.pf.profile.user.email);
          this.firebase.emailRef = this.pf.profile.user.email;
          this.firebase.profileFacebook = res.additionalUserInfo.profile;
          // this.navCtrl.setRoot(RegistorPage);
          // this.mN.enable(true, 'myMenu');
          // console.log('testtttt' + this.pf.ProfileUser.status);
          this.firebase.checkUser();
          if(this.pf.statusLog){
            // console.log('testtttt' + this.pf.ProfileUser.status);
            this.status = "true";
            this.storage.set('status_login', true);
            this.mN.enable(true, 'myMenu');
            this.navCtrl.setRoot(HomePage);

          }else{
          this.status = "false";
          let alert = this.alertCtrl.create({
            title: 'ERROR!!',
            subTitle: 'กรุณาล็อคอินเข้าระบบอีกครั้ง',
            buttons: ['OK']
          });
          alert.present();
          }
        });
    }
  }

  signOut() {
    this.pf.profile = '';
    this.afAuth.auth.signOut();
  }


}

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { FirebaseTestingPage } from '../pages/firebase-testing/firebase-testing';
// import firebase from 'firebase';
import { ProfileProvider } from '../providers/profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // Set Root Pages
  // rootPage: any = HomePage;
  // rootPage: any = LoginPage;
  rootPage: any ;
  status_CK: boolean;
  pages: Array<{title: string, component: any}>;

  constructor(
    private mN: MenuController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public pf: ProfileProvider,
    // private fb: Facebook,
    private afAuth: AngularFireAuth,
    public storage: Storage

  ) {

    storage.get('status_login').then((val) => {
      console.log('status_login : ', val);
      // this.rootPage =
      this.status_CK = val;
      if(this.status_CK){
        this.rootPage = HomePage;
      }else{
        this.rootPage = LoginPage;
      }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Firebase', component: FirebaseTestingPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
  //  const pages:any = 'LoginPage';
    this.storage.set('status_login', false);
    console.log("LogOut Facebook");
    this.pf.profile = '';
    this.afAuth.auth.signOut();
    this.mN.enable(false, 'myMenu');
    this.nav.setRoot(LoginPage);
  }

}

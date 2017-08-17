import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { FirebaseTestingPage } from '../pages/firebase-testing/firebase-testing';
// import firebase from 'firebase';
import { ProfileProvider } from '../providers/profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // Set Root Pages
  // rootPage: any = HomePage;
  rootPage: any = LoginPage;
  // rootPage: any = null;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public pf: ProfileProvider,
    // private fb: Facebook,
    private afAuth: AngularFireAuth

  ) {
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


    //   switch (condition) {
    //       case xxx:
    //         this.rootPage = LoginPage;
    //         break;
    //       case yyy:
    //         this.rootPage = HomePage;
    //         break;
    //       // ....
    // };

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
    this.pf.profile = '';
    this.afAuth.auth.signOut();
  }

}

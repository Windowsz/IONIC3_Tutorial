import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { FirebaseTestingPage } from '../pages/firebase-testing/firebase-testing';
import { RegistorPage } from '../pages/registor/registor';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { FirebaseProvider } from '../providers/firebase/firebase';


import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Facebook } from '@ionic-native/facebook';
import { ProfileProvider } from '../providers/profile/profile';


   const config = {
    apiKey: "AIzaSyDl21YyF9QNKhYF1z_XOCeNwCDWAxsMtsI",
    authDomain: "project-ionic3.firebaseapp.com",
    databaseURL: "https://project-ionic3.firebaseio.com",
    projectId: "project-ionic3",
    storageBucket: "project-ionic3.appspot.com",
    messagingSenderId: "740693843111"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FirebaseTestingPage,
    LoginPage,
    RegistorPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FirebaseTestingPage,
    LoginPage,
    RegistorPage
  ],
  providers: [
    StatusBar,
    FirebaseProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    Facebook,
    ProfileProvider
  ]
})
export class AppModule {}

// import { FirebaseProvider } from './../../providers/firebase/firebase';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirebaseTestingPage } from './firebase-testing';
// import { FirebaseListObservable } from 'angularfire2/database';

// import firebase from 'firebase';
@NgModule({
  declarations: [
    FirebaseTestingPage,
  ],
  imports: [
    IonicPageModule.forChild(FirebaseTestingPage),
  ],
})
export class FirebaseTestingPageModule {
}

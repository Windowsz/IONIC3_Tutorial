import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';


// import { FirebaseProvider } from '../../providers/firebase/firebase';


/**
 * Generated class for the RegistorPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registor',
  templateUrl: 'registor.html',
})
export class RegistorPage {

  // firstName = '';
  // lastName = '';





  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistorPage');
  }

  registor(e,p,f,l){
    var credentials = ({email: e, password: p});
    this.firebase.registerUser(credentials).subscribe(data=>{
      console.log(data);
      this.firebase.saveUsersEmail(e,f,l);
    }, error=>{
      console.log(error);
    });
  }

}

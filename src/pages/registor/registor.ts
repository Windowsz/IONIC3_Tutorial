import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { NgModel } from '@angular/forms';

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

  firstName = '';
  lastName = '';
  email = '';
  password = '';




  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistorPage');
  }

  registor(){
    var credentials = ({email: this.email, password: this.password});
    this.firebase.registerUser(credentials).subscribe(data=>{
      console.log(data);
      this.firebase.saveUsersEmail( this.email, this.firstName, this.lastName);
    }, error=>{
      console.log(error);
    });
  }

}

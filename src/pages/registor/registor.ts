import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { NgModel } from '@angular/forms';
import { FormGroup, FormControl, Validators, PatternValidator  } from '@angular/forms';


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
  passwordConfirm = '';
  usersCK = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistorPage');
  }

  registor(){
    console.log("email : " + this.email);
    console.log("pass : " + this.password);


    if(this.passwordConfirm == this.password){
    var credentials = ({email: this.email, password: this.password});
    this.firebase.registerUser(credentials).subscribe(data=>{
      console.log(data);
      this.firebase.saveUsersEmail( this.email, this.firstName, this.lastName);
    }, error=>{
      console.log(error);
      if(error.code == "auth/invalid-email"){
        let alert = this.alertCtrl.create({
          title: 'ERROR!!',
          subTitle: 'กรุณาใส่ข้อมูลให้ครบถ้วน',
          buttons: ['OK']
        });
        alert.present();
      }
      if(error.code == "auth/email-already-in-use"){
        let alert = this.alertCtrl.create({
          title: 'ERROR!!',
          subTitle: 'Username นี้มีผู้ใช้งานแล้ว',
          buttons: ['OK']
        });
        alert.present();

      }

    });
  }else{
    let alert = this.alertCtrl.create({
      title: 'ERROR!!',
      subTitle: 'กรุณาใส่ Password ให้ตรงกัน',
      buttons: ['OK']
    });
    alert.present();
  }
  }

}

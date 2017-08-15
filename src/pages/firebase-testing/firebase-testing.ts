import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the FirebaseTestingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-firebase-testing',
  templateUrl: 'firebase-testing.html',
})
export class FirebaseTestingPage {

    // Items: FirebaseListObservable<any[]>;
    Items: FirebaseListObservable<any>;
    // Items: FirebaseObjectObservable<any>;
    nameIn = '';
    name = '';
    email = '';
    tel = '';
    key = '';

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public firebaseProvider: FirebaseProvider
  , db: AngularFireDatabase) {

    this.Items = db.list('/items');
    // Items.push({ name: newName });
    // this.Items = db.object('/item');
    console.log(this.Items);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirebaseTestingPage');
  }

  addItem() {
    this.firebaseProvider.addItem(this.nameIn);
  }

  selectItem(key: string, name: string){
    this.key = key;
    this.nameIn = name;
  }

  updateItem(name: String){
    if(this.key == ''){
    console.log("Error You Click Item Edit");

    let alert = this.alertCtrl.create({
      title: 'ERROR!!',
      subTitle: 'กดเลือก EDIT ก่อน',
      buttons: ['OK']
    });
    alert.present();

        } else{
    console.log("Key : "+ this.key);
    console.log("Name : "+ this.nameIn);
    this.firebaseProvider.updateItem(this.key, this.nameIn);
    this.key = '';
    this.nameIn = '';
        }

  }

  removeItem(key) {
    this.firebaseProvider.removeItem(key);
  }

}

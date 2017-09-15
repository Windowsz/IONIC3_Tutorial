import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';
// import { ImagesProvider } from '../../providers/images/images';

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

    Items: FirebaseListObservable<any>;
    nameIn = '';
    email = '';
    tel = '';
    key = '';
    public img : String;


  constructor(
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public db: AngularFireDatabase,
    private mN: MenuController,
    // private imgs : ImagesProvider
  ) {

    this.Items = db.list('/items');
    // Items.push({ name: newName });
    // this.Items = db.object('/item');
    console.log(this.Items);
    mN.enable(true, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FirebaseTestingPage');
  }

  addItem() {
    this.firebaseProvider.addItem(
      this.nameIn,
      this.email,
      this.tel
    );
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
    console.log("Email : "+ this.email);
    console.log("Telephone : "+ this.tel);
    this.firebaseProvider.updateItem(
      this.key,
      this.nameIn,
      this.email,
      this.tel
    );
    this.key = '';
    this.nameIn = '';
    this.email = '';
    this.tel = '';
        }

  }

  removeItem(key) {
    this.firebaseProvider.removeItem(key);
  }


  addUsers(name : string, email : string){
    this.firebaseProvider.testAddUsers(email, name);
  }


  select(){
    // this.cm.selectImage().then(data=>{
    //   this.img = data;
    // });
    // this.imgs.selectImage();
    // this.img = this.imgs.cameraImage;
    // return this.imgs.cameraImage;
  }


}

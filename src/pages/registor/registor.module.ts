import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistorPage } from './registor';

@NgModule({
  declarations: [
    RegistorPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistorPage),
  ],
})
export class RegistorPageModule {}

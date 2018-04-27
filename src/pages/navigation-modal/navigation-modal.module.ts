import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NavigationModalPage } from './navigation-modal';

@NgModule({
  declarations: [
    NavigationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NavigationModalPage),
  ],
})
export class NavigationModalPageModule {}

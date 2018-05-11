import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnotherLoginPage } from './another-login';

@NgModule({
  declarations: [
    AnotherLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AnotherLoginPage),
  ],
})
export class AnotherLoginPageModule {}

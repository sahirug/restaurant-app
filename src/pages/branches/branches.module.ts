import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BranchesPage } from './branches';

@NgModule({
  declarations: [
    BranchesPage,
  ],
  imports: [
    IonicPageModule.forChild(BranchesPage),
  ],
})
export class BranchesPageModule {}

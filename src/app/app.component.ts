import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { BranchesPage } from '../pages/branches/branches';
import { DeliveriesPage } from '../pages/deliveries/deliveries';

import { LogoutProvider } from '../providers/logout/logout';
import { UsernameProvider } from '../providers/username/username';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: any}>;

  public name: any = '';

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public logoutProvider: LogoutProvider,
    public usernameProvider: UsernameProvider,
    public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'map' },
      { title: 'Branches', component: BranchesPage, icon: 'list' },
      { title: 'Deliveries', component: DeliveriesPage, icon: 'bicycle' }
    ];
    this.events.subscribe('user:logged_in', (greeting) => {
      this.name=greeting;
    });
  }

  async getName(){
    this.name = await this.usernameProvider.getID();
    this.name = this.name == undefined ? 'User' : this.name;
    console.log(this.name);
  }

  logout(){
    this.logoutProvider.logout();
    this.nav.setRoot(LoginPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { BranchesPage } from '../pages/branches/branches';
import { BranchPage } from '../pages/branch/branch';
import { MenuPage } from '../pages/menu/menu';
import { CheckoutPage } from '../pages/checkout/checkout';
import { DeliveriesPage } from '../pages/deliveries/deliveries';

import { Geolocation } from '@ionic-native/geolocation';

import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BranchProvider } from '../providers/branch/branch';
import { RegisterProvider } from '../providers/register/register';
import { LoginProvider } from '../providers/login/login';
import { LogoutProvider } from '../providers/logout/logout';
import { UsernameProvider } from '../providers/username/username';
import { MealProvider } from '../providers/meal/meal';
import { OrderProvider } from '../providers/order/order';
import { TravelDetailsProvider } from '../providers/travel-details/travel-details';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    BranchesPage,
    BranchPage,
    MenuPage,
    CheckoutPage,
    DeliveriesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    BranchesPage,
    BranchPage,
    MenuPage,
    CheckoutPage,
    DeliveriesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BranchProvider,
    RegisterProvider,
    LoginProvider,
    LogoutProvider,
    UsernameProvider,
    MealProvider,
    OrderProvider,
    TravelDetailsProvider
  ]
})
export class AppModule {}

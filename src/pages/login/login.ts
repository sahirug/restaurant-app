import {Component} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController, LoadingController} from "ionic-angular";
import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";

import { LoginProvider } from '../../providers/login/login';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginForm: FormGroup;

  constructor(
    public nav: NavController,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public loginProvider: LoginProvider) {

    this.menu.swipeEnable(false);
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
  login() {
    let checkLoginLoader = this.loadingCtrl.create({
      content: 'Authenticating'
    });
    if(this.loginForm.valid){
      checkLoginLoader.present();
      this.loginProvider.login(this.loginForm.value)
        .subscribe(data => {
          let reply: any = data;
          if(reply.error === undefined){
            this.loginProvider.saveToStorage(reply.id, this.loginForm.value.email);
            this.nav.setRoot(HomePage);
          }else{
            let errorAlert = this.alertCtrl.create({
              title: 'Incorrect credentials',
              message: 'Username or password does not exist!',
              buttons: [
                {
                  text: 'OK'
                }
              ]
            });
            errorAlert.present();
          }
          checkLoginLoader.dismiss();
        }, error => {
          console.log(error);
        });
    }else{
      let informAlert = this.alertCtrl.create({
        title: 'Incomplete Fields',
        message: 'Please complete all fields',
        buttons: [
          {
            text: 'OK'
          }
        ]
      });
      informAlert.present();
    }
  }

  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}

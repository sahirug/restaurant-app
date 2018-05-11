import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';

import { LoginProvider } from '../../providers/login/login';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the AnotherLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-another-login',
  templateUrl: 'another-login.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(-2000px,0,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ]
})
export class AnotherLoginPage {

  loginForm: FormGroup;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public events: Events) {

      this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnotherLoginPage');
  }

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
            this.events.publish('user:logged_in', reply.name);
            this.loginProvider.saveToStorage(reply.id, this.loginForm.value.email, reply.name);
            this.nav.setRoot(HomePage, {
              name: reply.name
            });
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
          checkLoginLoader.dismiss();
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

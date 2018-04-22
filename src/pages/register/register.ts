import {Component} from "@angular/core";
import {NavController, AlertController, ToastController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {HomePage} from "../home/home";

import { RegisterProvider } from '../../providers/register/register';

import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registerForm: FormGroup;

  constructor(
    public nav: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private registerProvider: RegisterProvider) {

      this.registerForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
  }

  // register and go to home page
  register() {
    if(this.registerForm.valid){
      this.registerProvider.register(this.registerForm.value)
      .subscribe(data => {
          let reply : any;
          reply = data;
          if(reply.error === undefined){
            let addTodoToast = this.toastCtrl.create({
              message: "User has been added!",
              duration: 2000
            });
            addTodoToast.present();
            this.nav.setRoot(LoginPage);
          }else{
            let message: any = {
              title: '',
              message: '',
              buttons: [ { text: 'OK' } ]
            };
            switch(reply.error){
              case 1062:
                message.title = 'Existing Email'
                message.message = 'An account with that email exists!'
                break;
              default:
                message.title = 'Error'
                message.message = 'Something went wrong :('
                break;
            }
            let errorAlert = this.alertCtrl.create(message);
            errorAlert.present();
          }
        }, error => {
          console.log(error);
        }
      );
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
    // this.nav.setRoot(HomePage);
  }

  // go to login page
  login() {
    this.nav.setRoot(LoginPage);
  }
}

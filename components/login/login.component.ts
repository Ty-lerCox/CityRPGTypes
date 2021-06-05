import { Component, OnInit } from '@angular/core';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  successCallback(signInSuccessData: FirebaseUISignInSuccessWithAuthResult) {
    if (signInSuccessData.authResult.user) {
      this.loginService.setUID(signInSuccessData.authResult.user?.uid);
    }
  }

  errorCallback(errorData: FirebaseUISignInFailure) {}

  uiShownCallback() {}
}

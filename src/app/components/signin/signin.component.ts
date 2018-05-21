// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.css']
// })
// export class SigninComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }


import {Component, OnInit} from '@angular/core';
import { CustomAuthService } from '../../services/auth.service' 
import {
    AuthService,
    GoogleLoginProvider
} from 'angular5-social-login';
 
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
 
 
export class SigninComponent implements OnInit {
 
  constructor( private socialAuthService: AuthService, private customAuthService: CustomAuthService ) {}
  
  ngOnInit() {
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.customAuthService.getUsers();
        console.log("registered users: " , this.customAuthService.getUsers());
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
            
      }
    );
  }
  
}
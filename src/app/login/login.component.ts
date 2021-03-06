import { Component, OnInit, Inject } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  dataSource: any;
  data: any;
  per: any;
  public Name : string;
  aas: any;
 

  constructor(
    private http: HttpClient ,
    private router: Router,
    private as : AuthenticationService,
    private authenticationService: AuthenticationService,
    private displayName:AuthenticationService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),

   });
   
    }

  ngOnInit() {
     }
  public get l(){
    return this.loginForm.controls;
  }

  public onSubmit() {
  this.as.login(this.l.email.value, this.l.password.value);
  this.loginForm.setValue({email: '', password: ''})
    }

    goToUrl(): void {
      this.document.location.href = environment.URL + "/resetpass";
  }
    // get getName(){
    //   if(this.data)
    //   return this.data;
    //   else return
    // }

}

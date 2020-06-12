import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Router } from '@angular/router';
import { SecureLocalStorageService } from './secure-local-storage.service';
import { environment } from '../../environments/environment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class AuthenticationService{
    Name: any;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  localStorage: any;
  Naame: any;
  action :string='close'; 
  
  constructor(private http:HttpClient, private router : Router,private securestore: SecureLocalStorageService,
    private modal: MatDialog,private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document
    ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.securestore.getitem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }


  login(email, password){
    this.http.post(environment.URL + `/login`,
     {"email":email,"password":password}) 
   .subscribe(
      (data:any) => {
       
        console.log("asd",data); 
        console.log("data",data); 
        this.Naame=data
        this.Name = data.tempass;
        console.log("datas",this.Naame); 
        if(data.temppass === 1) {
          this.document.location.href = environment.URL + "/resetpass";
         }
        else if(data.temppass === 0) {
        if (data.permissions.includes('DR') || data.permissions.includes('DF') ||
         data.permissions.includes('ARRP')) { 
          console.log("DRDF"+ this.Name);
          this.router.navigate(['/menu']);
        
          this.securestore.setitem('currentUser',JSON.stringify(data.Token));
          localStorage.setItem("name", data.Name);
          localStorage.setItem("permission", data.permissions);
          localStorage.setItem("Branch", data.Branch);
        
      }
    }
        
        // console.log(JSON.parse(this.securestore.getitem('currentUser');
     
      // if(data.status != 200){
      //   console.log("diret en",data); 
      // }
      }, 
      error =>{
        
        console.log("Back",error);
        this.snackBar.open(error,this.action,{
          duration: 2500,
        });
        
      }
      
    );
    
    
  }
  public get currentUserValue(): User {
    // console.log(this.securestore.getitem('currentUser'));
    // console.log(this.currentUserSubject.value)
    return this.securestore.getitem('currentUser');
}


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('permission');
    localStorage.removeItem('NonAEcall');
    localStorage.removeItem('NonAEred');
    localStorage.removeItem('AE');
    localStorage.removeItem('name');
    localStorage.removeItem('Branch');
    this.router.navigate(['login']);
}
  public get getCurrentUser(){
      return this.Name;
  }
}



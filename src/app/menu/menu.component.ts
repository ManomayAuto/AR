import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers :[AuthenticationService]
})
export class MenuComponent implements OnInit {
  per: string;
  message :string='Please Wait!  (coming soon)'; 
  action :string='close'; 
  constructor( private router : Router,private snackBar: MatSnackBar) {
    this.per = localStorage.getItem("permission");
    console.log("inside",this.per);
  }
  
  ngOnInit() {
    // console.log("ng",this.per);
  }
  Quote(){
    this.snackBar.open(this.message,this.action,{
      duration: 2500,
    });
  }
  clickMe() {
    // console.log("sssng");
    console.log("nsssg",this.per);
    if (this.per.includes('DR') && this.per.includes('DF')) { 
     this.router.navigate(['/ae']);
   }
   else if (this.per.includes('DF')){
    this.router.navigate(['/call']);
}

else if (this.per.includes('DR')){
    this.router.navigate(['/reduced']);
}
else{
  this.snackBar.open("You don't have valid permissions",this.action, {
    duration: 1000,
  });
}
}
}
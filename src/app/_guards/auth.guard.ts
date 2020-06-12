import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterLink } from '@angular/router';

import { AuthenticationService } from '../_services';
import { MenuComponent } from "../menu/menu.component";
import { Role } from '../models/role.model';
import { MatSnackBar } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    message :string='You dont have vaild permissions!!'; 
    action :string='close'; 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private snackBar: MatSnackBar
    ) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;

        var x = localStorage.getItem("permission");
 
        if (currentUser) {
            console.log(route.data.roles && route.data.roles.indexOf(x) );
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(x) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/menu']);
                this.snackBar.open(this.message,this.action,{
                    duration: 1800,
                  });
               return false;
           }

            // authorised so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
       this.router.navigate(['/login']);
        return false;
    }
}
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AEComponent } from './ae/ae.component';
import { ReducedComponent } from './reduced/reduced.component';
import { CallComponent } from './call/call.component';
import { LoginComponent } from './login/login.component';
import { Layout1Component } from './layout1/layout1.component';
import { AuthGuard } from './_guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { Role } from './models/role.model';
import { ReportsComponent } from './reports/reports.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'ae', component: AEComponent, canActivate: [AuthGuard], data:{roles : [Role.AE, Role.three]} },
  { path:'reduced', component: ReducedComponent, canActivate: [AuthGuard], data:{roles : [Role.Nonred, Role.redrep]} },
  { path:'call', component: CallComponent, canActivate: [AuthGuard], data:{roles : [Role.Noncall, Role.callrep]} },
  { path:'reports', component: ReportsComponent, canActivate: [AuthGuard], data:{roles : [Role.reports, Role.three, Role.callrep, Role.redrep]} },
  { path:'menu', component: MenuComponent},
  { path: 'layout1', component: Layout1Component },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

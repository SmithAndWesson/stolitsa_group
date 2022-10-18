import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from "./layouts/default/default.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {ContractsComponent} from "./modules/contracts/contracts.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {ProfileComponent} from "./modules/user/profile/profile.component";

const routes: Routes = [
  {path: `login`, component: LoginComponent},
  {path: `register`, component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'main', component: DefaultComponent, canActivate: [AuthGuardService], children:[
    {path:'', component: DashboardComponent, canActivate: [AuthGuardService]},
      {path: 'contracts/:id', pathMatch: `full`, component: ContractsComponent, canActivate: [AuthGuardService]},
    ]
  },
  {path: ``, redirectTo: `main`, pathMatch: `full`}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

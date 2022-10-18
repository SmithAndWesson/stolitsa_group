import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "../../modules/dashboard/dashboard.component";
import {DefaultComponent} from "./default.component";
import {RouterModule} from "@angular/router";
import {ContractsComponent} from "../../modules/contracts/contracts.component";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../material-module";
import {AppComponent} from "../../app.component";
import {LoginComponent} from "../../auth/login/login.component";
import {RegisterComponent} from "../../auth/register/register.component";



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ContractsComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule

  ]
})
export class DefaultModule { }

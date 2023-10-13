import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AuthorozitionGuard } from './guards/authorozition.guard';
import { NotAuthorazedComponent } from './not-authorazed/not-authorazed.component';

const routes: Routes = [
  { path :"auth", component : AuthComponent ,canActivate:[AuthenticationGuard] ,children:[
    { path :"accounts", component : AccountsComponent,canActivate:[AuthenticationGuard]},
    { path :"new-customer", component : NewCustomerComponent,canActivate:[AuthorozitionGuard]},
    { path :"customer-accounts/:id", component : CustomerAccountsComponent,canActivate:[AuthenticationGuard,AuthorozitionGuard]},
    { path :"customers", component : CustomersComponent,canActivate:[AuthenticationGuard]}
  ]},
  { path :"login", component : LoginComponent},
  { path :"", redirectTo:"/login",pathMatch:"full"},
  { path :"403", component : NotAuthorazedComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

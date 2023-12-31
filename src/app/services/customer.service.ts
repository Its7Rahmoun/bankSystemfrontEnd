import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account, CurrentAccount, Customer, SavingAccount} from "../model/customer.model";
import {environment} from "../../environments/environment";
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers")
  }
  public getCustomer(id : number):Observable<Customer>{
    return this.http.get<Customer>(environment.backendHost+"/customers/"+id)
  }
  public searchCustomers(keyword : string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"/customers/search?keyword="+keyword)
  }
  public saveCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.backendHost+"/customers",customer);
  }
  public deleteCustomer(id: number){
    return this.http.delete(environment.backendHost+"/customers/"+id);
  }
  public getCustomerAccount(id: number):Observable<Account[]>{
    return this.http.get<Account[]>(environment.backendHost+"/accounts/"+id+"/customer")
  }
  public createSavingAccount(account: SavingAccount):Observable<SavingAccount>{
    return this.http.post<SavingAccount>(environment.backendHost+"/accounts/savingAccount",account);
  }
  public createCurrentAccount(account: CurrentAccount):Observable<CurrentAccount>{
    return this.http.post<CurrentAccount>(environment.backendHost+"/accounts/currentAccount",account);
  }
}

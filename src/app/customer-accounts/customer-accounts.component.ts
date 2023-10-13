import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Account, CurrentAccount, Customer, SavingAccount} from "../model/customer.model";
import { CustomerService } from '../services/customer.service';
import { Observable, catchError, throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId! : number;
  customer! : Customer;
  accounts!: Observable<Account[]>;
  errorMessage!: string;
  createAccountdisplay: boolean=false;
  createAccountFromGroup!:FormGroup;
  isAdmin : boolean = false;
  constructor(private route : ActivatedRoute,
    private router :Router,
    private customerservice : CustomerService,
    private fb : FormBuilder,
    public authservice : AuthserviceService) {
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
    if(this.customer==null){
      this.customerservice.getCustomer(this.customerId).subscribe({
        next:(resp: Customer)=>{
          this.customer=resp;
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
    this.accounts=this.customerservice.getCustomerAccount(this.customerId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
    this.createAccountFromGroup= this.fb.group({
      accountType : this.fb.control(""),
      balance : this.fb.control(""),
      overDraft : this.fb.control(null),
      interestRate : this.fb.control(null)
    });

    let authorities = this.authservice.roles;
    for(let authority of authorities ){
      if(authority.includes('ADMIN')){
        this.isAdmin = true;
        return
      }
    }
  }

  handleCreateAccount(){
    if(this.createAccountFromGroup.value.accountType=="CurrentAccount"){
      let newAccount : CurrentAccount={
        type:this.createAccountFromGroup.value.accountType,
        balance:this.createAccountFromGroup.value.balance,
        createdAt:null,
        status:"CREATED",
        id:"",
        customerDTO:this.customer,
        overDraft:this.createAccountFromGroup.value.overDraft
      };
      this.customerservice.createCurrentAccount(newAccount).subscribe({
        next:(data)=>{
          alert("Current Account has been Created");
          this.createAccountFromGroup.reset();
          this.accounts=this.customerservice.getCustomerAccount(this.customerId).pipe(
            catchError(err => {
              this.errorMessage=err.message;
              return throwError(err);
            })
          );
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
    else if(this.createAccountFromGroup.value.accountType=="SavingAccount"){
      let newAccount : SavingAccount={
        type:this.createAccountFromGroup.value.accountType,
        balance:this.createAccountFromGroup.value.balance,
        createdAt:null,
        status:"CREATED",
        id:"",
        customerDTO:this.customer,
        interestRate:this.createAccountFromGroup.value.interestRate
      };
      this.customerservice.createSavingAccount(newAccount).subscribe({
        next:(data)=>{
          alert("Saving Account has been Created");
          this.createAccountFromGroup.reset();
          this.accounts=this.customerservice.getCustomerAccount(this.customerId).pipe(
            catchError(err => {
              this.errorMessage=err.message;
              return throwError(err);
            })
          );
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }


  }
  handledisplayingCreateAcountPart(){
    this.createAccountdisplay=true;
  }

}

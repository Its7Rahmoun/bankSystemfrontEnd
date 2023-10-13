export interface Customer {
  id : number;
  name : string;
  email : string;
}
export interface User {
  username : string;
  password : string;
}

export interface Account {
  type: string
  id: string
  balance: number
  createdAt: any
  status: any
  customerDTO: Customer
}
export interface CurrentAccount extends Account {
  overDraft: number
}
export interface SavingAccount extends Account  {

  interestRate: number
}


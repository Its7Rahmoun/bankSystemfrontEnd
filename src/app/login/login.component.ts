import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin! : FormGroup;


  constructor(private fb : FormBuilder,
    private authservice : AuthserviceService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    });
  }

  handleAuth(){
    this.authservice.logIn(this.formLogin.value.username,this.formLogin.value.password).subscribe({
      next:(data:any)=>{
        this.authservice.loadProfil(data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from './services/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService : AuthserviceService,private router : Router){}
  ngOnInit(): void {
      console.log("appcomponet");
      let access : any = window.localStorage.getItem("accessToken"); 
      let refresh : any = window.localStorage.getItem("refreshToken"); 
        let data : any = {"accessToken":access, "refreshToken":refresh};
        this.authService.loadProfil(data);
  }
  title = 'digital-banking-web';

}


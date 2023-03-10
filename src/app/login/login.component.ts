import { AuthService } from './../auth/auth.service';
import { MessageService } from './../message/message.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login : string="";
  password : string=""; 
  errorMessage : string="";
  constructor(private authService :AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  printData(){
    console.log(this.login+"-"+this.password);
  }

  authenticate(){
    this.errorMessage="";
    if(this.login=="" ||this.password==""){
      this.errorMessage="merci de saisir tous les informations !";
      return;
    }
    this.authService.sendAuthentication(this.login,this.password).subscribe(result=>{
      this.authService.finalizeAuthentication(result);
      this.errorMessage= this.authService.isConnected==false ? result.data.reason : "";
      if(this.errorMessage=="")
        this.router.navigateByUrl("courses");
    })
    
  }

}
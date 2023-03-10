import { Observable } from 'rxjs';
import { PhpData } from './../Models/phpData';
import { MessageService } from './../message/message.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connected:boolean=false;

  constructor(private service : MessageService) { }

  sendAuthentication(login : string,password : string):Observable<PhpData>{
    return this.service.sendMessage("checkLogin",{username : login,password : password});
  }

  finalizeAuthentication(result : PhpData){
    if(result.status=="ok"){
      this.connected=true;
    }
  }

  get isConnected(){
    return this.connected;
  }
}

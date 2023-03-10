import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhpData } from '../Models/phpData';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  prefix:string="http://localhost:3000/tp1/";
  extension:string=".php"; //default value we can change it for other backends

  //dependency injection
  constructor(private http : HttpClient) { }


  sendMessage(url:string,data : any):Observable<PhpData> {
    let headers = {withCredentials: true};
    if(data==null || data==undefined)
      return this.http.post<any>(this.prefix+url+this.extension,null,headers);

    let form_data = new FormData();
    for (let key in data) {
      form_data.append(key, data[key]);
    }
    return this.http.post<any>(this.prefix+url+this.extension,form_data,headers);
   
  }

}

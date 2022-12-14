import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  signup(data:any) {
    return this.httpClient.post(this.url+"/user/signup",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  forgotPassword(data:any) {
    return this.httpClient.post(this.url+"/user/forgotpassword",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  login(data:any) {
    return this.httpClient.post(this.url+"/user/login",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  checkToken(){
    return this.httpClient.get(this.url + "/user/checktoken");
  }

  changePassword(data:any) {
    return this.httpClient.post(this.url+"/user/changePassword",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  update(data:any) {
    return this.httpClient.patch(this.url+"/updateuserstatus/:id",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  uploadFiles(data:any) {
    return this.httpClient.post(this.url+"/student/upload",data)
  }

  getUploadedFiles(data:any) {
    return this.httpClient.post(this.url+'/student/getuploadedfiles',data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    });
  }
}

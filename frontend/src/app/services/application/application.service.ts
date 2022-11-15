import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  createApplication(data:any){
    console.log(data);
    return this.httpClient.post(this.url+"/student/createApplication",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getApplication(data:any){
    return this.httpClient.get(this.url+"/consultant/getApplications");
  }

  getAllStudentApplication(data:any){
    return this.httpClient.get(this.url+"/consultant/getApplications",data);
  }

  getSpecificStudentApplication(data:any){
    return this.httpClient.post(this.url+"/student/getStudentApplication", data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }
  
}

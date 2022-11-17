import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  url = environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  addConsultant(data:any){
    return this.httpClient.post(this.url+"/consultant/addconsultant",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getAllConsultants(){
    return this.httpClient.get(this.url+"/consultant/getAllConsultants");
  }

  getAllInactiveStudents(){
    return this.httpClient.get(this.url+"/consultant/getAllInactiveStudents");
  }

  getAllActiveStudents(){
    return this.httpClient.get(this.url+"/consultant/getAllActiveStudents");
  }

  updateConsultantStatus(data:any){
    return this.httpClient.patch(this.url+"/consultant/updateuserstatus",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  updateConsultant(data:any){
    return this.httpClient.patch(this.url+"/consultant/updateconsultant",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }
}

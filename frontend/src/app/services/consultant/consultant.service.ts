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
    return this.httpClient.post(this.url+"/user/addconsultant",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getAllConsultants(){
    return this.httpClient.get(this.url+"/consultant/getAllConsultants");
  }

  updateConsultantStatus(data:any){
    return this.httpClient.post(this.url+"/consultant/updateuserstatus/:id",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }
}

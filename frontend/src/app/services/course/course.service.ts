import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  updateStatus(data:any) {
    return this.httpClient.post(this.url+"/course/updateuniversitycourse",data,{
      headers: new HttpHeaders().set('Content-Type',"application/json")
    })
  }

  getCoursesPerUniversity(data:any) {
    return this.httpClient.get(this.url+"/courses/getbyuniversity/:id",data)
  }

  getAllCourses(){
    return this.httpClient.get(this.url + "/courses/findcourse");
  }


}

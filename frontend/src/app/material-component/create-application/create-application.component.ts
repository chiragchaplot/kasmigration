import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApplicationService } from 'src/app/services/application/application.service';
import { CourseService } from 'src/app/services/course/course.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { inflate } from 'zlib';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {

  displayedColumns: string[] = ['applicationid','studentname','coursename'];
  displayedColumns2: string[] = ['universityName','applicationStage'];
  displayedColumns3: string[] = ['phone','email'];
  dataSource: any;
  responseMessage: any;
  mainApplicationResponse: any;

  constructor(private courseService: CourseService,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.createApplication();
  }

  createApplication(){
    var data = {
      studentid:localStorage.getItem('userid'),
      courseid:localStorage.getItem('courseid')
    };
    this.applicationService.createApplication(data).subscribe((response: any) => {
      //this.ngxService.stop();
      this.responseMessage = response.message;
      this.snackBarService.openSnackBar(this.responseMessage,"success");
      this.inflateForm();
    }, (error: any) => {
      //this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message
        this.inflateForm();
      } else {
        this.responseMessage = GlobalConstants.genericError;
        this.inflateForm();
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
    this.inflateForm();
  }

  inflateForm(){
    //console.log("Reached Here");
    var data = {
      studentid:localStorage.getItem('userid'),
      courseid:localStorage.getItem('courseid')
    };
    console.log(data);
    this.applicationService.getSpecificStudentApplication(data).subscribe((response:any)=> {
      this.ngxService.stop()
      this.mainApplicationResponse = response;
      this.dataSource = new MatTableDataSource(response);
    },(error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }



}

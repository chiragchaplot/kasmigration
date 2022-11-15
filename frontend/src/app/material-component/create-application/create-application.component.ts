import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  createApplicationForm: any = FormGroup;
  responseMessage: any;

  constructor(private courseService: CourseService,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.createApplication();
    this.createApplicationForm = this.formBuilder.group({
      // name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      // email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      // contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]],
      // password:[null,[Validators.required]]
    })
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
      var apiResponse:any = response;
      console.log(apiResponse);
    },(error: any) => {
      //this.ngxService.stop();
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

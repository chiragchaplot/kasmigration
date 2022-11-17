
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-upload-document-student',
  templateUrl: './upload-document-student.component.html',
  styleUrls: ['./upload-document-student.component.scss']
})
export class UploadDocumentStudentComponent implements OnInit {

  uploadFileForm: any = FormGroup;
  title = 'fileUpload';
  images: any;
  multipleImages = [];
  responseMessage:any;

  constructor(private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.uploadFileForm = this.uploadFileForm.group({
      file:[]
    })
  }

  selectFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  handleSubmit(){
   const formData = new FormData();
   formData.append('file', this.images);
    this.ngxService.start();
    this.userService.uploadFiles(formData).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.snackBarService.openSnackBar(this.responseMessage,"success");
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

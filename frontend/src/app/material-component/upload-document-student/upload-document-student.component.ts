
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/shared/global-constants';
import jwtDecode from 'jwt-decode';
import { MatTableDataSource } from '@angular/material/table';

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

  displayedColumns: string[] = ['originalname','actions'];
  dataSource: any;

  constructor(private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
     this.ngxService.start();
      this.tableData();
    
  }

  tableData() {
    var token:any = localStorage.getItem('token')
    var values:any = jwtDecode(token)
    var id:any = values.userid
    var data = {
      id:id
    };
    this.userService.getUploadedFiles(data).subscribe((response: any) => {
      console.log(response);
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error: any) => {
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

  selectFile(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files;
      this.images = file;
    }
  }

  handleSubmit(){
   const formData = new FormData();
   for(let img of this.images) {
    formData.append('file',img);
   }
   var token:any = localStorage.getItem('token');
   var decodedValue:any = jwtDecode(token);
   formData.append('id',decodedValue.userid);
    this.ngxService.start();
    this.userService.uploadFiles(formData).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.snackBarService.openSnackBar(this.responseMessage,"success");
      this.tableData();
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

  handleDownload(element:any) {

  }

  handleDelete(element:any) {

  }
}

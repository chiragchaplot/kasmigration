import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ApplicationService } from 'src/app/services/application/application.service';
import { CourseService } from 'src/app/services/course/course.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-view-application-student',
  templateUrl: './view-application-student.component.html',
  styleUrls: ['./view-application-student.component.scss']
})
export class ViewApplicationStudentComponent implements OnInit {

  displayedColumns: string[] = ['applicationid','name','course','universityname','applicationstage'];
  dataSource: any;
  responseMessage: any;

  constructor(private applicationService: ApplicationService,
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
    this.applicationService.getAllStudentApplication(data).subscribe((response: any) => {
      this.ngxService.stop();
      console.log(response);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleDownloadAction(){

  }



}

import { CourseService } from 'src/app/services/course/course.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConsultantService } from 'src/app/services/consultant/consultant.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {

  displayedColumns: string[] = ['name','university','level','cricos','apply'];
  dataSource: any;
  responseMessage: any;

  constructor(private courseService: CourseService,
    private ngxService: NgxUiLoaderService,
    private snackBarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.courseService.getAllCourses().subscribe((response: any) => {
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

  viewMoreInformation(values:any) {
    window.open(values.link,"_blank");
  }

  handleDownloadAction() {

  }

  handleApplyAction(values:any){
    console.log(values.id);
    var token: any;
    try {
      token = localStorage.getItem('token');
      var decodedValue:any = jwtDecode(token);
      if (decodedValue.role == 'student') {
        console.log("ok");
      } else {
        this.snackBarService.openSnackBar(GlobalConstants.unauthorised, GlobalConstants.error);
      }
    } catch(error) {
      console.log(error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConsultantService } from 'src/app/services/consultant/consultant.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-consultant',
  templateUrl: './manage-consultant.component.html',
  styleUrls: ['./manage-consultant.component.scss']
})
export class ManageConsultantComponent implements OnInit {

  displayedColumns: string[] = ['name','email','contactNumber','edit'];
  dataSource: any;
  responseMessage: any;

  constructor(private consultantService: ConsultantService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackBarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.consultantService.getAllConsultants().subscribe((response: any) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {

  }

  handleEditAction(values:any){

  }

  handleDeleteAction(values:any){

  }

  onChange(status:any, id:any) {
    
  }
}

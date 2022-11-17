import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConsultantService } from 'src/app/services/consultant/consultant.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConsultantComponent } from '../dialog/consultant/consultant.component';

@Component({
  selector: 'app-manage-consultant',
  templateUrl: './manage-consultant.component.html',
  styleUrls: ['./manage-consultant.component.scss']
})
export class ManageConsultantComponent implements OnInit {

  displayedColumns: string[] = ['name','email','contact_number','edit'];
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

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Add'
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ConsultantComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddConsultant.subscribe(
      (response)=>{
        this.tableData();
      }
    );
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action:'Edit',
      data: values
    }
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ConsultantComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditConsultant.subscribe(
      (response)=>{
        this.tableData();
      }
    );
  }

  // handleDeleteAction(values:any){
    
  // }

  onChange(status:any, id:any) {
    var updatedStatus = 0;
    if (status === true) {
      updatedStatus = 1
    } 
    var data = {
      status:updatedStatus,
      id:id
    }
    this.consultantService.updateConsultantStatus(data).subscribe((response:any)=>{
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

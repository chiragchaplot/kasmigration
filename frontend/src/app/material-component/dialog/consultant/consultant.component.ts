import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultantService } from 'src/app/services/consultant/consultant.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.scss']
})
export class ConsultantComponent implements OnInit {

  onAddConsultant = new EventEmitter()
  onEditConsultant = new EventEmitter()

  consultantForm:any = FormGroup;
  dialogAction:any ="Add";

  action:any = "Add";
  responseMessage:any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private consultantService:ConsultantService,
  public dialogRef: MatDialogRef<ConsultantComponent>,
  private snackBarService: SnackbarService) { }

  ngOnInit(): void {
    this.consultantForm = this.formBuilder.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber:[null,[Validators.required,Validators.pattern(GlobalConstants.contactNumberRegex)]]
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.consultantForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === 'Edit'){
      this.editConsultant();
    } else {
      this.addConsultant();
    }
  }
  
  editConsultant(){
    var formData = this.consultantForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber
    }
    this.consultantService.updateConsultant(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onEditConsultant.emit();
      this.responseMessage = response.message;
      this.snackBarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
  
  addConsultant(){
    var formData = this.consultantForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }
    this.consultantService.addConsultant(data).subscribe((response:any)=>{
      this.dialogRef.close();
      this.onAddConsultant.emit();
      this.responseMessage = response.message;
      this.snackBarService.openSnackBar(this.responseMessage,"success");
    },(error:any)=>{
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }
}


